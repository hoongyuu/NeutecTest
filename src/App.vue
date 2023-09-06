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
    <section class="main-tools">
      <div class="main-tools-item">
        <h2>選擇側邊選單目錄</h2>
        <MenuSelect class="main-tools-menu-select" />
      </div>

      <div class="main-tools-item">
        <h2>圓形飛行起終點</h2>
        <CircleSelect class="main-tools-circle-select" @submit="gridRef?.drawCircle" />
      </div>
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

  &-tools {
    &-item {
      h2 {
        margin-bottom: 8px;
        font-weight: bold;
      }

      &+& {
        border-top: 1px solid #ccc;
        margin-top: 16px;
        padding-top: 16px;
      }
    }
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
