<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from 'vue';
import * as PIXI from "pixi.js";

const circles = ref<PIXI.Graphics[]>([])
const CIRCLE_RADIUS = 15

const getItemElement = (itemNum: number): DOMRect => {
  return document.querySelector(`#grid-item-${itemNum}`)!.getBoundingClientRect()
}

onMounted(() => {
  console.log(window.devicePixelRatio);

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  })

  const drawCircle = (num: number) => {
    const circle = new PIXI.Graphics()
    const { x, y, width, height } = getItemElement(num)
    circle.beginFill(0xA5F12B);
    circle.drawCircle(0, 0, CIRCLE_RADIUS);
    circle.endFill()
    circle.x = x + width / 2
    circle.y = y + height / 2
    circle.customMove = (delta) => {
      if (circle.x > window.innerWidth + CIRCLE_RADIUS) {
        circle.x = -CIRCLE_RADIUS
        return
      }
      circle.x += 2 * delta
    }
    app.stage.addChild(circle)
    circles.value.push(circle)
  }

  const circleAnimation = document.getElementById('circle-animation')!

  circleAnimation.appendChild(app.view)

  // 繪製圓形
  drawCircle(1)
  drawCircle(3)
  drawCircle(7)
  drawCircle(9)

  app.ticker.add(function (delta) {
    circles.value.forEach((circle) => {
      circle.customMove(delta)
    })
  });
})
</script>

<template>
  <div id="circle-animation" />
</template>

<style scoped lang="scss">
#circle-animation {

  &,
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 45;
    pointer-events: none;
  }
}
</style>
