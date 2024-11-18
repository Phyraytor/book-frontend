<template>
  <PageLayout>
    <template #header>
      <input v-if="isEdit" v-model="task.title" type="text" class="input__title">
      <h1 v-else class="title">{{ task.title || 'Имя не задано' }}</h1>
      <router-link :to="task.parentLink" class="back">
        <icon-back />
      </router-link>
      <icon-animation v-if="task.type === 'ANIMATION'" />
      <icon-particle-system v-if="task.type === 'PARTICLE_SYSTEM'" />
      <icon-save v-if="isEdit" :click="updateTask" />
      <icon-pencil v-else :click="editTask" />
      <!-- Todo: select для выбора приоритета и статуса задачи -->
    </template>
    <template #description>
      <textarea v-if="isEdit" v-model="task.description" class="description textarea" />
      <div v-else class="description">
        {{ task.description || 'Описание не задано' }}
      </div>
    </template>
  </PageLayout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import PageLayout from '@/layouts/PageLayout'
import IconParticleSystem from '@/components/assets/svg/IconParticleSystem'
import IconAnimation from '@/components/assets/svg/IconAnimation'
import IconBack from '@/components/assets/svg/IconBack'
const API = 'http://localhost:3030'
export default {
  name: 'TaskPage',
  components: {
    PageLayout,
    IconSave,
    IconBack,
    IconPencil,
    IconParticleSystem,
    IconAnimation
  },
  setup () {
    const task = ref({})
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.taskId
    const gameId = route.params.gameId
    const worldId = route.params.worldId
    const editTask = () => {
      isEdit.value = true
    }
    const getTask = async () => {
      const response = await fetch(`${API}/tasks/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      task.value = await response.json()
    }
    const removeTask = async () => {
      const response = await fetch(`${API}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      router.push({ name: 'tasks-list', params: { worldId, gameId } })
    }
    const updateTask = async () => {
      const response = await fetch(`${API}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: task.value.description,
          title: task.value.title
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getTask()
    })
    return {
      id,
      gameId,
      worldId,
      task,
      removeTask,
      isEdit,
      editTask,
      updateTask
    }
  }
}
</script>
<style>
.game__tasks {
  display: flex;
}
</style>
