<script setup lang="ts">
import Button from "@/components/atoms/Button/Button.vue";
import { useBenchStore } from "@/store/bench";
import { useRaceStore } from "@/store/race";
import GenerateHorseName from "@/utils/generate-horse.ts";
import GetRaces from "@/utils/get-races";

const benchStore = useBenchStore();
const raceStore = useRaceStore();

const generateRandom = () => {
  benchStore.setHorses(GenerateHorseName(20));
  raceStore.setRaces(GetRaces(benchStore.bench, 10));
  raceStore.setCurrentLabIndex(0);
};

const toogleRace = () => {
  raceStore.setIsRaceStarted(!raceStore.isRaceStarted);
};
</script>

<template>
  <header>
    <Button text="Generate Random" v-on:click="generateRandom" />
    <Button text="Start / Pause" v-on:click="toogleRace" />
  </header>
</template>

<style scoped>
header {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-self: flex-end;
  height: 6rem;
  padding: 0 0.5rem;
}
</style>
