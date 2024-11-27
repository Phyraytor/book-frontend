<template>
  <sidebar-block
    title="Противники"
    type="enemies"
    :create="createEnemy"
    :items="enemies"
    key-image="imagePath"
  />
</template>

<script lang="ts">
import SidebarBlock from '@/components/Sidebar/SidebarBlock.vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { onMounted, ref } from 'vue'
import { IEnemy } from '@/interfaces/enemy'
import QueryEnemies from '@/queries/enemy'

export default {
  name: 'SidebarBlockEnemies',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const enemies = ref<IEnemy[]>([])
    const gameId = route.params.gameId
    const worldId = route.params.worldId
    const createEnemy = async () => {
      const enemy = await QueryEnemies.$post({
        name: '',
        description: '',
        gameId: +gameId
      })
      router.push({ name: 'enemy-page', params: { worldId, gameId, enemyId: enemy.id } })
    }

    const getEnemies = async (gameId: number) => {
      enemies.value = await QueryEnemies.$getAll({ gameId })
    }

    onMounted(() => {
      getEnemies(+gameId)
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
