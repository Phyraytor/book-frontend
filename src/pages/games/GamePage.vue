<template>
  <div class="head">
    <router-link :to="`/worlds/${worldId}`" class="back game__persons">
      <icon-back />
    </router-link>
    <div class="content flex">
      <input v-if="isEdit" v-model="game.name" type="text" class="input__title">
      <h1 v-else class="title">{{ game.name || 'Имя не задано' }}</h1>
      <div class="buttons">
        <icon-mobile :class-name="game.isMobile ? 'icon__active' : ''" :click="toggleMobile" />
        <icon-online :class-name="game.isOnline ? 'icon__active' : ''" :click="toggleOnline" />
        <router-link :to="`/games/${id}/languages`">
          <icon-language />
        </router-link>
        <icon-save v-if="isEdit" :click="saveGame" />
        <icon-pencil v-else :click="toggleEditGame" />
      </div>
    </div>
    <div class="buttons game__persons">
      <icon-remove :click="removeGame" />
    </div>
  </div>
  <div class="main">
    <div class="game__persons">
      <div class="steps__title">
        <span>Предметы</span>
        <icon-plus :click="createSubject" />
      </div>
      <ul class="steps">
        <li v-for="subject in game.subjects" :key="subject.id">
          <router-link :to="`/games/${id}/subjects/${subject.id}`" class="person__link">
            {{ subject.name || 'Имя не задано' }}
          </router-link>
        </li>
      </ul>
      <div class="steps__title">
        <span>Персонажи</span>
        <icon-plus :click="createPerson" />
      </div>
      <ul class="steps">
        <li v-for="person in game.persons" :key="person.id">
          <router-link :to="`/games/${id}/persons/${person.id}`" class="person__link">
            {{ person.name || 'Имя не задано' }}
          </router-link>
        </li>
      </ul>
      <div class="steps__title">
        <span>Противники</span>
        <icon-plus :click="createEnemy" />
      </div>
      <ul class="enemies">
        <li class="enemies__item" v-for="enemy in game.enemies" :key="enemy.id">
          <router-link :to="`/games/${id}/enemies/${enemy.id}`" class="enemy__link">
            <img class="enemy__image" :src="getImage(enemy.imagePath)" alt="" />
            <span class="enemy__name">{{ enemy.name || 'Имя не задано' }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="game__description">
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
    </div>
    <div class="game__steps">
      <div class="steps__title">
        <span>Этапы</span>
        <icon-plus :click="createStep" />
      </div>
      <ul class="steps">
        <li v-for="step in game.steps" :key="step.id" class="step">
          <span class="step__order">
            <span class="step__orderChange">
              <span class="step__up" @click="decStep(step)">▲</span>
              <span class="step__down" @click="incStep(step)">▼</span>
            </span>
          </span>
          <div class="step__content">
            <router-link :to="`/games/${id}/steps/${step.id}`" class="step__link">
              {{ step.name || 'Имя не задано' }}
            </router-link>
            <span class="order__value">
              {{ step.orderBy }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import IconPlus from '@/components/assets/svg/IconPlus'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconOnline from '@/components/assets/svg/IconOnline'
import IconSave from '@/components/assets/svg/IconSave'
import IconMobile from '@/components/assets/svg/IconMobile'
import IconBack from '@/components/assets/svg/IconBack'
import IconRemove from '@/components/assets/svg/IconRemove'
import IconLanguage from '@/components/assets/svg/IconLanguage'

const API = 'http://localhost:3030'
export default {
  name: 'GamePage',
  components: { IconPlus, IconPencil, IconOnline, IconSave, IconMobile, IconBack, IconRemove, IconLanguage },
  setup () {
    const isEdit = ref(false)
    const game = ref({})
    const tab = ref(0)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
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

    const sortSteps = () => {
      if (!game.value?.steps) return
      game.value?.steps.sort((x, y) => x.orderBy - y.orderBy)
    }

    const getImage = (image) => API + image

    const getGame = async () => {
      const id = route.params.id
      const response = await fetch(`${API}/games/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      game.value = await response.json()
      sortSteps()
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

    const createPerson = async () => {
      const response = await fetch(`${API}/persons`, {
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
      const person = await response.json()
      router.push({ name: 'person-page', params: { gameId: id, id: person.id } })
    }

    const createSubject = async () => {
      const response = await fetch(`${API}/subjects`, {
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
      const subject = await response.json()
      router.push({ name: 'subject-page', params: { gameId: id, id: subject.id } })
    }

    const createEnemy = async () => {
      const response = await fetch(`${API}/enemies`, {
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
      const enemy = await response.json()
      router.push({ name: 'enemy-page', params: { id: enemy.id } })
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
      createSubject,
      incStep,
      decStep,
      game,
      getImage,
      removeGame,
      createEnemy,
      createStep,
      createPerson,
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
  }
  .step__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
  }
  .order__value {
    border-left: 1px solid #e7e8ec;
    min-width: 45px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding-right: 4px;
  }
  .step__link {
    display: flex;
    align-items: center;
    transition: 0.3s;
    flex-grow: 1;
    padding-left: 12px;
    height: 100%;
  }
  .person__link {
    display: flex;
    align-items: center;
    transition: 0.3s;
    flex-grow: 1;
    padding: 12px;
    border-bottom: 1px solid #e7e8ec;
  }
  .step__link:hover, .person__link:hover {
    background: #303841;
    color: #fff;
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
  .main {
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
  .game__steps, .game__persons {
    width: calc(calc(100% - 1000px) / 2);
  }
  .steps__title {
    border-bottom: 1px solid #e7e8ec;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    font-size: 18px;
    font-weight: bold;
    gap: 12px;
    padding-left: 12px;
    height: 72px;
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
    color: rgb(38, 64, 89);
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

  .enemies {
    background: #e7e8ec;
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    padding: 1px;
  }

  .enemy__image {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .enemies__item {
    flex: 0 0 calc(50% - 0.5px);
  }

  .enemy__link {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    background: #000;
  }

  .enemy__name {
    background: #303841;
    color: #fff;
    width: 100%;
    text-align: center;
    padding: 4px 0;
  }
</style>
