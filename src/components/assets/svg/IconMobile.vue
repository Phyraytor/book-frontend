<template>
  <icon-svg :class-name="className" :click="click">
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none">
      <path d="M9 2C9 1.44772 9.44772 1 10 1H14C14.5523 1 15 1.44772 15 2V3C15 3.55228 14.5523 4 14 4H10C9.44772 4 9 3.55228 9 3V2Z" fill="#000000"/>
      <rect x="5.75" y="1.75" width="12.5" height="20.5" rx="1.75" stroke="#000000" stroke-width="1.5"/>
      <path d="M9 19.5H15" stroke="#000000" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </icon-svg>
</template>

<script lang="ts">
import IconSvg from '@/components/assets/svg/IconSvg.vue'

export default {
  name: 'IconMobile',
  components: { IconSvg },
  props: ['className', 'click'],
  setup () {
    return {
    }
  }
}
</script>
