<script setup lang="ts">
import { PropType, computed, onMounted, onUnmounted } from 'vue';
import { MenuItem } from '../../types'
import Item from "./Item.tsx";
import { selectedPath } from '../../store/menu';

const props = defineProps({
  data: {
    type: Array as PropType<MenuItem[]>,
    default: []
  },
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isVisible'])

const syneIsVisible = computed({
  get: () => props.isVisible,
  set: (value: boolean) => emit('update:isVisible', value)
})

// click outside
const handleClickOutside = (event: MouseEvent) => {
  const hamburger = document.querySelector('.hamburger') as HTMLElement
  const aside = document.querySelector('.aside-menu') as HTMLElement
  const path = event.composedPath()

  if (path.some((el) => el === hamburger)) {
    return
  }

  if (!path.some((el) => el === aside)) {
    syneIsVisible.value = false
  }
}

onMounted(() => {
  selectedPath.value = JSON.parse(localStorage.getItem('selectedPath') || '[]')

  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <aside :class="['aside-menu', {
    active: syneIsVisible
  }]">
    <Item :data="data" />
  </aside>
</template>

<style lang="scss">
.aside-menu {
  position: fixed;
  top: 0;
  right: -100%;
  z-index: 50;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: #f5f5f5;
  overflow-y: auto;
  overflow-x: hidden;
  transition: right 0.3s ease-in-out;

  &.active {
    right: 0;
  }
}
</style>