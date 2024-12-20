<template>
  <ul v-if="items.length" class="breadcrumbs">
    <li v-for="item in items" :key="item.name" class="breadcrumbs__item">
      <router-link :to="item.link" class="breadcrumbs__link">{{ item.name }}</router-link>
      <span class="breadcrumbs__next">></span>
    </li>
  </ul>
  <router-link v-if="!items.length && !isHome" to="/">
    <icon-back />
  </router-link>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import IconBack from '@/components/assets/svg/IconBack.vue'

export default {
  name: 'BreadCrumbs',
  components: {
    IconBack
  },
  setup () {
    // Todo: В идеале, нужно знать имена родителей, а для этого нужен особый запрос, который будет вытягивать только эти данные
    // Todo: Так что пока делаем такой костыль, а потом сделаем на беке один универсальный запрос, который будет возвращать нам объект Breadcrumbs
    const items = ref<any[]>([])
    const TRANSLATE = {
      worlds: 'Мир',
      games: 'Игра',
      persons: 'Персонаж',
      spells: 'Умение',
      steps: 'Шаг',
      articles: 'Статьи',
      subjects: 'Предмет'
    }
    const path = window.location.pathname.split('/').filter(x => x)
    const isHome = computed(() => window.location.pathname === '/')
    let currentLink = ''
    for (let i = 0; i < path.length - 2; i += 2) {
      const type = path[i]
      currentLink += `/${type}`
      const id = path[i + 1]
      if (id) {
        currentLink += `/${id}`
      }
      items.value.push({
        // @ts-ignore
        name: TRANSLATE[type],
        link: currentLink
      })
    }
    return {
      items,
      isHome
    }
  }
}
</script>

<style scoped lang="scss">
  .breadcrumbs {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    font-size: 18px;
    &__next {
      margin: 0 4px;
    }
    &__link {
      transition: 0.3s;
      &:hover {
        color: rgb(38, 64, 89);
      }
    }
    &__item:last-child .breadcrumbs__next {
      display: none;
    }
  }
</style>
