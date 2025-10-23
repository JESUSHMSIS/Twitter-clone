import { create } from "zustand";

interface EditModalState {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useEditModal = create<EditModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditModal;
