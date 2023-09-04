<script setup lang="ts">
import Header from './components/Header.vue'
import Grid from './components/grid/Index.vue'
import AsideMenu from './components/aside/Index.vue'
import { MENU_DATA } from "./constants";

import { ref } from 'vue'

const menuIsVisible = ref(true)
</script>

<template>
  <template v-if="false">
    <Header @toggleMenu="$event => menuIsVisible = $event" />

    <main>
      <Grid />
    </main>
  </template>

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
