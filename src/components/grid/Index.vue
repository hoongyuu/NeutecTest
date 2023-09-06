<script setup lang="ts">
import { ref } from "vue";
import CircleAnimation from './CircleAnimation.vue';
import GridItem from './Item.vue'

const circle = ref<InstanceType<typeof CircleAnimation> | null>(null)

const drawCircle = (options: {
  start: number,
  end: number
}) => {
  circle.value?.drawCircle(options)
}

defineExpose({
  drawCircle
})
</script>

<template>
  <div class="grid">
    <GridItem v-for="(num) in 9" :key="num" :is-flash="[3, 5, 9].includes(num)" :circle="[1, 3, 7, 9].includes(num)"
      :num="num">
    </GridItem>
  </div>

  <CircleAnimation ref="circle" />
</template>

<style scoped lang="scss">
.grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
</style>
