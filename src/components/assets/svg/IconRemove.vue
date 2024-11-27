<template>
  <icon-svg :class-name="className" :click="click">
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
    >
      <path
        d="M2.875 5.75H4.79167H20.125"
        stroke="#FD3232"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.6665 5.7513V3.83464C7.6665 3.3263 7.86844 2.83879 8.22788 2.47935C8.58733 2.1199 9.07484 1.91797 9.58317 1.91797H13.4165C13.9248 1.91797 14.4123 2.1199 14.7718 2.47935C15.1312 2.83879 15.3332 3.3263 15.3332 3.83464V5.7513M18.2082 5.7513V19.168C18.2082 19.6763 18.0062 20.1638 17.6468 20.5233C17.2873 20.8827 16.7998 21.0846 16.2915 21.0846H6.70817C6.19984 21.0846 5.71233 20.8827 5.35288 20.5233C4.99344 20.1638 4.7915 19.6763 4.7915 19.168V5.7513H18.2082Z"
        stroke="#FD3232"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.5835 10.543V16.293"
        stroke="#FD3232"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.4165 10.543V16.293"
        stroke="#FD3232"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

  </icon-svg>
</template>

<script lang="ts">
import IconSvg from '@/components/assets/svg/IconSvg.vue'

export default {
  name: 'IconRemove',
  components: { IconSvg },
  props: ['className', 'click'],
  setup () {
    return {
    }
  }
}
</script>
