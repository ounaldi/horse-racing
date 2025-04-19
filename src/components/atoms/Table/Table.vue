<script setup lang="ts" generic="T extends object">
import { computed } from "vue";

const props = defineProps<{
  data: Array<T>;
}>();

const keys = computed(
  () =>
    Object.keys(!!props.data.length ? props.data[0] : {}).filter(
      (key) => key !== "id",
    ) as (keyof T)[],
);
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in keys" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in props.data" :key="index">
        <td v-for="key in keys" :key="key">{{ item[key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-transform: capitalize;
}
</style>
