"use client";

import axios from "axios";

import { useCallback, useMemo } from "react";

import toast from "react-hot-toast";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  const { mutate: mutateFetchUser } = useUser(userId);
  const loginModal = useLoginModal();
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingId || [];
    return list.includes(userId);
  }, [userId, currentUser?.followingId]);
  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete("/api/follow", { data: { userId } });
      } else {
        request = () => axios.post("/api/follow", { userId });
      }
      await request();

      mutateFetchUser();
      mutateCurrentUser();
      toast.success("Correcto");
    } catch (e) {
      toast.error("ocurrio un error inesperado");
      console.log("hubo un error", e);
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchUser,
    loginModal,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
