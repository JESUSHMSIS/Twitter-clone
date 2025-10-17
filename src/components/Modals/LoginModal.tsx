"use client";

import useLoginModal from "@/hooks/useLoginModal";
import { useState, useCallback } from "react";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
const LoginModal = () => {
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      //añadir la funcionalidad de login
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [loginModal]);
  const BodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Correo Electronico"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
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
    />
  );
};

export default LoginModal;
