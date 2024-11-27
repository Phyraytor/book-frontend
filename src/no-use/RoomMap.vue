<template>
  <div class="step">
    <button @click="moveLeft">Left</button>
    <button @click="moveRight">Right</button>
    <button @click="moveTop">Top</button>
    <button @click="moveBottom">Bottom</button>
    <button @click="createRoom">Новая комната</button>
    <div class="step__content">
      <div
        v-for="(room, i) in rooms"
        :key="'' + room.top + room.left"
        :class="`room ${room.type === 'block' ? 'room__block' : ''}`"
        :style="{
          width: room.width + 'px',
          height: room.height + 'px',
          top: room.top + 'px',
          left: room.left + 'px',
        }"
      >
        <div @click="move(i)" class="room__move">
          <div @click="moveItemTop(i)" class="room__moveTop">+</div>
          <div @click="moveItemLeft(i)" class="room__moveLeft">+</div>
          <div @click="moveItemBottom(i)" class="room__moveBottom">-</div>
          <div @click="moveItemRight(i)" class="room__moveRight">-</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'

const WIDTH = 945
const HEIGHT = 498
export default {
  name: 'RoomMap',
  setup () {
    const rooms = ref([
      {
        width: 100,
        height: 150,
        left: 77,
        top: 0
      },
      {
        width: 75,
        height: 48,
        top: 102,
        left: 0
      },
      {
        width: 75,
        height: 100,
        top: 0,
        left: 0
      }
    ])
    const moveLeft = () => {
      const min = Math.min(...rooms.value.map(room => room.left))
      rooms.value.forEach(room => {
        room.left -= min
      })
    }
    const moveRight = () => {
      const max = Math.max(...rooms.value.map(room => room.left + room.width))
      rooms.value.forEach(room => {
        room.left = WIDTH - (max - room.left)
      })
    }
    const moveTop = () => {
      const min = Math.min(...rooms.value.map(room => room.top))
      rooms.value.forEach(room => {
        room.top -= min
      })
    }
    const moveBottom = () => {
      const max = Math.max(...rooms.value.map(room => room.top + room.height))
      rooms.value.forEach(room => {
        room.top = HEIGHT - (max - room.top)
      })
    }

    const createRoom = () => {
      moveLeft()
      moveTop()
      rooms.value.push({
        width: 100,
        height: 100,
        top: 0,
        left: 2 + Math.max(...rooms.value.map(room => room.left + room.width))
      })
    }

    const getCollisions = (value: any) => rooms.value.filter(room =>
      room !== value &&
      (room.top <= value.top + value.height ||
      room.top + room.height >= value.top))
    const moveItemLeft = (i: any) => {
      const maxRight = Math.max(
        ...getCollisions(rooms.value[i])
          .filter(room =>
            room !== rooms.value[i] && room.width + room.left >= rooms.value[i].left
          ).map(room => room.left + room.width)
      ) || 0
      rooms.value[i].left = maxRight
    }

    const moveItemRight = (i: any) => {
      const minLeft = Math.min(
        ...getCollisions(rooms.value[i])
          .filter(room =>
            room !== rooms.value[i] && room.left <= rooms.value[i].left + rooms.value[i].width
          ).map(room => room.left)
      ) || 0
      console.log('minLeft', minLeft, getCollisions(rooms.value[i]))
      rooms.value[i].left = WIDTH - (rooms.value[i].width + minLeft)
    }
    const moveItemTop = (i: any) => {
      rooms.value[i].top = 0
    }
    const moveItemBottom = (i: any) => {
      rooms.value[i].top = HEIGHT - rooms.value[i].top
    }

    const move = (i: any) => {}

    return {
      rooms,
      moveLeft,
      moveRight,
      moveTop,
      moveBottom,
      moveItemLeft,
      moveItemRight,
      moveItemTop,
      moveItemBottom,
      createRoom,
      move
    }
  }
}
</script>
<style>
  .step {
    background: #fff;
    padding: 16px;
    margin: 32px 0;
    border-radius: 5px;
  }

  .step__content {
    position: relative;
    width: 100%;
    min-height: 500px;
  }

  .room {
    position: absolute;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .room__block {
    position: absolute;
    border: 2px solid #000;
    background: #000;
  }

  .room__move {
    width: 8px;
    height: 8px;
    background: #21d23c;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
  }

  .room__moveTop {
    position: absolute;
    top: -20px;
  }

  .room__moveBottom {
    position: absolute;
    bottom: -20px;
  }

  .room__moveLeft {
    position: absolute;
    left: -20px;
  }

  .room__moveRight {
    position: absolute;
    right: -20px;
  }
</style>
