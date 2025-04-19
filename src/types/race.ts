import type { IHorse } from "@/types/horse";

interface IRace {
  id: string;
  distance: number;
  horses: Array<IHorse>;
  result: Array<IHorse>;
}

export type { IRace };
