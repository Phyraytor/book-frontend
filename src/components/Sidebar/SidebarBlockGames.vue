<template>
  <sidebar-block
    title="Игры"
    type="games"
    :create="createGame"
    :items="items"
  />
</template>

<script>
import SidebarBlock from '@/components/Sidebar/SidebarBlock'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
const API = 'http://localhost:3030'
export default {
  name: 'SidebarBlockGames',
  components: {
    SidebarBlock
  },
  props: ['items'],
  setup () {
    const router = useRouter()
    const route = useRoute()
    const worldId = route.params.worldId
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
          worldId
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const game = await response.json()
      router.push({ name: 'games-page', params: { worldId, id: game.id } })
    }
    return {
      createGame
    }
  }
}
</script>

<style scoped>

</style>
