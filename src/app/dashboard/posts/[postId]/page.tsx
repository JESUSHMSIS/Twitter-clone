"use client";

import Header from "@/components/Header";
import usePost from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";
import { useParams } from "next/navigation";
import PostItem from "@/components/PostItem";
import Form from "@/components/Form";

const PostView = () => {
  const params = useParams();
  const postId = params.postId as string;
  const { data: fetchPost, isLoading } = usePost(postId);
  if (isLoading || !fetchPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header label="Twett" showBackArrow />
      <PostItem data={fetchPost.post} />
      <Form postId={postId} isComment placeholder="Escribe algo" />
    </>
  );
};

export default PostView;
