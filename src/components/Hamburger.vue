<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:isActive'])

const syncIsActive = computed({
  get: () => props.isActive,
  set: (value) => emit('update:isActive', value)
})
</script>

<template>
  <button type="button" :class="['hamburger', { active: syncIsActive }]" @click="syncIsActive = !syncIsActive">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<style scoped lang="scss">
.hamburger {
  width: 35px;
  height: 28px;
  position: relative;
  transform: rotate(0deg);
  transition: .5s ease-in-out;
  cursor: pointer;
  // 修正可能會導致出現 x 軸滾動
  overflow: hidden;

  span {
    display: block;
    position: absolute;
    height: 5px;
    width: 50%;
    background: #22a091;
    opacity: 1;
    transform: rotate(0deg);
    transition: .25s ease-in-out;
  }

  span:nth-child(even) {
    left: calc(50% - 1px);
    border-radius: 0 9px 9px 0;
  }

  span:nth-child(odd) {
    left: 0px;
    border-radius: 9px 0 0 9px;
  }

  span:nth-child(1),
  span:nth-child(2) {
    top: 0px;
  }

  span:nth-child(3),
  span:nth-child(4) {
    top: 11px;
  }

  span:nth-child(5),
  span:nth-child(6) {
    top: 22px;
  }

  &.active span:nth-child(1),
  &.active span:nth-child(6) {
    transform: rotate(45deg);
  }

  &.active span:nth-child(2),
  &.active span:nth-child(5) {
    transform: rotate(-45deg);
  }

  &.active span:nth-child(1) {
    left: 2px;
    top: 5px;
  }

  &.active span:nth-child(2) {
    left: calc(50% - 4px);
    top: 5px;
  }

  &.active span:nth-child(3) {
    left: -50%;
    opacity: 0;
  }

  &.active span:nth-child(4) {
    left: 100%;
    opacity: 0;
  }

  &.active span:nth-child(5) {
    left: 1px;
    top: 18px;
  }

  &.active span:nth-child(6) {
    left: calc(50% - 3px);
    top: 18px;
  }
}
</style>
