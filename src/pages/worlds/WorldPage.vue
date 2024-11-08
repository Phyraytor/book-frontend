<template>
  <div class="head">
    <router-link :to="`/`" class="back game__persons">
      <icon-back />
    </router-link>
    <div class="content flex">
      <input v-if="isEdit" v-model="world.name" type="text" class="input__title">
      <h1 v-else class="title">{{ world.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateWorld" />
      <icon-pencil v-else :click="editWorld" />
    </div>
    <div class="buttons game__persons">
      <icon-remove :click="removeWorld" />
    </div>
  </div>
  <div class="main">
    <div class="game__description" />
    <div class="content">
      <textarea v-if="isEdit" v-model="world.description" class="description textarea" />
      <div v-else class="description">
        {{ world.description || 'Описание не задано' }}
      </div>
    </div>
    <div class="game__description">
      <div class="steps__title">
        <span>Игры</span>
        <icon-plus :click="createGame"/>
      </div>
      <ul class="steps">
        <li v-for="game in world.games" :key="game.id">
          <router-link :to="`/worlds/${id}/games/${game.id}`" class="person__link">
            {{ game.name || 'Имя не задано' }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import IconPlus from '@/components/assets/svg/IconPlus'
import IconBack from '@/components/assets/svg/IconBack'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconRemove from '@/components/assets/svg/IconRemove'
const API = 'http://localhost:3030'
export default {
  name: 'WorldPage',
  components: { IconBack, IconSave, IconPencil, IconRemove, IconPlus },
  setup () {
    const name = ref('')
    const isEdit = ref(false)
    const world = ref({})
    const games = ref([])
    const route = useRoute()
    const id = route.params.id
    const router = useRouter()
    const editWorld = () => {
      isEdit.value = true
    }

    const createGame = async () => {
      const response = await fetch(`${API}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          planes: '',
          sources: '',
          notices: '',
          story: '',
          name: '',
          description: '',
          worldId: id
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const game = await response.json()
      router.push({ name: 'games-page', params: { worldId: id, id: game.id } })
    }
    const getGames = async () => {
      const response = await fetch(`${API}/games`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      games.value = await response.json()
    }

    const getWorld = async () => {
      const response = await fetch(`${API}/worlds/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      world.value = await response.json()
    }
    const removeWorld = async () => {
      const response = await fetch(`${API}/worlds/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      router.push({ name: 'home' })
    }

    const updateWorld = async () => {
      const response = await fetch(`${API}/worlds/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: world.value.description,
          name: world.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getWorld()
      getGames()
    })

    return {
      createGame,
      world,
      editWorld,
      updateWorld,
      removeWorld,
      games,
      isEdit,
      id,
      name
    }
  }
}
</script>

<style scoped>
</style>
