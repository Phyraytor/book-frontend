<template>
  <PageLayout>
    <template v-if="task" #header>
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
    <template v-if="task" #description>
      <textarea v-if="isEdit" v-model="task.description" class="description textarea" />
      <div v-else class="description">
        {{ task.description || 'Описание не задано' }}
      </div>
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import IconParticleSystem from '@/components/assets/svg/IconParticleSystem.vue'
import IconAnimation from '@/components/assets/svg/IconAnimation.vue'
import IconBack from '@/components/assets/svg/IconBack.vue'
import QueryTasks from '@/queries/task'
import { ITask } from '@/interfaces/task'

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
    const task = ref<ITask | null>(null)
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const taskId = route.params.taskId
    const gameId = route.params.gameId
    const worldId = route.params.worldId
    const editTask = () => {
      isEdit.value = true
    }
    const getTask = async () => {
      task.value = await QueryTasks.$get(+taskId)
    }
    const removeTask = async () => {
      task.value = await QueryTasks.$delete(+taskId)
      router.push({ name: 'task-list', params: { worldId, gameId } })
    }
    const updateTask = async () => {
      if (!task.value) return null
      await QueryTasks.$patch(+taskId, {
        title: task.value.title,
        description: task.value.description
      })
      isEdit.value = false
    }

    onMounted(() => {
      getTask()
    })
    return {
      task,
      removeTask,
      isEdit,
      editTask,
      updateTask
    }
  }
}
</script>
<style scoped>
</style>
