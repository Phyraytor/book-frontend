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
  <div class="tasks">
    <ul class="tasks-list">
      <li
        v-for="(task, index) in tasks"
        class="tasks-list__item"
        :key="task.id"
      >
        <router-link class="tasks-list__link" :to="`/worlds/${worldId}/games/${gameId}/tasks/${task.id}`">
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
<script>
import { ref, onMounted, computed } from 'vue'
import IconOnline from '@/components/assets/svg/IconOnline'
import IconMobile from '@/components/assets/svg/IconMobile'
import IconBack from '@/components/assets/svg/IconBack'
import { useRoute } from 'vue-router/dist/vue-router'
const API = 'http://localhost:3030'
export default {
  name: 'TaskList',
  components: { IconOnline, IconMobile, IconBack },
  setup () {
    const route = useRoute()
    const tasks = ref([])
    const gameId = route.params.gameId
    const worldId = route.params.worldId
    const ages = computed(() => {
      const result = []
      const last = tasks.value?.[tasks.value.length - 1]?.age
      for (let i = 1; i <= last; i++) {
        result.push(tasks.value.filter(task => task.age === i))
      }
      return result
    })
    const getTasks = async () => {
      const response = await fetch(`${API}/tasks`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      tasks.value = await response.json()
    }

    onMounted(() => {
      getTasks()
    })

    return {
      ages,
      tasks,
      gameId,
      worldId
    }
  }
}
</script>
<style>
  .task-index {
    padding: 0;
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e7e8ec;
  }
  .task-text {
    padding: 0;
    padding-left: 12px;
  }
  .task {
    background: #fff;
  }

  .task_mobile {
    background: #a5a27f;
  }

  .task_online {
    background: #e7e1b1;
  }

  .task_mobile_online {
    background: #0f637f;
  }
  .age {
    margin: 0;
    font-size: 24px;
    font-weight: 501;
    margin-bottom: 32px;
  }

  .tasks {
    margin: 0 auto;
    width: 1000px;
    border-left: 1px solid #e7e8ec;
    border-right: 1px solid #e7e8ec;
    min-height: calc(100vh - 96px);
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tasks-list__item {
    width: 100%;
    font-size: 24px;
    border-bottom: 1px solid #eaeaef;
  }

  .tasks-list__link {
    color: #000;
    text-decoration: none;
    width: 100%;
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .tasks-list__link img {
    width: 24px;
    margin-left: 8px;
    height: auto;
  }

  .tasks-list__link:hover {
    background: #303841;
    color: #fff;
  }

  .block {
    background: #fff;
    padding: 24px;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(175,183,202,.28);
    margin-bottom: 24px;
  }
</style>
