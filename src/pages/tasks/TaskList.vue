<template>
  <div class="head">
    <router-link :to="`/worlds/${worldId}/games/${gameId}`" class="back task__persons">
      <icon-back />
    </router-link>
    <div class="content head__content">
      <h1 class="title">Список Задач</h1>
    </div>
    <div class="buttons task__persons" />
  </div>
  <div class="items">
    <ul class="items-list">
      <li
        v-for="(task, index) in tasks"
        class="items-list__item"
        :key="task.id"
      >
        <router-link class="items-list__link" :to="`/worlds/${worldId}/games/${gameId}/tasks/${task.id}`">
          <span class="task-index">{{ index + 1 }}</span>
          <span class="task-text">{{ task.title }}</span>
          <div class="buttons">
            <icon-mobile v-if="task.isMobile" :click="createTask" />
            <icon-online v-if="task.isOnline" :click="createTask" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import IconOnline from '@/components/assets/svg/IconOnline.vue'
import QueryTasks from '@/queries/task'
import IconMobile from '@/components/assets/svg/IconMobile.vue'
import IconBack from '@/components/assets/svg/IconBack.vue'
import { useRoute } from 'vue-router/dist/vue-router'
import { ITask } from '@/interfaces/task'

export default {
  name: 'TaskList',
  components: { IconOnline, IconMobile, IconBack },
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
<style>
</style>
