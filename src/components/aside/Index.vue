<script setup lang="ts">
import { PropType, computed, onMounted } from 'vue';
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

onMounted(() => {
  selectedPath.value = JSON.parse(localStorage.getItem('selectedPath') || '[]')
})
</script>

<template>
  <aside :class="['aside-menu', {
    active: syneIsVisible
  }]">
    <nav>
      <ul>
        <template v-for="(item) in data" :key="item.key">
          <Item :data="item" />
        </template>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss">
.aside-menu {
  position: fixed;
  top: 0;
  right: -100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: #f5f5f5;
  overflow-y: auto;
  overflow-x: hidden;
  transition: right 0.3s ease-in-out;

  &.active {
    right: 0;
  }

  nav {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-left: 16px;
    padding-right: 28px;
  }

  ul {
    padding-left: 12px;
  }

  li {

    &,
    div {
      padding: 8px 0;
    }
  }
}
</style>
./Item.tsx