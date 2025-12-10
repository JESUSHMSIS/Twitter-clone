"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./ui/Button";
import Avatar from "./ui/Avatar";

interface Props {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form: React.FC<Props> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = usePosts(postId as string);
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/posts", { body });

      toast.success("✅ Tweet creado con exito");
      setBody("");
      mutatePost();
    } catch (e) {
      toast.error("💢 acaba de ocurrir un error");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePost]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              className="disabled:opacity-80 peer resize-none mt-3 w-full ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
            <div className="mt-4 flex justify-end">
              <Button
                label="Twett"
                disabled={isLoading || !body}
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Bienvenido a Twitter
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Button label="Iniciar sesion" onClick={loginModal.onOpen} />
            <Button
              label="Registrate"
              onClick={registerModal.onOpen}
              secondary
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
