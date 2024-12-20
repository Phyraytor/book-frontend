<template>
  <PageLayout>
    <template v-if="subject" #header>
      <input v-if="isEdit" v-model="subject.name" type="text" class="input__title">
      <h1 v-else class="title">{{ subject.name || 'Имя не задано' }}</h1>

      <router-link v-if="subject.modelLink" :to="subject.modelLink" class="">
        <icon-model />
      </router-link>
      <icon-model v-else :click="() => createTask(ETaskTypes.MODEL)" class-name="absent" />

      <icon-save v-if="isEdit" :click="updateSubject" />
      <icon-pencil v-else :click="editSubject" />
    </template>
    <template v-if="spells" #sidebarLeft>
      <sidebar-block-spells :items="spells" />
    </template>
    <template v-if="subject" #description>
      <textarea v-if="isEdit" v-model="subject.description" class="description textarea" />
      <div v-else class="description">
        {{ subject.description || 'Описание не задано' }}
      </div>
    </template>
    <template v-if="subject" #sidebarRight>
      <download-image :image="image" :upload="uploadFile" />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QuerySubjects from '@/queries/subject'
import QuerySpells from '@/queries/spell'
import SidebarBlockSpells from '@/components/Sidebar/SidebarBlockSpells.vue'
import DownloadImage from '@/components/UI/DownloadImage.vue'
import { ISubject } from '@/interfaces/subject'
import { ISpell } from '@/interfaces/spell'
import { ETaskTypes } from '@/interfaces/task'
import IconModel from '@/components/assets/svg/IconModel.vue'
import QueryTasks from '@/queries/task'

export default {
  name: 'SubjectPage',
  components: {
    IconModel,
    DownloadImage,
    PageLayout,
    IconSave,
    IconPencil,
    SidebarBlockSpells
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const subject = ref<ISubject | null>(null)
    const isEdit = ref<boolean>(false)
    const subjectId = route.params.subjectId
    const gameId = route.params.gameId
    const worldId = route.params.worldId
    const spells = ref<ISpell[]>([])
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
    const getSpells = async () => {
      spells.value = await QuerySpells.$getAll({ subjectId: +subjectId })
    }
    const removeSubject = async () => {
      subject.value = await QuerySubjects.$delete(+subjectId)
      router.push({ name: 'game-page', params: { gameId, worldId } })
    }
    const updateSubject = async () => {
      if (!subject.value) return null
      await QuerySubjects.$patch(+subjectId, {
        name: subject.value.name,
        description: subject.value.description,
        modelLink: subject.value.modelLink
      })
      isEdit.value = false
    }

    const createTask = async (type: ETaskTypes) => {
      if (!subject.value) return null
      const task = await QueryTasks.$post({
        title: `Модель для предмета ${subject.value?.name.toLowerCase()}`,
        description: '',
        parentLink: window.location.pathname,
        type
      })
      subject.value.modelLink = `/worlds/${worldId}/games/${gameId}/tasks/${task.id}`
      await updateSubject()
      router.push({ name: 'task-page', params: { worldId, gameId, taskId: task?.id } })
    }

    onMounted(() => {
      getSubject()
      getSpells()
    })
    return {
      ETaskTypes,
      audio,
      subject,
      spells,
      isEdit,
      createTask,
      uploadFile,
      removeSubject,
      editSubject,
      updateSubject
    }
  }
}
</script>
<style lang="scss">
  .absent svg path {
    fill: #8a0000;
  }
</style>
