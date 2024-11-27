<template>
  <sidebar-block
    title="Способности"
    type="spells"
    :create="createSpell"
    :items="items"
  />
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import SidebarBlock from '@/components/Sidebar/SidebarBlock.vue'
import QueryTasks from '@/queries/task'
import { ITaskCreate } from '@/interfaces/task'

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
      const params: ITaskCreate = {
        title: '',
        description: ''
      }
      if (personId) {
        params.personId = +personId
      }
      if (enemyId) {
        params.enemyId = +enemyId
      }
      const spell = await QueryTasks.$post(params)
      const routerParams: any = { gameId, spellId: spell.id }
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
