import type { IHorse } from "@/types/horse.ts";
import { faker } from "@faker-js/faker";

export default function GenerateHorseName(count: number): Array<IHorse> {
  const names = faker.helpers.uniqueArray(faker.animal.horse, count);
  const colors = faker.helpers.uniqueArray(faker.color.human, count);
  
  return Array.from({ length: count }, (_, index) => ({
    id: faker.string.uuid(),
    name: names[index],
    condition: faker.number.int({ min: 1, max: 100 }),
    color: colors[index],
  }));
}
