<template>
  <div class="head">
    <router-link :to="`/`" class="back game__persons">
      <icon-back />
    </router-link>
    <div class="content head__content">
      <h1 class="title">Список игр</h1>
      <icon-plus :click="createGame" />
    </div>
    <div class="buttons game__persons" />
  </div>
  <div class="games">
    <ul class="games-list">
      <li
        v-for="(game, index) in games"
        class="games-list__item"
        :key="game.id"
      >
        <router-link class="games-list__link" :to="`/games/${game.id}`">
          <span class="game-index">{{ index + 1 }}</span>
          <span class="game-text">{{ game.name }}</span>
          <div class="buttons">
            <icon-mobile v-if="game.isMobile" :click="createGame" />
            <icon-online v-if="game.isOnline" :click="createGame" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import IconPlus from '@/components/assets/svg/IconPlus'
import IconOnline from '@/components/assets/svg/IconOnline'
import IconMobile from '@/components/assets/svg/IconMobile'
import IconBack from '@/components/assets/svg/IconBack'
import { useRouter } from 'vue-router/dist/vue-router'
const API = 'http://localhost:3030'
export default {
  name: 'GameList',
  components: { IconPlus, IconOnline, IconMobile, IconBack },
  setup () {
    const router = useRouter()
    const games = ref([])
    const ages = computed(() => {
      const result = []
      const last = games.value?.[games.value.length - 1]?.age
      for (let i = 1; i <= last; i++) {
        result.push(games.value.filter(game => game.age === i))
      }
      return result
    })
    const getGames = async () => {
      const response = await fetch(`${API}/games`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      games.value = await response.json()
    }

    const createGame = async () => {
      const response = await fetch(`${API}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          planes: '',
          sources: '',
          notices: '',
          story: '',
          name: '',
          description: ''
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const game = await response.json()
      router.push({ name: 'games-page', params: { id: game.id } })
    }

    onMounted(() => {
      getGames()
    })

    return {
      ages,
      games,
      createGame
    }
  }
}
</script>
<style>
  .game-index {
    padding: 0;
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e7e8ec;
  }
  .game-text {
    padding: 0;
    padding-left: 12px;
  }
  .game {
    background: #fff;
  }

  .game_mobile {
    background: #a5a27f;
  }

  .game_online {
    background: #e7e1b1;
  }

  .game_mobile_online {
    background: #0f637f;
  }
  .age {
    margin: 0;
    font-size: 24px;
    font-weight: 501;
    margin-bottom: 32px;
  }

  .games {
    margin: 0 auto;
    width: 1000px;
    border-left: 1px solid #e7e8ec;
    border-right: 1px solid #e7e8ec;
    min-height: calc(100vh - 96px);
  }

  .games-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .games-list__item {
    width: 100%;
    font-size: 24px;
    border-bottom: 1px solid #eaeaef;
  }

  .games-list__link {
    color: #000;
    text-decoration: none;
    width: 100%;
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .games-list__link img {
    width: 24px;
    margin-left: 8px;
    height: auto;
  }

  .games-list__link:hover {
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
