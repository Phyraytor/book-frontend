<template>
  <div class="head">
    <div class="content head__content">
      <h1 class="title">Список аудио</h1>
      <icon-plus :click="createSound" />
    </div>
  </div>
  <div class="sounds">
    <ul class="sounds-list">
      <li
        v-for="(sound, index) in sounds"
        class="sounds-list__item"
        :key="sound.id"
      >
        <router-link class="sounds-list__link" :to="`/sounds/${sound.id}`">
          <span class="sound-index">{{ index + 1 }}</span>
          <span class="sound-text">{{ sound.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue'
import IconPlus from '@/components/assets/svg/IconPlus'
import { useRouter } from 'vue-router/dist/vue-router'
const API = 'http://localhost:3030'
export default {
  name: 'SoundList',
  components: { IconPlus },
  setup () {
    const router = useRouter()
    const sounds = ref([])
    const ages = computed(() => {
      const result = []
      const last = sounds.value?.[sounds.value.length - 1]?.age
      for (let i = 1; i <= last; i++) {
        result.push(sounds.value.filter(sound => sound.age === i))
      }
      return result
    })
    const getSounds = async () => {
      const response = await fetch(`${API}/sounds`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      sounds.value = await response.json()
    }

    const createSound = async () => {
      const response = await fetch(`${API}/sounds`, {
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
      const sound = await response.json()
      router.push({ name: 'sounds-page', params: { id: sound.id } })
    }

    onMounted(() => {
      getSounds()
    })

    return {
      ages,
      sounds,
      createSound
    }
  }
}
</script>
<style>
  .sound-index {
    padding: 0;
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #e7e8ec;
  }
  .sound-text {
    padding: 0;
    padding-left: 12px;
  }
  .sound {
    background: #fff;
  }

  .sound_mobile {
    background: #a5a27f;
  }

  .sound_online {
    background: #e7e1b1;
  }

  .sound_mobile_online {
    background: #0f637f;
  }
  .age {
    margin: 0;
    font-size: 24px;
    font-weight: 501;
    margin-bottom: 32px;
  }

  .sounds {
    margin: 0 auto;
    width: 1000px;
    border-left: 1px solid #e7e8ec;
    border-right: 1px solid #e7e8ec;
    min-height: calc(100vh - 96px);
  }

  .sounds-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sounds-list__item {
    width: 100%;
    font-size: 24px;
    border-bottom: 1px solid #eaeaef;
  }

  .sounds-list__link {
    color: #000;
    text-decoration: none;
    width: 100%;
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .sounds-list__link img {
    width: 24px;
    margin-left: 8px;
    height: auto;
  }

  .sounds-list__link:hover {
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
