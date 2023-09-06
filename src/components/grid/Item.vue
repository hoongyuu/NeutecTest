<script setup lang="ts">
const props = defineProps({
  isFlash: {
    type: Boolean,
    default: false
  },
  num: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div :id="`grid-item-${props.num}`" :class="['grid-item', { 'isFlash': props.isFlash }]">
    <div class="grid-item-content">
      {{ props.num }}
    </div>
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
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: yellowgreen;
  border: black solid 2px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(113, 81, 95, 1) 81%, rgba(0, 0, 0, 1) 100%);
  }

  &.isFlash {
    &::before {
      animation: flashing 800ms linear infinite alternate;
    }
  }

  &-content {
    position: relative;
    z-index: 1;
  }
}
</style>
