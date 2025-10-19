"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useState, useCallback } from "react";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onOpen();
    loginModal.onClose();
  }, [registerModal, loginModal, isLoading]);
  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      await signIn("credentials", {
        email,
        password,
      });

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [loginModal, email, password]);
  const BodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Correo Electronico"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        No tienes una cuenta?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Registrate
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Iniciar sesion"
      actionLabel="Iniciar Sesion"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={BodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
