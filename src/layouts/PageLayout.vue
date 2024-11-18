<template>
  <div>
    <div class="head">
      <div class="game__persons">
        <breadcrumbs />
      </div>
      <div class="content flex">
        <slot name="header" />
      </div>
      <div class="buttons game__persons">
        <icon-remove :click="remove"  />
      </div>
    </div>
    <div class="main">
      <div class="game__persons">
        <slot name="sidebarLeft" />
      </div>
      <div class="game__description">
        <slot name="description" />
      </div>
      <div class="game__persons">
        <slot name="sidebarRight" />
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '@/components/UI/Breadcrumbs'
import IconRemove from '@/components/assets/svg/IconRemove'

export default {
  name: 'PageLayout',
  components: {
    Breadcrumbs,
    IconRemove
  },
  props: ['remove'],
  setup () {
    return {}
  }
}
</script>

<style scoped>

</style>
