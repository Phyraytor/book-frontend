<template>
  <div>
    <header class="header">
      <div class="sidebar">
        <breadcrumbs />
      </div>
      <div class="header__content">
        <slot name="header" />
      </div>
      <div class="header__buttons sidebar">
        <icon-remove v-if="remove" :click="remove"  />
      </div>
    </header>
    <main class="main">
      <div class="sidebar">
        <slot name="sidebarLeft" />
      </div>
      <div class="info">
        <slot name="description" />
      </div>
      <div class="sidebar">
        <slot name="sidebarRight" />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import IconRemove from '@/components/assets/svg/IconRemove.vue'

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

<style scoped lang="scss">
  .header {
    height: 72px;
    border-bottom: 1px solid #e7e8ec;
    display: flex;
    justify-content: space-between;
    &__content {
      display: flex;
      align-items: center;
      min-width: 1000px;
      max-width: 1000px;
      margin: 0 auto;
    }
    &__buttons {
      display: flex;
      cursor: pointer;
      justify-content: flex-end;
    }
  }

  .main {
    width: 100%;
    display: flex;
    align-items: stretch;
  }

  .sidebar {
    width: calc(calc(100% - 1000px) / 2);
  }

  .info {
    width: 1000px;
    border-left: 1px solid #e7e8ec;
    border-right: 1px solid #e7e8ec;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
