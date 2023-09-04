<script setup lang="ts">
const props = defineProps({
  isFlash: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="['grid-item', { 'isFlash': props.isFlash }]">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@keyframes flashing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.6;
  }
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: yellowgreen;
  border: black solid 2px;
  background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);

  &.isFlash {
    animation: flashing 800ms linear infinite alternate;
  }
}
</style>
