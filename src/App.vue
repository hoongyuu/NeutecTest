<script setup lang="ts">
import Header from './components/Header.vue'
import Grid from './components/grid/Index.vue'
</script>

<template>
  <Header />

  <main>
    <Grid />
  </main>
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
