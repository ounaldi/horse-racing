<script setup lang="ts">
import { computed } from "vue";
import { useRaceStore } from "@/store/race";
import Table from "@/components/atoms/Table/Table.vue";

const raceStore = useRaceStore();
const props = defineProps<{
  title: string;
  operation: "List" | "Result";
}>();

const getHorses = (index: number) => {
  const _data =
    props.operation == "List"
      ? raceStore.races[index].horses
      : raceStore.races[index].result;

  return (
    _data?.map((horse, index) => ({
      position: index + 1,
      name: horse.name,
    })) ?? []
  );
};
</script>

<template>
  <div class="ranking-list">
    <p class="title">{{ props.title }}</p>
    <div v-for="(race, index) in raceStore.races" :key="race.id">
      <div class="distance">
        <p>{{ index + 1 }}. Lab {{ race.distance }}</p>
      </div>
      <Table :data="getHorses(index)" />
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem;
  background-color: #f2f2f2;
  border-bottom: 1px solid gainsboro;
}

.ranking-list {
  width: 16rem;
  max-height: 48rem;
  overflow: auto;
}

.distance {
  background-color: #f2f2f2;
  padding: 0.5rem;
}
</style>
