import { useCallback } from "react";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}
const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  console.log("informacion", userId);
  const router = useRouter();
  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      console.log(userId);
      const url = `/dashboard/${userId}`;
      router.push(url);
    },
    [router, userId],
  );
  return (
    <div
      className={`${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "h-32" : "h-12"}
      ${isLarge ? "w-32" : "w-12"}
      rounded-full
      hover:opacity-90
      transition
      cursor-pointer
      relative 
`}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/avatar.jpg"}
      />
    </div>
  );
};

export default Avatar;
