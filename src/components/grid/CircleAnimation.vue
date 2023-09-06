<script setup lang="ts">
// @ts-nocheck
import { onMounted, ref } from 'vue';
import * as PIXI from "pixi.js";

const CIRCLE_RADIUS = 15
const circles = ref<PIXI.Graphics[]>([])
const app = ref<PIXI.Application | null>(null)

const getItemElement = (itemNum: number): DOMRect =>
  document.querySelector(`#grid-item-${itemNum}`)!.getBoundingClientRect()

const directionMap = {
  '13': 'right',
  '46': 'right',
  '79': 'right',
  '31': 'left',
  '64': 'left',
  '97': 'left',
  '17': 'down',
  '28': 'down',
  '39': 'down',
  '71': 'up',
  '82': 'up',
  '93': 'up',
  '37': 'left',
  '19': 'right',
  '73': 'right',
  '91': 'left'
}

const drawCircle = ({ start, end }: {
  start: number,
  end: number
}) => {
  const circle = new PIXI.Graphics()
  const { x: startX, y: startY, width: startW, height: startH } = getItemElement(start)
  const { x: endX, y: endY, width: endW, height: endH } = getItemElement(end)
  circle.startCenter = {
    x: startX + startW / 2,
    y: startY + startH / 2
  }
  circle.endCenter = {
    x: endX + endW / 2,
    y: endY + endH / 2
  }
  circle.beginFill(0xA5F12B);
  circle.drawCircle(0, 0, CIRCLE_RADIUS);
  circle.endFill()
  circle.x = circle.startCenter.x
  circle.y = circle.startCenter.y
  circle.direction = directionMap[`${start}${end}`]

  circle.customMove = function (delta) {
    if (this.direction === 'up' && this.y <= 0 - CIRCLE_RADIUS) {
      this.y = window.innerHeight + CIRCLE_RADIUS
      return
    }
    if (this.direction === 'down' && this.y > window.innerHeight + CIRCLE_RADIUS) {
      this.y = -CIRCLE_RADIUS
      return
    }
    if (this.direction === 'left' && this.x <= 0 - CIRCLE_RADIUS) {
      if (!this.boundaryH) {
        this.boundaryH = Math.abs(this.y) - this.endCenter.y
      }
      this.x = window.innerWidth + CIRCLE_RADIUS
      this.y = this.startCenter.y - this.boundaryH
      return
    }
    if (this.direction === 'right' && this.x >= window.innerWidth + CIRCLE_RADIUS) {
      if (!this.boundaryH) {
        this.boundaryH = Math.abs(this.y) - this.endCenter.y
      }
      this.x = -CIRCLE_RADIUS
      this.y = this.startCenter.y - this.boundaryH
      return
    }
    const targetX = this.endCenter.x - this.startCenter.x
    const targetY = this.endCenter.y - this.startCenter.y
    const angle = Math.atan2(targetY, targetX)
    const deltaX = 2 * delta * Math.cos(angle); // 計算X方向上的變化
    const deltaY = 2 * delta * Math.sin(angle); // 計算Y方向上的變化
    this.x += deltaX;
    this.y += deltaY;
  }
  app.value.stage.addChild(circle)
  circles.value.push(circle)
}

onMounted(() => {
  app.value = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  })

  const circleAnimation = document.getElementById('circle-animation')!

  circleAnimation.appendChild(app.value.view)

  drawCircle({
    start: 1,
    end: 9
  })

  app.value.ticker.add(function (delta) {
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
