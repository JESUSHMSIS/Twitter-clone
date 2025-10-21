"use client";

import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
const UserView = () => {
  const { userid } = useParams();
  const { data: fetchedUser, isLoading } = useUser(userid as string);
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <div>
      <Header label={fetchedUser?.username} showBackArrow />
      <UserHero userId={userid as string} />
      <UserBio userId={userid as string} />
    </div>
  );
};

export default UserView;
