<template>
  <PageLayout>
    <template #header>
      <input v-if="isEdit" v-model="step.name" type="text" class="input__title">
      <h1 v-else class="title">{{ step.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="update" />
      <icon-pencil v-else :click="edit" />
    </template>
    <template #sidebarLeft>
      <sidebar-block-messages :items="step.messages"/>
    </template>
    <template #description>
      <textarea v-if="isEdit" v-model="step.description" class="description textarea" />
      <div v-else class="description">
        {{ step.description }}
      </div>
    </template>
    <template #sidebarRight>
      <download-image
        v-if="step"
        :image="image"
        :upload="uploadFile"
      />
      <ul class="step-sounds">
        <li
          v-for="sound in step.sounds"
          :key="sound.id"
          class="step-sounds__item"
        >
          <audio controls>
            <source :src="getSound(sound.path)" type="audio/mpeg">
            <p>Браузер не поддерживает аудио</p>
          </audio>
          <router-link :to="`/sounds/${sound.id}`" class="sidebar__link">
            {{ sound.name || 'Имя не задано' }}
          </router-link>
        </li>
      </ul>
      <download-sound
        v-if="step"
        :upload="uploadSoundFile"
      />
    </template>
  </PageLayout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import DownloadImage from '@/components/UI/DownloadImage'
import DownloadSound from '@/components/UI/DownloadSound'
import PageLayout from '@/layouts/PageLayout'
import SidebarBlockMessages from '@/components/Sidebar/SidebarBlockMessages'

const API = 'http://localhost:3030'
export default {
  name: 'StepPage',
  components: {
    SidebarBlockMessages,
    DownloadSound,
    DownloadImage,
    IconSave,
    IconPencil,
    PageLayout
  },
  setup () {
    const assets = ref([])
    const step = ref({})
    const find = ref('')
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.stepId
    const worldId = route.params.worldId
    const gameId = route.params.gameId
    const image = computed(() => API + step.value.imagePath)
    const addAssets = (asset) => assets.value.push(asset)
    const edit = () => {
      isEdit.value = true
    }

    const getSound = (sound) => sound ? API + sound : ''

    const uploadFile = async (formData) => {
      const response = await fetch(`${API}/steps/${step.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      step.value.imagePath = data.path
    }

    const uploadSoundFile = async (formData) => {
      const response = await fetch(`${API}/steps/${step.value.id}/upload-sound`, {
        method: 'POST',
        body: formData
      })
      const sound = await response.json()
      step.value.sounds.push(sound)
      console.log(step.value.sounds)
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
    onMounted(() => {
      getStep()
    })
    return {
      getSound,
      uploadSoundFile,
      image,
      worldId,
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

  .step-sounds__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .step-sounds__item a {
    flex-grow: 1;
    height: 40px;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    padding-right: 16px;
  }

  .step-sounds__item a:hover {
    background: #303841;
    color: #fff;
  }
</style>
