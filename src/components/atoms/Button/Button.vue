<script setup lang="ts">
const props = defineProps<{
  text: string;
  onClick: () => void;
  disabled?: boolean;
}>();
</script>

<template>
  <button @click="props.onClick" :disabled="props.disabled">
    {{ text }}
  </button>
</template>

<style scoped>
button {
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 0.75rem;
}
</style>
