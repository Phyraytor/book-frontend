<template>
  <icon-svg :class-name="className" :click="click">
    <svg
      fill="#000000"
      height="800px"
      width="800px"
      viewBox="0 0 24 24"
      xml:space="preserve"
    >
      <path
        d="M19,0H1C0.448,0,0,0.448,0,1v22c0,0.552,0.448,1,1,1h22c0.552,0,1-0.448,1-1V5L19,0z M6,3c0-0.552,0.448-1,1-1h10
        c0.552,0,1,0.448,1,1v6c0,0.552-0.448,1-1,1H7c-0.552,0-1-0.448-1-1V3z M20,22H4v-7c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1V22z"
        fill="#447bba"
      />
      <path d="M16,9h-4V3h4V9z" fill="#447bba" />
    </svg>
  </icon-svg>
</template>

<script lang="ts">
import IconSvg from '@/components/assets/svg/IconSvg.vue'

export default {
  name: 'IconSave',
  components: { IconSvg },
  props: ['className', 'click'],
  setup () {
    return {
    }
  }
}
</script>
