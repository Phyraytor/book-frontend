<template>
  <div class="head">
    <router-link :to="`/games/${gameId}`" class="back game__persons">
      <icon-back />
    </router-link>
    <div class="content flex">
      <input v-if="enemy && isEdit" v-model="enemy.name" type="text" class="input__title">
      <h1 v-if="enemy && !isEdit" class="title">{{ enemy.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateEnemy" />
      <icon-pencil v-else :click="editEnemy" />
    </div>
    <div class="buttons game__persons">
      <icon-remove :click="removeEnemy" />
    </div>
  </div>
  <div class="main">
    <div v-if="enemy" class="game__description">
      <div class="steps__title">
        <span>Способности</span>
        <icon-plus :click="createSpell" />
      </div>
      <ul class="steps">
        <li v-for="spell in enemy.spells" :key="spell.id">
          <router-link :to="`/games/${gameId}/enemies/${id}/spells/${spell.id}`" class="person__link">
            {{ spell.name || 'Имя не задано' }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="content">
      <download-sound v-if="false" />
      <div class="game__description" v-if="enemy">
        <textarea v-if="isEdit" v-model="enemy.description" class="description textarea" />
        <div v-else class="description">
          {{ enemy.description || 'Описание не задано' }}
        </div>
      </div>
      <div v-if="false">
        <input v-model="find" type="text" placeholder="ассет">
      </div>
      <create-asset-from v-if="false" :append="addAssets" />
    </div>
    <div class="game__description">
      <download-image
        v-if="enemy"
        :enemy-id="enemy?.id"
        :image="image"
        :upload="uploadFile"
      />
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import CreateAssetFrom from '@/components/CreateAssetFrom.vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconRemove from '@/components/assets/svg/IconRemove'
import IconPlus from '@/components/assets/svg/IconPlus'
import IconBack from '@/components/assets/svg/IconBack'
import DownloadImage from '@/components/UI/DownloadImage'

const API = 'http://localhost:3030'
export default {
  name: 'EnemyPage',
  components: {
    DownloadImage,
    CreateAssetFrom,
    DownloadSound,
    IconSave,
    IconPencil,
    IconBack,
    IconPlus,
    IconRemove
  },
  setup () {
    const assets = ref([])
    const enemy = ref(null)
    const find = ref('')
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const gameId = route.params.gameId

    const image = computed(() => API + enemy.value.imagePath)
    const addAssets = (asset) => assets.value.push(asset)
    const editEnemy = () => {
      isEdit.value = true
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
          enemyId: id
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const step = await response.json()
      router.push({ name: 'spell-enemy-page', params: { gameId: gameId, enemyId: id, id: step.id } })
    }

    const uploadFile = async (formData) => {
      const response = await fetch(`${API}/enemies/${enemy.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      enemy.value.imagePath = data.path
    }

    const getEnemy = async () => {
      const response = await fetch(`${API}/enemies/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      enemy.value = await response.json()
    }
    const removeEnemy = async () => {
      const response = await fetch(`${API}/enemies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      router.push({ name: 'game-page', params: { id: enemy.value?.game?.id } })
    }
    const updateEnemy = async () => {
      const response = await fetch(`${API}/enemies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: enemy.value.description,
          name: enemy.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getEnemy()
    })
    return {
      id,
      gameId,
      enemy,
      removeEnemy,
      createSpell,
      assets,
      image,
      find,
      addAssets,
      isEdit,
      editEnemy,
      uploadFile,
      updateEnemy
    }
  }
}
</script>
<style>
</style>
