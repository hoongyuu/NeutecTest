import { ref, watch } from "vue";
import { MenuItem } from "../types";

export const selectedPath = ref<string[]>([])

export const checkKeyIncludesPath = (key: string) => selectedPath.value.includes(key)

export const handleItemClick = (item: MenuItem, parent?: MenuItem) => {
  const itemKey = item.key;
  const parentKey = parent?.key || '';
  const isItemKeyIncludesPath = selectedPath.value.includes(itemKey);
  const isParentKeyIncludesPath = selectedPath.value.includes(parentKey);
  const lastPathKey = selectedPath.value[selectedPath.value.length - 1];

  if (isItemKeyIncludesPath) {
    const index = selectedPath.value.findIndex((key) => key === item.key);
    selectedPath.value = selectedPath.value.slice(0, index);
    return;
  }

  if (!parentKey) {
    selectedPath.value = [itemKey];
    return
  }

  if (lastPathKey === itemKey) {
    const index = selectedPath.value.findIndex((key) => key === itemKey);
    selectedPath.value = selectedPath.value.slice(0, index + 1);
    return
  }

  if (lastPathKey === parentKey) {
    selectedPath.value = [...selectedPath.value, itemKey];
  } else if(isParentKeyIncludesPath) {
    const index = selectedPath.value.findIndex((key) => key === parentKey);
    selectedPath.value = selectedPath.value.slice(0, index + 1);
    selectedPath.value = [...selectedPath.value, itemKey];
  }
};

watch(selectedPath, (newPath) => {
  localStorage.setItem('selectedPath', JSON.stringify(newPath))
})