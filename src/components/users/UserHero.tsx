import Image from "next/image";
import Avatar from "../ui/Avatar";
import useUser from "@/hooks/useUser";
interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {data?.coverImage && (
          <Image
            src={data.coverImage}
            fill
            alt="cover image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
