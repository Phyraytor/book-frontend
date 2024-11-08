<template>
  <div v-if="step" class="head">
    <router-link :to="`/games/${step?.game?.id}`" class="back game__persons">
      <icon-back />
    </router-link>
    <div class="content flex">
      <input v-if="isEdit" v-model="step.name" type="text" class="input__title">
      <h1 v-else class="title">{{ step.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="update" />
      <icon-pencil v-else :click="edit" />
    </div>
    <div class="buttons game__persons">
      <icon-remove :click="remove" />
    </div>
  </div>
  <div class="main">
    <div class="game__description">
      <div class="steps__title">
        <span>Записки</span>
        <icon-plus :click="createMessage" />
      </div>
      <ul class="steps">
        <li v-for="message in step.messages" :key="message.id">
          <router-link :to="`/games/${gameId}/steps/${step.id}/messages/${message.id}`" class="person__link">
            {{ message.name || 'Имя не задано' }}
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="step" class="content">
      <div class="game__description">
        <textarea v-if="isEdit" v-model="step.description" class="description textarea" />
        <div v-else class="description">
          {{ step.description }}
        </div>
      </div>
    </div>
    <div class="game__description">
      <download-image
        v-if="step"
        :enemy-id="step?.id"
        :image="image"
        :upload="uploadFile"
      />
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import IconBack from '@/components/assets/svg/IconBack'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconRemove from '@/components/assets/svg/IconRemove'
import DownloadImage from '@/components/UI/DownloadImage'
import IconPlus from '@/components/assets/svg/IconPlus'

const API = 'http://localhost:3030'
export default {
  name: 'StepPage',
  components: {
    DownloadImage,
    IconBack,
    IconSave,
    IconPencil,
    IconPlus,
    IconRemove
  },
  setup () {
    const assets = ref([])
    const step = ref({})
    const find = ref('')
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const gameId = route.params.gameId
    const image = computed(() => API + step.value.imagePath)
    const addAssets = (asset) => assets.value.push(asset)
    const edit = () => {
      isEdit.value = true
    }

    const uploadFile = async (formData) => {
      const response = await fetch(`${API}/steps/${step.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      step.value.imagePath = data.path
    }

    const getStep = async () => {
      const response = await fetch(`${API}/steps/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      step.value = await response.json()
    }
    const remove = async () => {
      const response = await fetch(`${API}/steps/${id}`, {
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
    const update = async () => {
      const response = await fetch(`${API}/steps/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: step.value.name,
          description: step.value.description
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    const createMessage = async () => {
      const response = await fetch(`${API}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: '',
          stepId: id
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const message = await response.json()
      router.push({ name: 'message-page', params: { gameId, stepId: id, id: message.id } })
    }
    onMounted(() => {
      getStep()
    })
    return {
      createMessage,
      image,
      step,
      gameId,
      remove,
      assets,
      find,
      addAssets,
      uploadFile,
      isEdit,
      edit,
      update
    }
  }
}
</script>
<style>
  .actions {
    display: flex;
    gap: 16px;
  }
</style>
