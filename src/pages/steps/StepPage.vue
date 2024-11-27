<template>
  <PageLayout>
    <template v-if="step" #header>
      <input v-if="isEdit" v-model="step.name" type="text" class="input__title">
      <h1 v-else class="title">{{ step.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="update" />
      <icon-pencil v-else :click="edit" />
    </template>
    <template #sidebarLeft>
      <sidebar-block-messages :items="step.messages"/>
    </template>
    <template v-if="step" #description>
      <textarea v-if="isEdit" v-model="step.description" class="description textarea" />
      <div v-else class="description">
        {{ step.description }}
      </div>
    </template>
    <template v-if="step" #sidebarRight>
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
          <sound-item
            :id="sound.id"
            :name="sound.name"
            :path="getSound(sound.path)"
          />
        </li>
      </ul>
      <download-sound
        v-if="step"
        :upload="uploadSoundFile"
      />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { IStep } from '@/interfaces/step'
import { ISound } from '@/interfaces/sound'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import DownloadImage from '@/components/UI/DownloadImage.vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import SidebarBlockMessages from '@/components/Sidebar/SidebarBlockMessages.vue'
import QuerySteps from '@/queries/step'
import SoundItem from '@/components/UI/SoundItem.vue'

export default {
  name: 'StepPage',
  components: {
    SoundItem,
    SidebarBlockMessages,
    DownloadSound,
    DownloadImage,
    IconSave,
    IconPencil,
    PageLayout
  },
  setup () {
    const step = ref<IStep | null>(null)
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const stepId = route.params.stepId
    const worldId = route.params.worldId
    const gameId = route.params.gameId
    const image = computed(() => step.value ? process.env.VUE_APP_API_URL + step.value.imagePath : '')
    const edit = () => {
      isEdit.value = true
    }

    const getSound = (sound: ISound) => sound ? process.env.VUE_APP_API_URL + sound : ''

    const uploadFile = async (formData: FormData) => {
      if (!step.value) return null
      const response = await fetch(`${process.env.VUE_APP_API_URL}/steps/${stepId}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      step.value.imagePath = data.path
    }

    const uploadSoundFile = async (formData: FormData) => {
      if (!step.value) return null
      const response = await fetch(`${process.env.VUE_APP_API_URL}/steps/${stepId}/upload-sound`, {
        method: 'POST',
        body: formData
      })
      const sound = await response.json()
      step.value.sounds.push(sound)
    }

    const getStep = async () => {
      step.value = await QuerySteps.$get(+stepId)
    }

    const remove = async () => {
      await QuerySteps.$delete(+stepId)
      router.push({ name: 'game-page', params: { worldId, gameId } })
    }

    const update = async () => {
      if (!step.value) return null
      await QuerySteps.$patch(+stepId, {
        name: step.value.name,
        description: step.value.description
      })
      isEdit.value = false
    }

    onMounted(() => {
      getStep()
    })

    return {
      image,
      step,
      isEdit,
      edit,
      update,
      remove,
      uploadFile,
      getSound,
      uploadSoundFile
    }
  }
}
</script>
<style scoped>
  .step-sounds__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
