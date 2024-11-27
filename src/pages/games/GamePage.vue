<template>
  <PageLayout>
    <template v-if="game" #header>
      <input v-if="isEdit" v-model="game.name" type="text" class="input__title">
      <h1 v-else class="title">{{ game.name || 'Имя не задано' }}</h1>
      <div class="buttons">
        <icon-mobile :class-name="game.isMobile ? 'icon__active' : ''" :click="toggleMobile" />
        <icon-online :class-name="game.isOnline ? 'icon__active' : ''" :click="toggleOnline" />
        <router-link :to="`/worlds/${worldId}/games/${gameId}/languages`">
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
      <template v-if="game">
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
    </template>
    <template #sidebarRight>
      <sidebar-block-steps />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { IGame } from '@/interfaces/games'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import IconOnline from '@/components/assets/svg/IconOnline.vue'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconMobile from '@/components/assets/svg/IconMobile.vue'
import IconLanguage from '@/components/assets/svg/IconLanguage.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import SidebarBlockPersons from '@/components/Sidebar/SidebarBlockPersons.vue'
import SidebarBlockSubjects from '@/components/Sidebar/SidebarBlockSubjects.vue'
import SidebarBlockEnemies from '@/components/Sidebar/SidebarBlockEnemies.vue'
import SidebarBlockSteps from '@/components/Sidebar/SidebarBlockSteps.vue'
import QueryGames from '@/queries/game'

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
    const game = ref<IGame | null>(null)
    const tab = ref(0)
    const router = useRouter()
    const route = useRoute()
    const gameId = route.params.gameId
    const worldId = route.params.worldId
    const toggleEditGame = () => {
      isEdit.value = !isEdit.value
    }

    const getDescription = computed(() => {
      if (!game.value) return ''
      switch (tab.value) {
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

    const changeTab = (index: number) => {
      tab.value = index
    }

    const getGame = async () => {
      game.value = await QueryGames.$get(+gameId)
    }
    const removeGame = async () => {
      QueryGames.$delete(+gameId)
      router.push({ name: 'world-page', params: { worldId } })
    }

    const toggleMobile = async () => {
      if (!game.value) return null
      QueryGames.$patch(+gameId, {
        isMobile: !game.value.isMobile
      })
      game.value.isMobile = !game.value.isMobile
    }

    const toggleOnline = async () => {
      if (!game.value) return null
      QueryGames.$patch(+gameId, {
        isOnline: !game.value.isOnline
      })
      game.value.isOnline = !game.value.isOnline
    }

    const saveGame = async () => {
      if (!game.value) return null
      QueryGames.$patch(+gameId, {
        name: game.value.name,
        description: game.value.description,
        planes: game.value.planes,
        sources: game.value.sources,
        story: game.value.story,
        notices: game.value.notices,
        orderBy: game.value.orderBy,
        isMobile: game.value.isMobile,
        isOnline: game.value.isOnline,
        age: game.value.age
      })
      toggleEditGame()
    }
    onMounted(() => {
      getGame()
    })
    return {
      gameId,
      worldId,
      tab,
      game,
      isEdit,
      getDescription,
      saveGame,
      changeTab,
      removeGame,
      toggleMobile,
      toggleOnline,
      toggleEditGame
    }
  }
}
</script>
<style scoped>
  .icon__active path {
    fill: #3eaf7c;
    stroke: #3eaf7c;
  }

  .icon__active rect {
    stroke: #3eaf7c;
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
