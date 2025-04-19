import type { IHorse } from "@/types/horse";
import { defineStore } from "pinia";

export interface IBenchState {
  bench: Array<IHorse>;
}

export const useBenchStore = defineStore("bench", {
  state: (): IBenchState => ({
    bench: [] as Array<IHorse>,
  }),
  actions: {
    setHorses(horses: IHorse[]) {
      this.bench = horses;
    },
  },
  getters: {
    getBenchs(): Array<IHorse> {
      return this.bench;
    },
  },
});
