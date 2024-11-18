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

<script>
import SidebarBlock from '@/components/Sidebar/SidebarBlock'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { onMounted, ref } from 'vue'
const API = 'http://localhost:3030'

export default {
  name: 'SidebarBlockSteps',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const steps = ref([])
    const gameId = route.params.gameId
    const createStep = async () => {
      const response = await fetch(`${API}/steps`, {
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
      const step = await response.json()
      router.push({ name: 'step-page', params: { gameId, id: step.id } })
    }

    const sortSteps = () => {
      if (steps.value) return
      steps.value.sort((x, y) => x.orderBy - y.orderBy)
    }

    const getStep = async (gameId) => {
      const response = await fetch(`${API}/steps?gameId=${gameId}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      steps.value = await response.json()
      sortSteps()
    }

    const updateStepOrder = async (stepId, orderBy) => {
      const response = await fetch(`${API}/steps/${stepId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          orderBy
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
      }
    }

    const incStep = (step) => {
      updateStepOrder(step.id, step.orderBy + 1)
      step.orderBy++
      sortSteps()
    }

    const decStep = (step) => {
      updateStepOrder(step.id, step.orderBy - 1)
      step.orderBy--
      sortSteps()
    }

    onMounted(() => {
      getStep(gameId)
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
