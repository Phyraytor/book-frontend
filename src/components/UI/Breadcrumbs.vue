<template>
  <ul v-if="items.length" class="breadcrumbs">
    <li v-for="item in items" :key="item.name" class="breadcrumbs__item">
      <router-link :to="item.link" class="breadcrumbs__link">{{ item.name }}</router-link>
      <span class="breadcrumbs__next">></span>
    </li>
  </ul>
  <router-link v-else to="/" class="back task__persons">
    <icon-back />
  </router-link>
</template>

<script>
import { ref } from 'vue'
import IconBack from '@/components/assets/svg/IconBack'

export default {
  name: 'BreadCrumbs',
  components: {
    IconBack
  },
  setup () {
    // Todo: В идеале, нужно знать имена родителей, а для этого нужен особый запрос, который будет вытягивать только эти данные
    // Todo: Так что пока делаем такой костыль, а потом сделаем на беке один универсальный запрос, который будет возвращать нам объект Breadcrumbs
    const items = ref([])
    const TRANSLATE = {
      worlds: 'Мир',
      games: 'Игра',
      persons: 'Персонаж',
      spells: 'Умение',
      steps: 'Шаг'
    }
    const path = window.location.pathname.split('/').filter(x => x)
    let currentLink = ''
    for (let i = 0; i < path.length - 2; i += 2) {
      const type = path[i]
      currentLink += `/${type}`
      const id = path[i + 1]
      if (id) {
        currentLink += `/${id}`
      }
      items.value.push({
        name: TRANSLATE[type],
        link: currentLink
      })
    }
    return {
      items
    }
  }
}
</script>

<style scoped>
  .breadcrumbs {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    font-size: 18px;
  }
  .breadcrumbs__next {
    margin: 0 4px;
  }
  .breadcrumbs__item:last-child .breadcrumbs__next {
    display: none;
  }

  .breadcrumbs__link {
    transition: 0.3s;
  }

  .breadcrumbs__link:hover {
    color: rgb(38, 64, 89);
  }
</style>
