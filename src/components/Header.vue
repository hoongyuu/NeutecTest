<script setup lang="ts">
import { ref, watch } from "vue";
import Hamburger from "../components/Hamburger.vue";

const emit = defineEmits(["toggleMenu"]);

const menuIsActive = ref(false);

watch(menuIsActive, (newVal) => {
  emit("toggleMenu", newVal);
})
</script>

<template>
  <header>
    <h1>日新測驗</h1>

    <div>
      <Hamburger v-model:is-active="menuIsActive" />
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}
</style>
