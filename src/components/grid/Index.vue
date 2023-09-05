<script setup lang="ts">
import CircleAnimation from './CircleAnimation.vue';
import GridItem from './Item.vue'
</script>

<template>
  <div class="grid">
    <GridItem v-for="(num) in 9" :key="num" :is-flash="[3, 5, 9].includes(num)" :circle="[1, 3, 7, 9].includes(num)"
      :num="num">
    </GridItem>
  </div>

  <CircleAnimation />
</template>

<style scoped lang="scss">
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
</style>
