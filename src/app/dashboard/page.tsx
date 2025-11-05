import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";

const DashboardPage = () => {
  return (
    <div>
      <Header label="Inicio" />
      <Form placeholder="En que estas pensando?" />
      <PostFeed />
    </div>
  );
};

export default DashboardPage;
