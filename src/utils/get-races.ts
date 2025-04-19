import type { IHorse } from "@/types/horse";
import type { IRace } from "@/types/race";
import GetRandomHorses from "@/utils/get-random-horses.ts";
import { faker } from "@faker-js/faker";

export default function GetRaces(bench: Array<IHorse>, count: number) {
  const labs: Array<number> = [1200, 1400, 1600, 1800, 2000, 2200];
  const races: Array<IRace> = labs.map((lab) => ({
    id: faker.string.uuid(),
    distance: lab,
    horses: GetRandomHorses(bench, count),
    result: [],
  }));

  return races;
}
