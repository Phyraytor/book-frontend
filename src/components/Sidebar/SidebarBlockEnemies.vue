<template>
  <sidebar-block
    title="Противники"
    type="enemies"
    :create="createEnemy"
    :items="enemies"
    key-image="imagePath"
  />
</template>

<script>
import SidebarBlock from '@/components/Sidebar/SidebarBlock'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { onMounted, ref } from 'vue'
const API = 'http://localhost:3030'

export default {
  name: 'SidebarBlockEnemies',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const enemies = ref([])
    const gameId = route.params.gameId
    const createEnemy = async () => {
      const response = await fetch(`${API}/enemies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: '',
          description: '',
          gameId
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const enemy = await response.json()
      router.push({ name: 'enemy-page', params: { gameId, id: enemy.id } })
    }

    const getEnemy = async (gameId) => {
      const response = await fetch(`${API}/enemies?gameId=${gameId}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      enemies.value = await response.json()
    }

    onMounted(() => {
      getEnemy(gameId)
    })

    return {
      createEnemy,
      enemies
    }
  }
}
</script>

<style scoped>

</style>
