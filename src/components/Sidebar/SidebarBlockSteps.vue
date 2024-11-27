<template>
  <sidebar-block
    title="Этапы"
    type="steps"
    :create="createStep"
    :items="steps"
  >
<!--  Todo: Перенести в sidebar-block  -->
    <template #before>
      <span class="step__order">
        <span class="step__orderChange">
          <span class="step__up" @click="decStep(step)">▲</span>
          <span class="step__down" @click="incStep(step)">▼</span>
        </span>
      </span>
    </template>
    <template #after>
      <span class="order__value">
<!--        {{ step.orderBy }}-->
      </span>
    </template>
  </sidebar-block>
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

    const sortSteps = () => {
      if (!steps.value) return
      steps.value.sort((x, y) => x.orderBy - y.orderBy)
    }

    const getStep = async (gameId: number) => {
      steps.value = await QuerySteps.$getAll({ gameId })
      sortSteps()
    }

    const updateStepOrder = async (stepId: number, orderBy: number) => {
      await QuerySteps.$patch(stepId, {
        orderBy
      })
    }

    const incStep = (step: IStep) => {
      updateStepOrder(step.id, step.orderBy + 1)
      step.orderBy++
      sortSteps()
    }

    const decStep = (step: IStep) => {
      updateStepOrder(step.id, step.orderBy - 1)
      step.orderBy--
      sortSteps()
    }

    onMounted(() => {
      getStep(+gameId)
    })

    return {
      incStep,
      decStep,
      createStep,
      steps
    }
  }
}
</script>

<style scoped>
  .step__order {
    border-right: 1px solid #e7e8ec;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .step__orderChange {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid #e7e8ec;
  }
  .step__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }
  .step__up {
    padding: 4px 8px 2px;
    cursor: pointer;
  }
  .step__up:hover, .step__down:hover {
    background: #303841;
    color: #fff;
  }
  .step__down {
    padding: 2px 8px 4px;
    cursor: pointer;
  }
  .order__value {
    border-left: 1px solid #e7e8ec;
    border-bottom: 1px solid #e7e8ec;
    min-width: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 4px;
  }
</style>
