<template>
  <PageLayout>
    <template #header>
      <input v-if="message && isEdit" v-model="message.name" type="text" class="input__title">
      <h1 v-if="message && !isEdit" class="title">{{ message.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateMessage" />
      <icon-pencil v-else :click="editMessage" />
    </template>
    <template #sidebarLeft>
      <div class="steps__title">
        <span>Переводы</span>
      </div>
      <ul class="language">
        <li
          v-for="(language, index) in languages"
          :key="language.id"
          :class="`language__item ${index === indexActiveLanguage ? 'language__itemActive' : ''}`"
          @click="setActiveLanguage(index)"
        >
          {{ language.name }}
        </li>
      </ul>
    </template>
    <template #description>
      <textarea
        v-if="isEdit"
        v-model="description"
        class="description textarea"
      />
      <div v-else class="description">
        {{ description }}
      </div>
    </template>
    <template #sidebarRight>
      <download-sound v-if="note" :audio="audio" :upload="uploadFile" />
    </template>
  </PageLayout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import PageLayout from '@/layouts/PageLayout'

const API = 'http://localhost:3030'
export default {
  name: 'MessagePage',
  components: {
    DownloadSound,
    IconSave,
    IconPencil,
    PageLayout
  },
  setup () {
    const languages = ref([])
    const assets = ref([])
    const message = ref(null)
    const find = ref('')
    const description = ref('')
    const isEdit = ref(false)
    const indexActiveLanguage = ref(0)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.messageId
    const gameId = route.params.gameId
    const stepId = route.params.stepId
    const worldId = route.params.worldId

    const languageId = computed(() => languages.value?.[indexActiveLanguage.value]?.id)
    const note = computed(() => message.value?.notes?.find(note => note.language.id === languageId.value))
    const audio = computed(() => note.value?.sound?.path && (API + note.value?.sound?.path))
    const addAssets = (asset) => assets.value.push(asset)
    const setActiveLanguage = (index) => {
      indexActiveLanguage.value = index
      description.value = note.value?.content || ''
    }

    const getLanguage = async () => {
      const response = await fetch(`${API}/languages/${gameId}`, {
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

    const editMessage = () => {
      isEdit.value = true
    }

    const uploadFile = async (formData) => {
      if (!note.value) return
      const response = await fetch(`${API}/notes/${note.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      note.value.sound = await response.json()
    }

    const getMessage = async () => {
      const response = await fetch(`${API}/messages/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      message.value = await response.json()
    }
    const removeMessage = async () => {
      const response = await fetch(`${API}/messages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      router.push({ name: 'game-page', params: { id: gameId } })
    }

    const updateMessageName = async () => {
      const response = await fetch(`${API}/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: message.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    const createNote = async () => {
      const response = await fetch(`${API}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          content: description.value,
          messageId: message.value.id,
          languageId: languageId.value
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      message.value.notes.push(await response.json())
    }

    const updateNote = async (noteId) => {
      const response = await fetch(`${API}/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          content: description.value
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      note.value.content = description.value
    }

    const changeNote = () => {
      if (note.value) {
        updateNote(note.value.id)
      } else {
        createNote()
      }
    }

    const updateMessage = () => {
      updateMessageName()
      changeNote()
    }

    onMounted(() => {
      getLanguage()
      getMessage()
    })
    return {
      changeNote,
      indexActiveLanguage,
      setActiveLanguage,
      languages,
      worldId,
      gameId,
      stepId,
      message,
      removeMessage,
      assets,
      audio,
      find,
      note,
      addAssets,
      isEdit,
      editMessage,
      description,
      uploadFile,
      updateMessage
    }
  }
}
</script>
<style>
.language__item {
  padding: 12px;
  padding-right: 0;
  border-bottom: 1px solid #e7e8ec;
  cursor: pointer;
}

.language__item:hover {
  background: #303841;
  color: #fff;
}

.language__itemActive {
  background: #303841;
  color: #fff;
  cursor: default;
}
</style>
