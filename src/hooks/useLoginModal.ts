import { create } from "zustand";

interface LoginModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useLoginModal = create<LoginModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLoginModal;
