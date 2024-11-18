<template>
  <PageLayout>
    <template #header>
      <input v-if="isEdit" v-model="world.name" type="text" class="input__title">
      <h1 v-else class="title">{{ world.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateWorld" />
      <icon-pencil v-else :click="editWorld" />
    </template>
    <template #description>
      <textarea v-if="isEdit" v-model="world.description" class="description textarea" />
      <div v-else class="description">
        {{ world.description || 'Описание не задано' }}
      </div>
    </template>
    <template #sidebarRight>
      <sidebar-block-games :items="world.games"/>
    </template>
  </PageLayout>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import PageLayout from '@/layouts/PageLayout'
import SidebarBlockGames from '@/components/Sidebar/SidebarBlockGames'

const API = 'http://localhost:3030'
export default {
  name: 'WorldPage',
  components: { SidebarBlockGames, IconSave, IconPencil, PageLayout },
  setup () {
    const name = ref('')
    const isEdit = ref(false)
    const world = ref({})
    const games = ref([])
    const route = useRoute()
    const id = route.params.worldId
    const router = useRouter()
    const editWorld = () => {
      isEdit.value = true
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
