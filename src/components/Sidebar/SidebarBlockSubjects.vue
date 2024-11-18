<template>
  <sidebar-block
    title="Предметы"
    type="subjects"
    :create="createSubject"
    :items="subjects"
  />
</template>

<script>
import SidebarBlock from '@/components/Sidebar/SidebarBlock'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { onMounted, ref } from 'vue'
const API = 'http://localhost:3030'

export default {
  name: 'SidebarBlockSubjects',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const subjects = ref([])
    const gameId = route.params.gameId
    const createSubject = async () => {
      const response = await fetch(`${API}/subjects`, {
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
      const subject = await response.json()
      router.push({ name: 'subject-page', params: { gameId, id: subject.id } })
    }

    const getSubject = async (gameId) => {
      const response = await fetch(`${API}/subjects?gameId=${gameId}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      subjects.value = await response.json()
    }

    onMounted(() => {
      getSubject(gameId)
    })

    return {
      createSubject,
      subjects
    }
  }
}
</script>

<style scoped>

</style>
