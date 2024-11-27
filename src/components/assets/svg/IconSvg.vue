<template>
  <div :class="`icon ${className}`" @click="click">
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'IconSvg',
  props: ['className', 'click'],
  setup () {
    return {
    }
  }
}
</script>

<style lang="scss">
.icon {
  cursor: pointer;
  width: 24px;
  height: 24px;
  padding: 24px;
  transition: 0.3s;
}

.icon svg {
  width: 100%;
  height: 100%;
}

.icon svg path {
  fill: #000;
}

.icon:hover {
  background: #303841;
}

.icon:hover svg path {
  fill: #fff;
}
</style>
