<template>
  <PageLayout>
    <template v-if="message" #header>
      <input v-if="isEdit" v-model="message.name" type="text" class="input__title">
      <h1 v-else class="title">{{ message.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateMessage" />
      <icon-pencil v-else :click="editMessage" />
    </template>
    <template #sidebarLeft>
      <div class="language__title">
        <span>Переводы</span>
      </div>
      <ul class="language">
        <li
          v-for="(language, index) in languages"
          :key="language.id"
          :class="`language__item ${index === indexActiveLanguage ? 'language__item--active' : ''}`"
          @click="setActiveLanguage(index)"
        >
          <span>{{ language.name }}</span>
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
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { ILanguage } from '@/interfaces/language'
import { IMessage } from '@/interfaces/message'
import { INote } from '@/interfaces/note'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QueryLanguages from '@/queries/language'
import QueryMessages from '@/queries/message'
import QueryNotes from '@/queries/note'

export default {
  name: 'MessagePage',
  components: {
    DownloadSound,
    IconSave,
    IconPencil,
    PageLayout
  },
  setup () {
    const languages = ref<ILanguage[]>([])
    const message = ref<IMessage | null>(null)
    const description = ref('')
    const isEdit = ref<boolean>(false)
    const indexActiveLanguage = ref(0)
    const router = useRouter()
    const route = useRoute()
    const messageId = route.params.messageId
    const gameId = route.params.gameId
    const worldId = route.params.worldId

    const languageId = computed(() => languages.value?.[indexActiveLanguage.value]?.id)
    const note = computed(() => message.value?.notes?.find((note: INote) => note.language.id === languageId.value))
    const audio = computed(() => note.value?.sound?.path && (process.env.VUE_APP_API_URL + note.value?.sound?.path))
    const setActiveLanguage = (index: number) => {
      indexActiveLanguage.value = index
      description.value = note.value?.content || ''
    }

    const getLanguage = async () => {
      languages.value = await QueryLanguages.$getAll({ gameId: +gameId })
      getMessage()
    }

    const editMessage = () => {
      isEdit.value = true
    }

    const uploadFile = async (formData: FormData) => {
      if (!note.value) return
      const response = await fetch(`${process.env.VUE_APP_API_URL}/notes/${note.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      note.value.sound = await response.json()
    }

    const getMessage = async () => {
      message.value = await QueryMessages.$get(+messageId)
      setActiveLanguage(0)
    }
    const removeMessage = async () => {
      await QueryMessages.$delete(+messageId)
      router.push({ name: 'game-page', params: { worldId, gameId } })
    }

    const updateMessageName = async () => {
      if (!message.value) return null
      await QueryMessages.$patch(+messageId, {
        name: message.value.name
      })
      isEdit.value = false
    }

    const createNote = async () => {
      if (!message.value || !languageId.value) return null
      const note = await QueryNotes.$post({
        content: description.value,
        messageId: message.value.id,
        languageId: languageId.value
      })
      message.value.notes.push(note)
    }

    const updateNote = async (noteId: number) => {
      if (!note.value) return null
      await QueryNotes.$patch(noteId, {
        content: description.value
      })
      note.value.content = description.value
    }

    const changeOrUpdateNote = () => {
      if (note.value) {
        updateNote(note.value.id)
      } else {
        createNote()
      }
    }

    const updateMessage = () => {
      updateMessageName()
      changeOrUpdateNote()
    }

    onMounted(() => {
      getLanguage()
    })
    return {
      languages,
      message,
      audio,
      note,
      isEdit,
      description,
      indexActiveLanguage,
      removeMessage,
      editMessage,
      uploadFile,
      updateMessage,
      setActiveLanguage
    }
  }
}
</script>
<style lang="scss" scoped>
  .language {
    &__title {
      border-bottom: 1px solid #e7e8ec;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;
      font-size: 18px;
      font-weight: bold;
      gap: 12px;
      padding-left: 12px;
      height: 72px;
    }

    &__item {
      padding: 12px;
      padding-right: 0;
      border-bottom: 1px solid #e7e8ec;
      cursor: pointer;

      &--active {
        background: #303841;
        color: #fff;
        cursor: default;
      }

      &:hover {
        background: #303841;
        color: #fff;
      }
    }
  }
</style>
