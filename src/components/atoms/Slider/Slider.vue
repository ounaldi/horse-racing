<script setup lang="ts">
import { ref, onBeforeUnmount, watch } from "vue";
import { useRaceStore } from "@/store/race";
import horseSvg from "@/assets/horse.svg?url";
import type { IHorse } from "@/types/horse";

const props = defineProps<{
  max: number;
  horse: IHorse;
}>();

const emit = defineEmits(["update:modelValue"]);

const raceStore = useRaceStore();

const internalValue = ref<number>(0);
const stepInterval = 50;
const totalSteps = Math.ceil(props.max / props.horse.condition);
let currentStep = Math.floor(internalValue.value / props.horse.condition);

let animationFrameId: number | null = null;
let lastUpdateTime = performance.now();

watch(internalValue, (val) => {
  emit("update:modelValue", val);

  if (val === props.max) {
    const alreadyInResult = raceStore.currentRaceResults?.some(
      (r) => r.id === props.horse.id,
    );

    if (!alreadyInResult) {
      raceStore.addHorseToResult(props.horse);
    }
  }
});

const animate = () => {
  const now = performance.now();
  const elapsed = now - lastUpdateTime;

  if (elapsed >= stepInterval && currentStep < totalSteps) {
    currentStep++;
    internalValue.value = Math.min(
      currentStep * props.horse.condition,
      props.max,
    );
    lastUpdateTime = now;
  }

  if (currentStep < totalSteps) {
    animationFrameId = requestAnimationFrame(animate);
  } else {
    internalValue.value = props.max;
  }
};

const stopAnimation = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

watch(
  () => raceStore.isRaceStarted,
  (started) => {
    if (started) {
      lastUpdateTime = performance.now();
      animationFrameId = requestAnimationFrame(animate);
    } else {
      stopAnimation();
    }
  },
);

watch(
  () => raceStore.currentLabIndex,
  () => {
    internalValue.value = 0;
    currentStep = 0;
    stopAnimation();
  },
);

onBeforeUnmount(() => {
  stopAnimation();
});
</script>

<template>
  <input
    type="range"
    class="slider"
    min="0"
    :max="props.max"
    :value="internalValue"
    :style="{
      '--thumb-color': props.horse.color,
      '--thumb-image': `url(${horseSvg})`,
    }"
    readonly
  />
</template>

<style scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  border-top: 3px dashed #000;
  margin: 0;
  border-collapse: collapse;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 5rem;
  height: 4rem;
  background-image: var(--thumb-image);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  fill: var(--thumb-color);
  border: none;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 5rem;
  height: 4rem;
  background-image: var(--thumb-image);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  fill: var(--thumb-color);
  border: none;
  cursor: pointer;
}
</style>
