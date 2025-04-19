import type { IHorse } from "@/types/horse.ts";

export default function GetRandomHorses(
  horses: Array<IHorse>,
  count: number,
): Array<IHorse> {
  if (count >= horses.length) {
    return horses;
  }

  for (let i = horses.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [horses[i], horses[j]] = [horses[j], horses[i]];
  }

  return horses.slice(0, count);
}
