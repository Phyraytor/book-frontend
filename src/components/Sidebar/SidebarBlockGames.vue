<template>
  <sidebar-block
    title="Игры"
    type="games"
    :create="createGame"
    :items="games"
  />
</template>

<script lang="ts">
import SidebarBlock from '@/components/Sidebar/SidebarBlock.vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { onMounted, ref } from 'vue'
import { IGame } from '@/interfaces/games'
import QueryGames from '@/queries/game'
export default {
  name: 'SidebarBlockGames',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const games = ref<IGame[]>([])
    const worldId = route.params.worldId
    const createGame = async () => {
      const game = await QueryGames.$post({
        planes: '',
        sources: '',
        notices: '',
        story: '',
        name: '',
        description: '',
        worldId: +worldId
      })
      router.push({ name: 'game-page', params: { worldId, id: game.id } })
    }

    const getGames = async () => {
      games.value = await QueryGames.$getAll({ worldId: +worldId })
    }

    onMounted(() => {
      getGames()
    })

    return {
      createGame,
      games
    }
  }
}
</script>

<style scoped>

</style>
