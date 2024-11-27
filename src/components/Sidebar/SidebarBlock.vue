<template>
  <div class="sidebar__title">
    <span>{{ title }}</span>
    <icon-plus :click="create" />
  </div>
  <ul :class="`${keyImage ? 'sidebarImage' : ''}`">
    <li v-for="item in sortedItems" :key="item.id" class="sidebar__item">

      <span v-if="updateStepOrder" class="step__order">
        <span class="step__orderChange">
          <span class="step__up" @click="decOrderBy(item)">▲</span>
          <span class="step__down" @click="incOrderBy(item)">▼</span>
        </span>
      </span>

      <router-link :to="makeLink(item.id)" class="sidebar__link">
        <img v-if="keyImage" :src="getImage(item[keyImage])" alt="" class="sidebar__image" />
        <span class="sidebar__name">{{ item.name || 'Имя не задано' }}</span>
      </router-link>

      <span v-if="updateStepOrder" class="order__value">
        {{ item.orderBy }}
      </span>

    </li>
  </ul>
</template>

<script lang="ts">
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import { IStep } from '@/interfaces/step'
import { ref, watch } from 'vue'

export default {
  name: 'SidebarBlock',
  components: {
    IconPlus
  },
  props: ['title', 'create', 'items', 'type', 'keyImage', 'updateStepOrder'],
  setup (props: any) {
    const sortedItems = ref<any>([])
    const makeLink = (itemId: number) => `${window.location.pathname}/${props.type}/${itemId}`
    const getImage = (image: string) => process.env.VUE_APP_API_URL + image

    const sortSteps = () => {
      if (!sortedItems.value) return
      sortedItems.value.sort((x: any, y: any) => x.orderBy - y.orderBy)
    }

    const incOrderBy = (step: IStep) => {
      props.updateStepOrder?.(step.id, step.orderBy + 1)
      step.orderBy++
      sortSteps()
    }

    const decOrderBy = (step: IStep) => {
      props.updateStepOrder?.(step.id, step.orderBy - 1)
      step.orderBy--
      sortSteps()
    }

    watch(() => props.items, (newItems) => {
      sortedItems.value = newItems
      sortSteps()
    }, { immediate: true })

    return {
      sortedItems,
      incOrderBy,
      decOrderBy,
      makeLink,
      getImage
    }
  }
}
</script>

<style scoped>

.step__order {
  border-right: 1px solid #e7e8ec;
  display: flex;
  align-items: center;
  gap: 8px;
}
.step__orderChange {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #e7e8ec;
}
.step__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}
.step__up {
  padding: 4px 8px 2px;
  cursor: pointer;
}
.step__up:hover, .step__down:hover {
  background: #303841;
  color: #fff;
}
.step__down {
  padding: 2px 8px 4px;
  cursor: pointer;
}
.order__value {
  border-left: 1px solid #e7e8ec;
  border-bottom: 1px solid #e7e8ec;
  min-width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 4px;
}

.sidebar__link {
  display: flex;
  align-items: center;
  transition: 0.3s;
  flex-grow: 1;
  padding: 12px;
  border-bottom: 1px solid #e7e8ec;
}

.sidebar__title {
  border-bottom: 1px solid #e7e8ec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  font-size: 18px;
  font-weight: bold;
  gap: 12px;
  padding-left: 12px;
  height: 72px;
}

.sidebar__item {
  display: flex;
}

.sidebarImage {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 1px;
}

.sidebarImage .sidebar__image {
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
}

.sidebarImage .sidebar__name {
  width: 100%;
  text-align: center;
  padding: 4px 0;
}

.sidebarImage .sidebar__item {
  flex: 0 0 calc(50% - 0.5px);
}

.sidebarImage .sidebar__link {
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  padding: 0;
}

.sidebar__link:hover, .person__link:hover {
  background: #303841;
  color: #fff;
}
</style>
