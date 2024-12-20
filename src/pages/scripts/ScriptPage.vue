<template>
  <PageLayout>
    <template v-if="script" #header>
      <input v-if="isEdit" v-model="script.name" type="text" class="input__title">
      <h1 v-else class="title">{{ script.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="update" />
      <icon-pencil v-else :click="edit" />
    </template>
    <template v-if="script" #description>
      <ul class="scripts">
        <li
          v-for="script in script.items"
          :key="script.sound.id"
          class="scripts__item"
        >
          <div v-if="script.delay">Delay: {{ script.delay }}</div>
          <sound-item
            :id="script.sound.id"
            :name="script.sound.name"
            :path="getSound(script.sound.path)"
          />
        </li>
        <li>
          Добавить элемент
        </li>
      </ul>
      <download-sound
        v-if="script"
        :upload="uploadFile"
      />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { IScript } from '@/interfaces/script'
import { ISound } from '@/interfaces/sound'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import DownloadImage from '@/components/UI/DownloadImage.vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import SidebarBlockMessages from '@/components/Sidebar/SidebarBlockMessages.vue'
import QueryScripts from '@/queries/script'
import SoundItem from '@/components/UI/SoundItem.vue'
import { ISidebarItem } from '@/interfaces/sidebar'

export default {
  name: 'ScriptPage',
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
    const script = ref<IScript | null>(null)
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const scriptId = route.params.scriptId
    const worldId = route.params.worldId
    const gameId = route.params.gameId
    const edit = () => {
      isEdit.value = true
    }

    const sortSteps = () => {
      if (!script.value?.items) return
      script.value.items.sort((x: ISidebarItem, y: ISidebarItem) => x.orderBy - y.orderBy)
    }

    const getSound = (sound: ISound) => sound ? process.env.VUE_APP_API_URL + sound : ''

    const uploadFile = async (formData: FormData) => {
      if (!script.value) return null
      const response = await fetch(`${process.env.VUE_APP_API_URL}/scripts/${scriptId}/upload-sound`, {
        method: 'POST',
        body: formData
      })
      const sound = await response.json()
      script.value.sounds.push(sound)
    }

    const getScript = async () => {
      script.value = await QueryScripts.$get(+scriptId)
      sortSteps();
    }

    const remove = async () => {
      await QueryScripts.$delete(+scriptId)
      router.push({ name: 'game-page', params: { worldId, gameId } })
    }

    const update = async () => {
      if (!script.value) return null
      await QueryScripts.$patch(+scriptId, {
        name: script.value.name,
        description: script.value.description
      })
      isEdit.value = false
    }

    onMounted(() => {
      getScript()
    })

    return {
      script,
      isEdit,
      edit,
      update,
      remove,
      uploadFile,
      getSound,
    }
  }
}
</script>
<style scoped>
.script-sounds__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
