<template>
  <div class="head">
    <div class="back game__spells" @click="navigateBackPage">
      <icon-back />
    </div>
    <div class="content flex">
      <input v-if="isEdit" v-model="spell.name" type="text" class="input__title">
      <h1 v-else class="title">{{ spell.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateSpell" />
      <icon-pencil v-else :click="editSpell" />
    </div>
    <div class="buttons game__spells">
      <icon-remove :click="removeSpell" />
    </div>
  </div>
  <div class="main">
    <div class="game__description" />
    <div class="content">
      <textarea v-if="isEdit" v-model="spell.description" class="description textarea" />
      <div v-else class="description">
        {{ spell.description || 'Описание не задано' }}
      </div>
    </div>
    <div class="game__description">
      <download-sound v-if="spell" :audio="audio" :upload="uploadFile" />
    </div>
  </div>

</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconBack from '@/components/assets/svg/IconBack'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconRemove from '@/components/assets/svg/IconRemove'

const API = 'http://localhost:3030'
export default {
  name: 'SpellPage',
  components: {
    DownloadSound,
    IconBack,
    IconSave,
    IconPencil,
    IconRemove
  },
  setup () {
    const assets = ref([])
    const spell = ref({})
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const gameId = route.params.gameId
    const personId = route.params.personId
    const enemyId = route.params.enemyId

    const audio = computed(() => spell.value?.sound?.path && (API + spell.value?.sound?.path))

    const navigateBackPage = () => {
      if (personId) {
        router.push({ name: 'person-page', params: { gameId, id: personId } })
      }
      if (enemyId) {
        router.push({ name: 'enemy-page', params: { gameId, id: enemyId } })
      }
    }

    const addAssets = (asset) => assets.value.push(asset)
    const editSpell = () => {
      isEdit.value = true
    }

    const uploadFile = async (formData) => {
      if (!spell.value) return
      const response = await fetch(`${API}/spells/${spell.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      spell.value.sound = await response.json()
    }

    const getSpell = async () => {
      const response = await fetch(`${API}/spells/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      spell.value = await response.json()
    }
    const removeSpell = async () => {
      const response = await fetch(`${API}/spells/${id}`, {
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
    const updateSpell = async () => {
      const response = await fetch(`${API}/spells/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: spell.value.description,
          name: spell.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getSpell()
    })
    return {
      navigateBackPage,
      spell,
      gameId,
      personId,
      removeSpell,
      assets,
      addAssets,
      isEdit,
      audio,
      uploadFile,
      editSpell,
      updateSpell
    }
  }
}
</script>
<style>
</style>
