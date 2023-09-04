<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import Grid from './components/grid/Index.vue'
import AsideMenu from './components/aside/Index.vue'
import { MENU_DATA } from "./constants";

const menuIsVisible = ref(false)
</script>

<template>
  <Header v-model:menu-is-active="menuIsVisible" />

  <main>
    <Grid />
  </main>

  <AsideMenu :data="MENU_DATA" v-model:isVisible="menuIsVisible" />
</template>

<style scoped lang="scss">
main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
}
</style>
