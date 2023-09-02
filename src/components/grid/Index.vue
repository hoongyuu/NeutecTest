<script setup lang="ts">
import GridItem from './Item.vue'
</script>

<template>
  <div class="grid">
    <GridItem v-for="(num) in 9" :key="num" />
  </div>
</template>

<style scoped lang="scss">
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
</style>
