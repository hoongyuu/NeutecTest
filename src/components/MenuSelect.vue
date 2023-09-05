<script setup lang="ts">
import { computed } from "vue";
import { MENU_DATA } from '../constants';
import { MenuItem } from "../types";
import { selectedPath } from "../store/menu";

// 取得目標麵包屑(key)
const getTargetPath = (data: MenuItem[] = [], target: string): string[] | undefined => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.key === target) {
      return [item.key]
    }
    const result = getTargetPath(item.children, target)
    if (result) {
      return [item.key, ...result]
    }
  }
}

const currentSelected = computed({
  get: () => selectedPath.value[selectedPath.value.length - 1],
  set: (value) => {
    selectedPath.value = getTargetPath(MENU_DATA, value) || []
  }
})

// 扁平化資料
const flattenData = (data: MenuItem[]): MenuItem[] => {
  const result: MenuItem[] = [];

  const recursive = (data: MenuItem[]) => {
    data.forEach((item) => {
      result.push(item);
      if (item.children) {
        recursive(item.children);
      }
    });
  };

  recursive(data)
  return result;
};

const flattenMenuData = computed(() => flattenData(MENU_DATA))
</script>

<template>
  <select v-model="currentSelected" class="dropdown">
    <option v-for="item in flattenMenuData" :key="item.key" :value="item.key">
      {{ item.text }}
    </option>
  </select>
</template>

<style scoped lang="scss"></style>
