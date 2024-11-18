<template>
  <PageLayout>
    <template #header>
      <input v-if="isEdit" v-model="game.name" type="text" class="input__title">
      <h1 v-else class="title">{{ game.name || 'Имя не задано' }}</h1>
      <div class="buttons">
        <icon-mobile :class-name="game.isMobile ? 'icon__active' : ''" :click="toggleMobile" />
        <icon-online :class-name="game.isOnline ? 'icon__active' : ''" :click="toggleOnline" />
        <router-link :to="`/worlds/${worldId}/games/${id}/languages`">
          <icon-language />
        </router-link>
        <icon-save v-if="isEdit" :click="saveGame" />
        <icon-pencil v-else :click="toggleEditGame" />
      </div>
    </template>
    <template #sidebarLeft>
      <sidebar-block-subjects />
      <sidebar-block-persons />
      <sidebar-block-enemies />
    </template>
    <template #description>
      <div class="tabs">
        <div :class="`tabs__item ${tab === 0 ? 'tabs__itemActive' : ''}`" @click="changeTab(0)">Описание</div>
        <div :class="`tabs__item ${tab === 1 ? 'tabs__itemActive' : ''}`" @click="changeTab(1)">Планы</div>
        <div :class="`tabs__item ${tab === 2 ? 'tabs__itemActive' : ''}`" @click="changeTab(2)">Сюжет</div>
        <div :class="`tabs__item ${tab === 3 ? 'tabs__itemActive' : ''}`" @click="changeTab(3)">Источники</div>
        <div :class="`tabs__item ${tab === 4 ? 'tabs__itemActive' : ''}`" @click="changeTab(4)">Заметки</div>
      </div>
      <template v-if="isEdit">
        <textarea v-show="tab === 0" v-model="game.description" class="description textarea" />
        <textarea v-show="tab === 1" v-model="game.planes" class="description textarea" />
        <textarea v-show="tab === 2" v-model="game.sources" class="description textarea" />
        <textarea v-show="tab === 3" v-model="game.story" class="description textarea" />
        <textarea v-show="tab === 4" v-model="game.notices" class="description textarea" />
      </template>
      <div v-else class="description "> <!-- contenteditable="true" -->
        {{ getDescription }}
      </div>
    </template>
    <template #sidebarRight>
      <sidebar-block-steps />
    </template>
  </PageLayout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconOnline from '@/components/assets/svg/IconOnline'
import IconSave from '@/components/assets/svg/IconSave'
import IconMobile from '@/components/assets/svg/IconMobile'
import IconLanguage from '@/components/assets/svg/IconLanguage'
import PageLayout from '@/layouts/PageLayout'
import SidebarBlockPersons from '@/components/Sidebar/SidebarBlockPersons'
import SidebarBlockSubjects from '@/components/Sidebar/SidebarBlockSubjects'
import SidebarBlockEnemies from '@/components/Sidebar/SidebarBlockEnemies'
import SidebarBlockSteps from '@/components/Sidebar/SidebarBlockSteps'

const API = 'http://localhost:3030'
export default {
  name: 'GamePage',
  components: {
    PageLayout,
    IconPencil,
    IconOnline,
    IconSave,
    IconMobile,
    IconLanguage,
    SidebarBlockSteps,
    SidebarBlockEnemies,
    SidebarBlockPersons,
    SidebarBlockSubjects
  },
  setup () {
    const isEdit = ref(false)
    const game = ref({})
    const tab = ref(0)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.gameId
    const worldId = route.params.worldId
    const toggleEditGame = () => {
      isEdit.value = !isEdit.value
    }

    const getDescription = computed(() => {
      switch (tab.value) {
        case 0:
          return game.value.description
        case 1:
          return game.value.planes
        case 2:
          return game.value.sources
        case 3:
          return game.value.story
        case 4:
          return game.value.notices
        default:
          return game.value.description
      }
    })

    const changeTab = (index) => {
      tab.value = index
    }

    const getGame = async () => {
      const response = await fetch(`${API}/games/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      game.value = await response.json()
    }
    const removeGame = async () => {
      const response = await fetch(`${API}/games/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      router.push({ name: 'home' })
    }

    const createStep = async () => {
      const response = await fetch(`${API}/steps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: '',
          description: '',
          gameId: id
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const step = await response.json()
      router.push({ name: 'step-page', params: { gameId: id, id: step.id } })
    }

    const toggleMobile = async () => {
      const response = await fetch(`${API}/games/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          isMobile: !game.value.isMobile
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
      }
      game.value.isMobile = !game.value.isMobile
    }

    const toggleOnline = async () => {
      const response = await fetch(`${API}/games/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          isOnline: !game.value.isOnline
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
      }
      game.value.isOnline = !game.value.isOnline
    }

    const saveGame = async () => {
      const response = await fetch(`${API}/games/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: game.value.name,
          description: game.value.description,
          planes: game.value.planes,
          sources: game.value.sources,
          story: game.value.story,
          notices: game.value.notices,
          orderBy: game.value.orderBy,
          age: game.value.age,
          isMobile: game.value.isMobile,
          isOnline: game.value.isOnline
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
      }
      toggleEditGame()
    }
    onMounted(() => {
      getGame()
    })
    return {
      id,
      worldId,
      game,
      removeGame,
      createStep,
      isEdit,
      toggleEditGame,
      saveGame,
      toggleMobile,
      tab,
      changeTab,
      getDescription,
      toggleOnline
    }
  }
}
</script>
<style>
  .input__title {
    margin: 0;
    font-size: 18px;
    border: none;
    font-weight: 600;
    font-family: Georgia, serif;
    flex-grow: 1;
    height: 100%;
    padding: 0 12px;
    background: #303841;
    color: #fff;
  }
  html {
    font-family: Georgia, serif;
  }
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .step {
    display: flex;
    border-bottom: 1px solid #e7e8ec;
  }

  .main {
    width: 100%;
    display: flex;
    align-items: stretch;
  }
  .game__steps, .game__persons {
    width: calc(calc(100% - 1000px) / 2);
  }
  .content {
    min-width: 1000px;
    max-width: 1000px;
    margin: 0 auto;
  }
  .head__content {
    display: flex;
    gap: 16px;
    margin: 0 auto;
  }
  .head {
    height: 72px;
    border-bottom: 1px solid #e7e8ec;
    display: flex;
    justify-content: space-between;
  }
  .description {
    white-space: pre-line;
    text-align: left;
    min-height: calc(100vh - 141px);
    font-size: 16px;
    width: calc(100% - 24px);
    padding: 12px;
    resize: none;
    border: none;
    font-family: Georgia, serif;
    margin: 0;
  }

  .game__description {
    width: 1000px;
    border-left: 1px solid #e7e8ec;
    border-right: 1px solid #e7e8ec;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .textarea {
    background: #303841;
    color: #fff;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    padding: 0 12px;
    flex-grow: 1;
    align-self: center;
  }
  .back {
    text-decoration: none;
    color: #111;
  }

  .icon__active path {
    fill: #3eaf7c;
    stroke: #3eaf7c;
  }

  .icon__active rect {
    stroke: #3eaf7c;
  }

  .buttons {
    display: flex;
    cursor: pointer;
    justify-content: flex-end;
  }

  .tabs {
    border-bottom: 1px solid #e7e8ec;
    display: flex;
    text-align: center;
    width: 100%;
  }

  .tabs__item {
    flex: 0 0 calc(calc(100% / 5) - 1px);
    border-right: 1px solid #e7e8ec;
    padding: 12px 0;
    cursor: pointer;
    transition: 0.3s;
  }

  .tabs__item:hover {
    background: #303841;
    color: #fff;
  }

  .tabs__itemActive {
    background: #303841;
    color: #fff;
  }

  .tabs__item:last-of-type {
    border-right: none;
  }
</style>
