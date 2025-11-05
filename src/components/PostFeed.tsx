import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

type Props = {
  userId?: string;
};

const PostFeed = ({ userId }: Props) => {
  const { data: posts = [] } = usePosts(userId);
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
