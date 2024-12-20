<template>
  <sidebar-block
    title="Способности"
    type="spells"
    :create="createSpell"
    :items="items"
  />
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import SidebarBlock from '@/components/Sidebar/SidebarBlock.vue'
import QuerySpells from '@/queries/spell'
import { ISpellCreate } from '@/interfaces/spell'

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
    const subjectId = route.params.subjectId

    const getParentParams = () => {
      if (personId) {
        return {
          parentName: 'person',
          parentParams: { personId: +personId }
        }
      }
      if (enemyId) {
        return {
          parentName: 'enemy',
          parentParams: { enemyId: +enemyId }
        }
      }
      if (subjectId) {
        return {
          parentName: 'subject',
          parentParams: { subjectId: +subjectId }
        }
      }
      return { parentName: '', parentParams: {} }
    }

    const createSpell = async () => {
      const { parentParams, parentName } = getParentParams()
      const params: ISpellCreate = {
        name: '',
        description: '',
        ...parentParams
      }
      const spell = await QuerySpells.$post(params)
      router.push({
        name: `spell-${parentName}-page`,
        params: { gameId, spellId: spell.id, ...parentParams }
      })
    }

    return {
      createSpell
    }
  }
}
</script>

<style scoped>

</style>
