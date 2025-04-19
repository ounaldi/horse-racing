import type { IHorse } from "@/types/horse";
import type { IRace } from "@/types/race";
import { defineStore } from "pinia";

export interface IRaceState {
  isRaceStarted: boolean;
  currentLabIndex: number | undefined;
  races: Array<IRace>;
}

export const useRaceStore = defineStore("race", {
  state: (): IRaceState => ({
    isRaceStarted: false,
    currentLabIndex: undefined,
    races: [] as Array<IRace>,
  }),
  actions: {
    setIsRaceStarted(isStarted: boolean) {
      this.isRaceStarted = isStarted;
    },
    setCurrentLabIndex(currentLab: number | undefined) {
      this.currentLabIndex = currentLab;
    },
    setRaces(races: Array<IRace>) {
      this.races = races;
      this.currentLabIndex = 0;
    },
    addHorseToResult(horse: IHorse) {
      if (this.currentLabIndex === undefined) return;

      const currentRace = this.races[this.currentLabIndex];
      currentRace?.result.push(horse);

      if (this.isRaceFinished) {
        this.isRaceStarted = false;

        const nextIndex = this.currentLabIndex + 1;
        if (nextIndex < this.races.length) {
          this.currentLabIndex = nextIndex;
        } else {
          this.currentLabIndex = undefined;
        }
      }
    },
  },
  getters: {
    getRaces(): Array<IRace> {
      return this.races;
    },
    currentRaceHorses(): Array<IHorse> | undefined {
      if (this.currentLabIndex === undefined) return undefined;

      return this.races[this.currentLabIndex]?.horses;
    },
    currentRaceResults(): Array<IHorse> | undefined {
      if (this.currentLabIndex === undefined) return undefined;

      return this.races[this.currentLabIndex]?.result;
    },
    currentLab(): number | undefined {
      if (this.currentLabIndex) {
        return this.currentLabIndex + 1;
      }

      return undefined;
    },
    isRaceFinished(): boolean {
      if (this.currentLabIndex === undefined) return false;

      return (
        this.races[this.currentLabIndex]?.result.length ===
        this.races[this.currentLabIndex]?.horses.length
      );
    },
    distance(): number | undefined {
      if (this.currentLabIndex === undefined) return undefined;

      return this.races[this.currentLabIndex]?.distance;
    },
  },
});
