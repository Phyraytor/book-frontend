<template>
  <div class="sidebar__title">
    <span>{{ title }}</span>
    <icon-plus :click="create" />
  </div>
  <ul :class="`${keyImage ? 'sidebar--image' : ''}`">
    <li v-for="item in sortedItems" :key="item.id" class="sidebar__item">

      <span v-if="updateItemOrderBy" class="order">
        <span class="order-change">
          <span class="order-change__up" @click="decOrderBy(item)">▲</span>
          <span class="order-change__down" @click="incOrderBy(item)">▼</span>
        </span>
      </span>

      <router-link :to="makeLink(item.id)" class="sidebar__link">
        <img v-if="keyImage" :src="getImage(item[keyImage])" alt="" class="sidebar__img" />
        <span class="sidebar__name">{{ item.name || 'Имя не задано' }}</span>
      </router-link>

      <span v-if="updateItemOrderBy" class="order__value">
        {{ item.orderBy }}
      </span>

    </li>
  </ul>
</template>

<script lang="ts">
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import { IStep } from '@/interfaces/step'
import { ref, watch } from 'vue'

interface ISidebarItem {
  id: number;
  name: string;
  orderBy: number;
}

export default {
  name: 'SidebarBlock',
  components: {
    IconPlus
  },
  props: ['title', 'create', 'items', 'type', 'keyImage', 'updateItemOrderBy'],
  setup (props: any) {
    const sortedItems = ref<ISidebarItem[]>([])
    const makeLink = (itemId: number) => `${window.location.pathname}/${props.type}/${itemId}`
    const getImage = (image: string) => process.env.VUE_APP_API_URL + image

    const sortSteps = () => {
      if (!sortedItems.value) return
      sortedItems.value.sort((x: ISidebarItem, y: ISidebarItem) => x.orderBy - y.orderBy)
    }

    const incOrderBy = (step: IStep) => {
      props.updateItemOrderBy?.(step.id, step.orderBy + 1)
      step.orderBy++
      sortSteps()
    }

    const decOrderBy = (step: IStep) => {
      props.updateItemOrderBy?.(step.id, step.orderBy - 1)
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

<style scoped lang="scss">
  .sidebar {
    &__link {
      display: flex;
      align-items: center;
      transition: 0.3s;
      flex-grow: 1;
      padding: 12px;
      border-bottom: 1px solid #e7e8ec;
      &:hover {
        background: #303841;
        color: #fff;
      }
    }

    &__title {
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

    &__item {
      display: flex;
    }

    &--image {
      display: flex;
      flex-wrap: wrap;
      gap: 1px;
      padding: 1px;

      & .sidebar__img {
        width: 100%;
        display: flex;
        align-items: center;
        height: 100%;
      }

      & .sidebar__name {
        width: 100%;
        text-align: center;
        padding: 4px 0;
      }

      & .sidebar__item {
        flex: 0 0 calc(50% - 0.5px);
      }

      & .sidebar__link {
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
        padding: 0;
      }
    }
  }

  .order {
    border-right: 1px solid #e7e8ec;
    display: flex;
    align-items: center;
    gap: 8px;

    &__value {
      border-left: 1px solid #e7e8ec;
      border-bottom: 1px solid #e7e8ec;
      min-width: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 4px;
    }

    &-change {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #e7e8ec;

      &__up {
        padding: 4px 8px 2px;
        cursor: pointer;

        &:hover {
          background: #303841;
          color: #fff;
        }
      }

      &__down {
        padding: 2px 8px 4px;
        cursor: pointer;

        &:hover {
          background: #303841;
          color: #fff;
        }
      }
    }
  }
</style>
