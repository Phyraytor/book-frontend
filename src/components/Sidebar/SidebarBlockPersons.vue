<template>
  <sidebar-block
    title="Персонажи"
    type="persons"
    :create="createPerson"
    :items="persons"
  />
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import QueryPersons from '@/queries/person'
import SidebarBlock from '@/components/Sidebar/SidebarBlock.vue'
import { IPerson } from '@/interfaces/person'

export default {
  name: 'SidebarBlockPersons',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const persons = ref<IPerson[]>([])
    const worldId = route.params.worldId
    const gameId = route.params.gameId
    const createPerson = async () => {
      const person = await QueryPersons.$post({
        name: '',
        description: '',
        gameId: +gameId
      })
      router.push({ name: 'person-page', params: { worldId, gameId, personId: person.id } })
    }

    const getPersons = async (gameId: number) => {
      persons.value = await QueryPersons.$getAll({ gameId })
    }

    onMounted(() => {
      getPersons(+gameId)
    })

    return {
      createPerson,
      persons
    }
  }
}
</script>

<style scoped>

</style>
