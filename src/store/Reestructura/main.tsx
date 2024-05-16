import { create } from "zustand";
import {
  ReestructuraSlice,
  createReestructura,
} from "./reestructura"

export type Reestructura = ReestructuraSlice;

export const useReestructuraStore = create<Reestructura>()(
  (...x) => ({
    ...createReestructura(...x),
  })
);
