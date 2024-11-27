<template>
  <sidebar-block
    title="Этапы"
    type="steps"
    :create="createStep"
    :items="steps"
    :updateStepOrder="updateStepOrder"
  />
</template>

<script lang="ts">
import SidebarBlock from '@/components/Sidebar/SidebarBlock.vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { onMounted, ref } from 'vue'
import { IStep } from '@/interfaces/step'
import QuerySteps from '@/queries/step'

export default {
  name: 'SidebarBlockSteps',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const steps = ref<IStep[]>([])
    const gameId = route.params.gameId
    const createStep = async () => {
      const step = await QuerySteps.$post({
        name: '',
        description: '',
        gameId: +gameId
      })
      router.push({ name: 'step-page', params: { gameId, stepId: step.id } })
    }

    const getStep = async (gameId: number) => {
      steps.value = await QuerySteps.$getAll({ gameId })
    }

    const updateStepOrder = async (stepId: number, orderBy: number) => {
      await QuerySteps.$patch(stepId, {
        orderBy
      })
    }

    onMounted(() => {
      getStep(+gameId)
    })

    return {
      updateStepOrder,
      createStep,
      steps
    }
  }
}
</script>

<style scoped>
</style>
