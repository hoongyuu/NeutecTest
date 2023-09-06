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
  '12': 'right',
  '13': 'right',
  '14': 'down',
  '15': 'rightDown',
  '17': 'down',
  '19': 'rightDown',
  '21': 'left',
  '23': 'right',
  '25': 'down',
  '28': 'down',
  '31': 'left',
  '32': 'left',
  '35': 'leftDown',
  '36': 'down',
  '37': 'leftDown',
  '39': 'down',
  '41': 'up',
  '45': 'right',
  '46': 'right',
  '47': 'down',
  '51': 'leftUp',
  '52': 'up',
  '53': 'rightUp',
  '54': 'left',
  '56': 'right',
  '57': 'leftDown',
  '58': 'down',
  '59': 'rightDown',
  '63': 'up',
  '64': 'left',
  '65': 'left',
  '69': 'down',
  '71': 'up',
  '73': 'rightUp',
  '74': 'up',
  '75': 'rightUp',
  '78': 'right',
  '79': 'right',
  '82': 'up',
  '85': 'up',
  '87': 'left',
  '89': 'right',
  '91': 'leftUp',
  '93': 'up',
  '95': 'leftUp',
  '96': 'up',
  '97': 'left',
  '98': 'left',
}

const optionsMap = {
  leftUp: {
    start: 9,
    end: 1
  },
  leftDown: {
    start: 3,
    end: 7
  },
  rightUp: {
    start: 7,
    end: 3
  },
  rightDown: {
    start: 1,
    end: 9
  },
}

const drawCircle = ({ start, end, direction }: {
  start: number,
  end: number,
  direction?: 'right' | 'left' | 'up' | 'down' // 強制方向只允許上下左右
}) => {
  if (circles.value.length >= 100) {
    alert('圓形的上限是100個')
    return
  }

  const circle = new PIXI.Graphics()
  circle.direction = direction || directionMap[`${start}${end}`]

  let formattedStart = start
  let formattedEnd = end
  if (['leftUp', 'leftDown', 'rightUp', 'rightDown'].includes(circle.direction)) {
    const { start, end } = optionsMap[circle.direction]
    formattedStart = start
    formattedEnd = end
  }
  const { x: startX, y: startY, width: startW, height: startH } = getItemElement(start)
  const { x: formattedStartX, y: formattedStartY, width: formattedStartW, height: formattedStartH } = getItemElement(formattedStart)
  circle.startCenter = {
    x: formattedStartX + formattedStartW / 2,
    y: formattedStartY + formattedStartH / 2
  }
  if (formattedEnd) {
    const { x: endX, y: endY, width: endW, height: endH } = getItemElement(formattedEnd)
    circle.endCenter = {
      x: endX + endW / 2,
      y: endY + endH / 2
    }
  }
  circle.beginFill(0xA5F12B);
  circle.drawCircle(0, 0, CIRCLE_RADIUS);
  circle.endFill()
  circle.x = startX + startW / 2
  circle.y = startY + startH / 2

  circle.customMove = function (delta) {
    if (this.direction === 'up') {
      if (this.y <= 0 - CIRCLE_RADIUS) {
        this.y = window.innerHeight + CIRCLE_RADIUS
        return
      }
      this.y -= 2 * delta
    }
    if (this.direction === 'down') {
      if (this.y > window.innerHeight + CIRCLE_RADIUS) {
        this.y = -CIRCLE_RADIUS
        return
      }
      this.y += 2 * delta
    }
    if (this.direction === 'right') {
      if (this.x > window.innerWidth + CIRCLE_RADIUS) {
        this.x = -CIRCLE_RADIUS
        return
      }
      this.x += 2 * delta
    }
    if (this.direction === 'left') {
      if (this.x <= 0 - CIRCLE_RADIUS) {
        this.x = -CIRCLE_RADIUS
        return
      }
      this.x -= 2 * delta
    }
    if (['leftUp', 'leftDown', 'rightUp', 'rightDown'].includes(this.direction)) {
      if (['leftUp', 'leftDown'].includes(this.direction)) {
        if (this.x <= 0 - CIRCLE_RADIUS) {
          if (!this.boundaryH) {
            this.boundaryH = Math.abs(this.y) - this.endCenter.y
          }
          this.x = window.innerWidth + CIRCLE_RADIUS
          this.y = this.startCenter.y - this.boundaryH
          return
        }
      }
      if (['rightUp', 'rightDown'].includes(this.direction)) {
        if (this.x >= window.innerWidth + CIRCLE_RADIUS) {
          if (!this.boundaryH) {
            this.boundaryH = Math.abs(this.y) - this.endCenter.y
          }
          this.x = -CIRCLE_RADIUS
          this.y = this.startCenter.y - this.boundaryH
          return
        }
      }
      const targetX = this.endCenter.x - this.startCenter.x
      const targetY = this.endCenter.y - this.startCenter.y
      const angle = Math.atan2(targetY, targetX)
      const deltaX = 2 * delta * Math.cos(angle); // 計算X方向上的變化
      const deltaY = 2 * delta * Math.sin(angle); // 計算Y方向上的變化
      this.x += deltaX;
      this.y += deltaY;
    }
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
    end: 7,
    direction: 'right'
  })
  drawCircle({
    start: 3,
    end: 1,
    direction: 'right'
  })
  drawCircle({
    start: 7,
    end: 9,
    direction: 'right'
  })
  drawCircle({
    start: 9,
    end: 1,
    direction: 'right'
  })

  app.value.ticker.add(function (delta) {
    circles.value.forEach((circle) => {
      circle.customMove(delta)
    })
  });
})

defineExpose({
  drawCircle
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
