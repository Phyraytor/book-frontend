<template>
  <sidebar-block
    title="Способности"
    type="spells"
    :create="createSpell"
    :items="items"
  />
</template>

<script>
import SidebarBlock from '@/components/Sidebar/SidebarBlock'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
const API = 'http://localhost:3030'

export default {
  name: 'SidebarBlockSpells',
  components: {
    SidebarBlock
  },
  props: ['items'],
  setup () {
    const router = useRouter()
    const route = useRoute()
    const gameId = route.params.gameId
    const personId = route.params.personId
    const enemyId = route.params.enemyId

    const createSpell = async () => {
      const params = {
        name: '',
        description: ''
      }
      if (personId) {
        params.personId = personId
      }
      if (enemyId) {
        params.enemyId = enemyId
      }
      const response = await fetch(`${API}/spells`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(params)
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const spell = await response.json()
      const routerParams = { gameId, spellId: spell.id }
      if (personId) {
        routerParams.personId = personId
      }
      if (enemyId) {
        routerParams.enemyId = enemyId
      }
      const routerName = `spell-${personId ? 'person' : 'enemy'}-page`
      router.push({ name: routerName, params: routerParams })
    }

    return {
      createSpell
    }
  }
}
</script>

<style scoped>

</style>
