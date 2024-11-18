<template>
  <sidebar-block
    title="Сообщения"
    type="messages"
    :create="createMessage"
    :items="items"
  />
</template>

<script>
import SidebarBlock from '@/components/Sidebar/SidebarBlock'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
const API = 'http://localhost:3030'

export default {
  name: 'SidebarBlockMessages',
  components: {
    SidebarBlock
  },
  props: ['items'],
  setup () {
    const router = useRouter()
    const route = useRoute()
    const gameId = route.params.gameId
    const stepId = route.params.stepId
    const createMessage = async () => {
      const response = await fetch(`${API}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: '',
          stepId
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const message = await response.json()
      router.push({ name: 'message-page', params: { gameId, stepId, id: message.id } })
    }
    return {
      createMessage
    }
  }
}
</script>

<style scoped>

</style>
