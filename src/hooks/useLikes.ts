"use client";

import axios from "axios";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = (postId: string, userId?: string) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const post = fetchedPost?.post;

    if (!post || !currentUser?.id) {
      return false;
    }

    const list = post.LikesIds || [];

    // ✅ Debug para ver qué está pasando
    console.log("Verificando hasLiked:", {
      currentUserId: currentUser.id,
      likedIds: list,
      hasLiked: list.includes(currentUser.id),
    });

    return list.includes(currentUser.id);
  }, [currentUser?.id, fetchedPost?.post]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        // Quitar like
        request = () =>
          axios.delete("/api/like", {
            data: { postId },
          });
      } else {
        // Agregar like
        request = () =>
          axios.post("/api/like", {
            postId,
          });
      }

      await request();

      // ✅ IMPORTANTE: Revalidar los datos después de la petición
      await mutateFetchedPost();
      await mutateFetchedPosts();

      toast.success(hasLiked ? "Like removido" : "Post liked!");
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Ocurrió un error");
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
};

export default useLike;
