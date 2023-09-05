<script setup lang="ts">
import { ref } from 'vue'
import { MENU_DATA } from "./constants";
import Header from './components/Header.vue'
import Grid from './components/grid/Index.vue'
import AsideMenu from './components/aside/Index.vue'
import MenuSelect from './components/MenuSelect.vue';

const menuIsVisible = ref(false)
</script>

<template>
  <Header v-model:menu-is-active="menuIsVisible" />

  <main class="main">
    <section class="main-header">
      <MenuSelect class="menu-select" />
    </section>

    <section class="main-grid">
      <Grid />
    </section>
  </main>

  <AsideMenu :data="MENU_DATA" v-model:isVisible="menuIsVisible" />
</template>

<style scoped lang="scss">
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;

  &-grid {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
