<script setup lang="ts">
import { computed } from "vue";
import Hamburger from "../components/Hamburger.vue";

const props = defineProps({
  menuIsActive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:menuIsActive']);

const syncMenuIsActive = computed({
  get: () => props.menuIsActive,
  set: (value: boolean) => emit('update:menuIsActive', value)
})
</script>

<template>
  <header>
    <h1>日新測驗</h1>

    <div>
      <Hamburger v-model:is-active="syncMenuIsActive" />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  h1 {
    margin-top: 3px;
  }
}
</style>
