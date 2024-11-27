<template>
  <PageLayout>
    <template v-if="subject" #header>
      <input v-if="isEdit" v-model="subject.name" type="text" class="input__title">
      <h1 v-else class="title">{{ subject.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateSubject" />
      <icon-pencil v-else :click="editSubject" />
    </template>
    <template v-if="subject" #description>
      <textarea v-if="isEdit" v-model="subject.description" class="description textarea" />
      <div v-else class="description">
        {{ subject.description || 'Описание не задано' }}
      </div>
    </template>
    <template v-if="subject" #sidebarRight>
      <download-sound :audio="audio" :upload="uploadFile" />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QuerySubjects from '@/queries/subject'
import { ISubject } from '@/interfaces/subject'

export default {
  name: 'SubjectPage',
  components: {
    PageLayout,
    DownloadSound,
    IconSave,
    IconPencil
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const subject = ref<ISubject | null>(null)
    const isEdit = ref<boolean>(false)
    const subjectId = route.params.subjectId
    const gameId = route.params.gameId
    const worldId = route.params.worldId
    const audio = computed(() => subject.value?.sound?.path && (process.env.VUE_APP_API_URL + subject.value?.sound?.path))
    const editSubject = () => {
      isEdit.value = true
    }
    const uploadFile = async (formData: FormData) => {
      if (!subject.value) return
      const response = await fetch(`${process.env.VUE_APP_API_URL}/subjects/${subject.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      subject.value.sound = await response.json()
    }
    const getSubject = async () => {
      subject.value = await QuerySubjects.$get(+subjectId)
    }
    const removeSubject = async () => {
      subject.value = await QuerySubjects.$delete(+subjectId)
      router.push({ name: 'game-page', params: { gameId, worldId } })
    }
    const updateSubject = async () => {
      if (!subject.value) return null
      subject.value = await QuerySubjects.$patch(+subjectId, {
        name: subject.value.name,
        description: subject.value.description
      })
      isEdit.value = false
    }

    onMounted(() => {
      getSubject()
    })
    return {
      audio,
      subject,
      isEdit,
      uploadFile,
      removeSubject,
      editSubject,
      updateSubject
    }
  }
}
</script>
<style>
</style>
