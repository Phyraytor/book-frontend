<template>
  <PageLayout>
    <template #header>
      <h1 class="title">Языки</h1>
    </template>
    <template #description>
      <div class="language__list">
        <div class="language__form">
          <input v-model="name" type="text" class="language__input">
          <icon-plus :click="createLanguage" />
        </div>
        <div v-for="language in languages" :key="language.name" class="language__item">
          {{ language.name }}
        </div>
      </div>
    </template>
  </PageLayout>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router/dist/vue-router'
import IconPlus from '@/components/assets/svg/IconPlus'
import PageLayout from '@/layouts/PageLayout'
const API = 'http://localhost:3030'
export default {
  name: 'LanguagePage',
  components: { IconPlus, PageLayout },
  setup () {
    const name = ref('')
    const languages = ref([])
    const route = useRoute()
    const gameId = route.params.gameId
    const worldId = route.params.worldId

    const getLanguage = async () => {
      const response = await fetch(`${API}/languages?gameId=${gameId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      languages.value = await response.json()
    }

    const createLanguage = async () => {
      const response = await fetch(`${API}/languages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: name.value,
          gameId
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const date = await response.json()
      languages.value.push(date)
      name.value = ''
    }

    onMounted(() => {
      getLanguage()
    })

    return {
      createLanguage,
      languages,
      gameId,
      worldId,
      name
    }
  }
}
</script>

<style scoped>
  .language__list {
    white-space: pre-line;
    text-align: left;
    min-height: calc(100vh - 97px);
    font-size: 16px;
    width: 100%;
    resize: none;
    border: none;
    font-family: Georgia, serif;
    margin: 0;
  }
  .language__form {
    display: flex;
    height: 72px;
    width: 100%;
    border-bottom: 1px solid #e7e8ec;
  }

  .language__input {
    height: 72px;
    margin: 0;
    font-size: 18px;
    border: none;
    font-weight: 600;
    font-family: Georgia, serif;
    flex-grow: 1;
    padding: 0 12px;
    background: #303841;
    color: #fff;
  }

  .language__item {
    color: #000;
    text-decoration: none;
    width: calc(100% - 24px);
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #e7e8ec;
    padding: 24px 12px;
    font-size: 18px;
  }
</style>
