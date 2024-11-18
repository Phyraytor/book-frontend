<template>
  <div class="sidebar__title">
    <span>{{ title }}</span>
    <icon-plus :click="create" />
  </div>
  <ul :class="`${keyImage ? 'sidebarImage' : ''}`">
    <li v-for="item in items" :key="item.id" class="sidebar__item">
      <slot name="before"/>
      <router-link :to="makeLink(item.id)" class="sidebar__link">
        <img v-if="keyImage" :src="getImage(item[keyImage])" alt="" class="sidebar__image" />
        <span class="sidebar__name">{{ item.name || 'Имя не задано' }}</span>
      </router-link>
      <slot name="after"/>
    </li>
  </ul>
</template>

<script>
import IconPlus from '@/components/assets/svg/IconPlus'
const API = 'http://localhost:3030'

export default {
  name: 'SidebarBlock',
  components: {
    IconPlus
  },
  props: ['title', 'create', 'items', 'type', 'keyImage'],
  setup (props) {
    const makeLink = (itemId) => `${window.location.pathname}/${props.type}/${itemId}`
    const getImage = (image) => API + image
    return {
      makeLink,
      getImage
    }
  }
}
</script>

<style scoped>

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
  background: #e7e8ec;
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
