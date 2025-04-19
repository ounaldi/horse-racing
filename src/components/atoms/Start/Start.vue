<script setup lang="ts">
const props = defineProps({
  index: { type: Number, required: true },
});
</script>

<template>
  <div class="start-line">
    <p>{{ props.index }}</p>
  </div>
</template>

<style scoped>
.start-line {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: green;
  color: white;
  max-width: 5rem;
  border-width: 3px;
  border-style: solid;
  border-color: white;
  border-right: 0;
}

.start-line > p {
  rotate: -90deg;
  font-weight: 700;
}
</style>
