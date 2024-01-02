import { create } from "zustand";
type useTile = {
  title: string;
  setTitle: (value: string) => void;
};
export const useTitle = create<useTile>((set) => ({
  title: "",
  setTitle: (value: string) => {
    set({ title: value });
  },
}));
