<template>
  <div class="head">
    <router-link :to="`/games/${gameId}`" class="back game__subjects">
      <icon-back />
    </router-link>
    <div class="content flex">
      <input v-if="isEdit" v-model="subject.name" type="text" class="input__title">
      <h1 v-else class="title">{{ subject.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateSubject" />
      <icon-pencil v-else :click="editSubject" />
    </div>
    <div class="buttons game__subjects">
      <icon-remove :click="removeSubject" />
    </div>
  </div>
  <div class="main">
    <div class="game__description" />
    <div class="content">
      <download-sound v-if="false" />
      <textarea v-if="isEdit" v-model="subject.description" class="description textarea" />
      <div v-else class="description">
        {{ subject.description || 'Описание не задано' }}
      </div>
    </div>
    <div class="game__description">
      <download-sound v-if="subject" :audio="audio" :upload="uploadFile" />
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
  name: 'SubjectPage',
  components: {
    DownloadSound,
    IconBack,
    IconSave,
    IconPencil,
    IconRemove
  },
  setup () {
    const assets = ref([])
    const subject = ref({})
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
    const gameId = route.params.gameId
    const audio = computed(() => subject.value?.sound?.path && (API + subject.value?.sound?.path))
    const addAssets = (asset) => assets.value.push(asset)
    const editSubject = () => {
      isEdit.value = true
    }
    const uploadFile = async (formData) => {
      if (!subject.value) return
      const response = await fetch(`${API}/subjects/${subject.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      subject.value.sound = await response.json()
    }
    const getSubject = async () => {
      const response = await fetch(`${API}/subjects/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      subject.value = await response.json()
    }
    const removeSubject = async () => {
      const response = await fetch(`${API}/subjects/${id}`, {
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
    const updateSubject = async () => {
      const response = await fetch(`${API}/subjects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: subject.value.description,
          name: subject.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getSubject()
    })
    return {
      audio,
      uploadFile,
      subject,
      gameId,
      removeSubject,
      assets,
      addAssets,
      isEdit,
      editSubject,
      updateSubject
    }
  }
}
</script>
<style>
</style>
