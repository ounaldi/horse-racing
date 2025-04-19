<script setup lang="ts">
import Start from "@/components/atoms/Start/Start.vue";
import Slider from "@/components/atoms/Slider/Slider.vue";
import Finish from "@/components/atoms/Finish/Finish.vue";
import type { PropType } from "vue";
import type { IHorse } from "@/types/horse";
import { useRaceStore } from "@/store/race";
import { computed } from "vue";

const props = defineProps({
  horse: {
    type: Object as PropType<IHorse>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const raceStore = useRaceStore();

const distance = computed(() => {
  return raceStore.distance || 0;
});
</script>

<template>
  <div class="race-line row">
    <Start :index="props.index" />

    <Slider
      :key="props.horse.id"
      :horse="props.horse"
      :max="distance"
      :color="props.horse.color"
    />

    <Finish />
  </div>
</template>

<style scoped></style>
