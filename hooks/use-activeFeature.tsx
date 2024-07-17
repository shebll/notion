import { stateFeature } from "@/app/types/activeFeature";
import { create } from "zustand";

type useActiveFeatureType = {
  activeFeature: stateFeature;
  setActiveFeature: (activeFeature: stateFeature) => void;
};

export const useActiveFeature = create<useActiveFeatureType>((set) => ({
  activeFeature: "",
  setActiveFeature: (activeFeatureValue: stateFeature) => {
    set({ activeFeature: activeFeatureValue });
  },
}));
