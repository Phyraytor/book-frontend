<template>
  <div class="head">
    <router-link :to="`/games/${gameId}`" class="back game__persons">
      <icon-back />
    </router-link>
    <div class="content flex">
      <input v-if="isEdit" v-model="person.name" type="text" class="input__title">
      <h1 v-else class="title">{{ person.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updatePerson" />
      <icon-pencil v-else :click="editPerson" />
    </div>
    <div class="buttons game__persons">
      <icon-remove :click="removePerson" />
    </div>
  </div>
  <div class="main">
    <div class="game__persons">
      <div class="steps__title">
        <span>Способности</span>
        <icon-plus :click="createSpell" />
      </div>
      <ul class="steps">
        <li v-for="spell in person.spells" :key="spell.id">
          <router-link :to="`/games/${gameId}/persons/${id}/spells/${spell.id}`" class="person__link">
            {{ spell.name || 'Имя не задано' }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <download-sound v-if="false" />
      <textarea v-if="isEdit" v-model="person.description" class="description textarea" />
      <div v-else class="description">
        {{ person.description || 'Описание не задано' }}
      </div>
      <div v-if="false">
        <input v-model="find" type="text" placeholder="ассет">
      </div>
      <create-asset-from v-if="false" :append="addAssets" />
    </div>
    <div class="game__persons" />
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import CreateAssetFrom from '@/components/CreateAssetFrom.vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconBack from '@/components/assets/svg/IconBack'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconRemove from '@/components/assets/svg/IconRemove'
import IconPlus from '@/components/assets/svg/IconPlus'
const API = 'http://localhost:3030'
export default {
  name: 'PersonPage',
  components: {
    CreateAssetFrom,
    DownloadSound,
    IconBack,
    IconSave,
    IconPencil,
    IconRemove,
    IconPlus
  },
  setup () {
    const assets = ref([])
    const person = ref({})
    const find = ref('')
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const gameId = route.params.gameId
    const addAssets = (asset) => assets.value.push(asset)
    const editPerson = () => {
      isEdit.value = true
    }
    const getPerson = async () => {
      const response = await fetch(`${API}/persons/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      person.value = await response.json()
    }
    const removePerson = async () => {
      const response = await fetch(`${API}/persons/${id}`, {
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
    const updatePerson = async () => {
      const response = await fetch(`${API}/persons/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: person.value.description,
          name: person.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    const createSpell = async () => {
      const response = await fetch(`${API}/spells`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: '',
          description: '',
          personId: id
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const step = await response.json()
      router.push({ name: 'spell-page', params: { gameId: gameId, personId: id, id: step.id } })
    }

    onMounted(() => {
      getPerson()
    })
    return {
      id,
      createSpell,
      gameId,
      person,
      removePerson,
      assets,
      find,
      addAssets,
      isEdit,
      editPerson,
      updatePerson
    }
  }
}
</script>
<style>
</style>
