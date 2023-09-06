<script setup lang="ts">
import { ref, computed } from "vue";

const emit = defineEmits(['submit'])

const startNumWhiteList = {
  '1': [2, 3, 4, 5, 7, 9],
  '2': [1, 3, 5, 8],
  '3': [1, 2, 5, 6, 7, 9],
  '4': [1, 5, 6, 7],
  '5': [1, 2, 3, 4, 6, 7, 8, 9],
  '6': [3, 4, 5, 9],
  '7': [1, 3, 4, 5, 8, 9],
  '8': [2, 5, 7, 9],
  '9': [1, 3, 5, 6, 7, 8]
}

const firstNum = ref<number | undefined>()
const endNum = ref<number | undefined>()

const endOptions = computed(() => {
  if (!firstNum.value) return []
  return startNumWhiteList[String(firstNum.value) as keyof typeof startNumWhiteList]
})

const isEndNumValid = computed(() => {
  if (!firstNum.value || !endNum.value) return false
  return endOptions.value.includes(endNum.value)
})

const resetNums = () => {
  firstNum.value = undefined
  endNum.value = undefined
}

const handleSubmit = () => {
  if (!isEndNumValid.value) {
    alert('請輸入開始與結束')
    return
  }
  emit('submit', { start: firstNum.value, end: endNum.value })
  resetNums()
}
</script>

<template>
  <div class="circle-select">
    <div class="circle-select-group">
      <div class="circle-select-group-item">
        <h3>開始:</h3>
        <select v-model="firstNum" class="circle-select-first">
          <option v-for="num in 9" :key="`first-${num}`" :value="num">{{ num }}</option>
        </select>
      </div>
      <div class="circle-select-group-item">
        <h3>結束:</h3>
        <select v-model="endNum" class="circle-select-end" :disabled="!firstNum">
          <option v-for="num in endOptions" :key="`end-${num}`" :value="num">{{ num }}</option>
        </select>
      </div>
    </div>

    <button type="button" class="circle-select-submit" @click="handleSubmit">送出</button>
  </div>
</template>

<style scoped lang="scss">
.circle-select {
  display: flex;
  align-items: center;

  &-group {

    &,
    &-item {
      display: flex;
      align-items: center;
    }
  }

  select {
    height: 30px;
    width: 70px;
    margin-right: 8px;
    margin-left: 4px;
  }

  &-submit {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    background-color: #2265bc;
    color: #f5f5f5;
  }
}
</style>
