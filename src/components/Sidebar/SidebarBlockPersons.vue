<template>
  <sidebar-block
    title="Персонажи"
    type="persons"
    :create="createPerson"
    :items="persons"
  />
</template>

<script>
import SidebarBlock from '@/components/Sidebar/SidebarBlock'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { onMounted, ref } from 'vue'
const API = 'http://localhost:3030'

export default {
  name: 'SidebarBlockPersons',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const persons = ref([])
    const gameId = route.params.gameId
    const createPerson = async () => {
      const response = await fetch(`${API}/persons`, {
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
      const person = await response.json()
      router.push({ name: 'person-page', params: { gameId, id: person.id } })
    }

    const getPersons = async (gameId) => {
      const response = await fetch(`${API}/persons?gameId=${gameId}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      persons.value = await response.json()
    }

    onMounted(() => {
      getPersons(gameId)
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
