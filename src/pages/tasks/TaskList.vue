<template>
  <PageLayout>
    <template #header>
      <h1 class="title">Список Задач</h1>
    </template>
    <template #description>
      <numbered-list
        :items="tasks"
        :getLink="(taskId) => `/worlds/${worldId}/games/${gameId}/tasks/${taskId}`"
        fieldName="name"
      />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import QueryTasks from '@/queries/task'
import PageLayout from '@/layouts/PageLayout.vue'
import NumberedList from '@/components/UI/NumberedList.vue'
import { useRoute } from 'vue-router/dist/vue-router'
import { ITask } from '@/interfaces/task'

export default {
  name: 'TaskList',
  components: { PageLayout, NumberedList },
  setup () {
    const route = useRoute()
    const tasks = ref<ITask[]>([])
    const gameId = route.params.gameId
    const worldId = route.params.worldId

    const getTasks = async () => {
      tasks.value = await QueryTasks.$getAll()
    }

    onMounted(() => {
      getTasks()
    })

    return {
      tasks,
      gameId,
      worldId
    }
  }
}
</script>
<style lang="scss">
</style>
