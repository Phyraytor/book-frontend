<template>
  <div class="head">
    <div class="content head__content">
      <h1 class="title">Список миров</h1>
      <icon-plus :click="createWorld" />
    </div>
  </div>
  <div class="worlds">
    <ul class="worlds-list">
      <li
        v-for="(world, index) in worlds"
        class="worlds-list__item"
        :key="world.id"
      >
        <router-link class="worlds-list__link" :to="`/worlds/${world.id}`">
          <span class="world-index">{{ index + 1 }}</span>
          <span class="world-text">{{ world.name }}</span>
          <div class="buttons">
            <icon-mobile v-if="world.isMobile" :click="createWorld" />
            <icon-online v-if="world.isOnline" :click="createWorld" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import IconPlus from '@/components/assets/svg/IconPlus'
import IconOnline from '@/components/assets/svg/IconOnline'
import IconMobile from '@/components/assets/svg/IconMobile'
import { useRouter } from 'vue-router/dist/vue-router'
const API = 'http://localhost:3030'
export default {
  name: 'WorldList',
  components: { IconPlus, IconOnline, IconMobile },
  setup () {
    const router = useRouter()
    const worlds = ref([])
    const ages = computed(() => {
      const result = []
      const last = worlds.value?.[worlds.value.length - 1]?.age
      for (let i = 1; i <= last; i++) {
        result.push(worlds.value.filter(world => world.age === i))
      }
      return result
    })
    const getWorlds = async () => {
      const response = await fetch(`${API}/worlds`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      worlds.value = await response.json()
    }

    const createWorld = async () => {
      const response = await fetch(`${API}/worlds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: '',
          description: ''
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const world = await response.json()
      router.push({ name: 'world-page', params: { id: world.id } })
    }

    onMounted(() => {
      getWorlds()
    })

    return {
      ages,
      worlds,
      createWorld
    }
  }
}
</script>
<style>
  .world-index {
    padding: 0;
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e7e8ec;
  }
  .world-text {
    padding: 0;
    padding-left: 12px;
  }
  .world {
    background: #fff;
  }

  .world_mobile {
    background: #a5a27f;
  }

  .world_online {
    background: #e7e1b1;
  }

  .world_mobile_online {
    background: #0f637f;
  }
  .age {
    margin: 0;
    font-size: 24px;
    font-weight: 501;
    margin-bottom: 32px;
  }

  .worlds {
    margin: 0 auto;
    width: 1000px;
    border-left: 1px solid #e7e8ec;
    border-right: 1px solid #e7e8ec;
    min-height: calc(100vh - 96px);
  }

  .worlds-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .worlds-list__item {
    width: 100%;
    font-size: 24px;
    border-bottom: 1px solid #eaeaef;
  }

  .worlds-list__link {
    color: #000;
    text-decoration: none;
    width: 100%;
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .worlds-list__link img {
    width: 24px;
    margin-left: 8px;
    height: auto;
  }

  .worlds-list__link:hover {
    background: #303841;
    color: #fff;
  }

  .block {
    background: #fff;
    padding: 24px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(175,183,202,.28);
    margin-bottom: 24px;
  }
</style>
