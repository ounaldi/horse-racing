<script setup lang="ts">
import Table from "@/components/atoms/Table/Table.vue";
import Header from "@/components/molecules/Header/Header.vue";
import Line from "@/components/molecules/Line/Line.vue";
import RankingList from "@/components/molecules/RankingList/RankingList.vue";
import { useBenchStore } from "@/store/bench";
import { useRaceStore } from "@/store/race";
import { computed } from "vue";

const benchStore = useBenchStore();
const raceStore = useRaceStore();
const horses = computed(() => raceStore.currentRaceHorses);
</script>

<template>
  <Header />

  <div class="container">
    <Table class="bench-table" :data="benchStore.bench" />

    <div class="column">
      <Line
        v-for="(horse, index) in horses"
        :key="horse.id"
        :horse="horse"
        :index="index + 1"
      />
    </div>

    <RankingList title="Program" operation="List" />
    <RankingList title="Result" operation="Result" />
  </div>
</template>

<style scoped>
.container {
  gap: 0.5rem;
}

.bench-table {
  max-width: 30rem;
}
</style>
