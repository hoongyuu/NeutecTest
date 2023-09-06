<script setup lang="ts">
import { ref } from 'vue'
import { MENU_DATA } from "./constants";
import Header from './components/Header.vue'
import Grid from './components/grid/Index.vue'
import AsideMenu from './components/aside/Index.vue'
import MenuSelect from './components/MenuSelect.vue';
import CircleSelect from './components/CircleSelect.vue';

const menuIsVisible = ref(false)

const gridRef = ref<InstanceType<typeof Grid> | null>(null)
</script>

<template>
  <Header v-model:menu-is-active="menuIsVisible" />

  <main class="main">
    <section class="main-header">
      <MenuSelect class="main-header-menu-select" />
      <CircleSelect class="main-header-circle-select" @submit="gridRef?.drawCircle" />
    </section>

    <section class="main-grid">
      <Grid ref="gridRef" />
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

  &-header {
    &-menu-select {
      margin-bottom: 20px;
    }

    &-circle-select {}
  }

  &-grid {
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
