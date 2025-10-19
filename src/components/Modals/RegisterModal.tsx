"use client";

import { signIn } from "next-auth/react";
import { useState, useCallback } from "react";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, registerModal, loginModal]);
  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/register", {
        email,
        name,
        username,
        password,
      });
      //toast.success("Registro exitoso");
      if (res.status === 200) {
        const ok = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (ok?.ok) {
          toast.success("Registro exitoso, Bienvenido!!");
          registerModal.onClose();
          router.push("/dashboard");
        } else {
          toast.error("Hubo un error al iniciar sesion");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("hubo un error");
    } finally {
      setLoading(false);
    }
  }, [registerModal, email, username, name, password]);
  const BodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Nombre Completo"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Nombre de usuario"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />
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
        Ya tienes una cuenta?{" "}
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          Iniciar sesion
        </span>
      </p>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Crear una cuenta"
      actionLabel="Registrarse"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={BodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
