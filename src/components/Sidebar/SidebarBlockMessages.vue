<template>
  <sidebar-block
    title="Сообщения"
    type="messages"
    :create="createMessage"
    :items="items"
  />
</template>

<script lang="ts">
import SidebarBlock from '@/components/Sidebar/SidebarBlock.vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import QueryMessages from '@/queries/message'

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
      const message = await QueryMessages.$post({
        name: '',
        stepId: +stepId
      })
      router.push({ name: 'message-page', params: { gameId, stepId, messageId: message.id } })
    }
    return {
      createMessage
    }
  }
}
</script>

<style scoped>

</style>
