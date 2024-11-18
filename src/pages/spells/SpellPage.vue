<template>
  <PageLayout>
    <template #header>
      <input v-if="isEdit" v-model="spell.name" type="text" class="input__title">
      <h1 v-else class="title">{{ spell.name || 'Имя не задано' }}</h1>

      <router-link v-if="spell.linkAnimation" :to="spell.linkAnimation" class="">
        <icon-animation />
      </router-link>
      <icon-animation v-else :click="() => createTask('ANIMATION')" class-name="absent" />

      <router-link v-if="spell.linkParticleSystem" :to="spell.linkParticleSystem" class="">
        <icon-particle-system />
      </router-link>
      <icon-particle-system v-else :click="() => createTask('PARTICLE_SYSTEM')" class-name="absent" />

      <icon-save v-if="isEdit" :click="updateSpell" />
      <icon-pencil v-else :click="editSpell" />
    </template>
    <template #sidebarLeft>
      <download-sound v-if="spell" :audio="audio" :upload="uploadFile" />
    </template>

    <template #description>
      <textarea v-if="isEdit" v-model="spell.description" class="description textarea" />
      <div v-else class="description">
        {{ spell.description || 'Описание не задано' }}
      </div>
    </template>
    <template #sidebarRight>
      <download-image v-if="spell" :audio="image" :upload="uploadFile" />
    </template>
  </PageLayout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconParticleSystem from '@/components/assets/svg/IconParticleSystem'
import IconAnimation from '@/components/assets/svg/IconAnimation'
import DownloadImage from '@/components/UI/DownloadImage'
import PageLayout from '@/layouts/PageLayout'

const API = 'http://localhost:3030'
export default {
  name: 'SpellPage',
  components: {
    PageLayout,
    DownloadImage,
    DownloadSound,
    IconSave,
    IconPencil,
    IconParticleSystem,
    IconAnimation
  },
  setup () {
    const assets = ref([])
    const spell = ref({})
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.spellId
    const worldId = route.params.worldId
    const gameId = route.params.gameId
    const personId = route.params.personId
    const enemyId = route.params.enemyId

    const audio = computed(() => spell.value?.sound?.path && (API + spell.value?.sound?.path))
    const image = computed(() => spell.value?.imagePath?.path && (API + spell.value?.sound?.imagePath))

    const navigateBackPage = () => {
      if (personId) {
        router.push({ name: 'person-page', params: { worldId, gameId, id: personId } })
      }
      if (enemyId) {
        router.push({ name: 'enemy-page', params: { worldId, gameId, id: enemyId } })
      }
    }

    const addAssets = (asset) => assets.value.push(asset)
    const editSpell = () => {
      isEdit.value = true
    }

    const uploadFile = async (formData) => {
      if (!spell.value) return
      const response = await fetch(`${API}/spells/${spell.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      spell.value.sound = await response.json()
    }

    const getSpell = async () => {
      const response = await fetch(`${API}/spells/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      spell.value = await response.json()
    }

    const removeSpell = async () => {
      const response = await fetch(`${API}/spells/${id}`, {
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

    const createTask = async (type) => {
      const title = `${type === 'ANIMATION' ? 'Анимация' : 'Система частиц'} для умения ${spell.value.name.toLowerCase()}`
      const response = await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: '',
          parentLink: window.location.pathname,
          type,
          title
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
      }
      const task = await response.json()
      const link = type === 'ANIMATION' ? 'linkAnimation' : 'linkParticleSystem'
      spell.value[link] = `/worlds/${worldId}/games/${gameId}/tasks/${task.id}`
      await updateSpell()
      router.push({ name: 'task-page', params: { worldId, gameId, taskId: task?.id } })
    }

    const updateSpell = async () => {
      const response = await fetch(`${API}/spells/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: spell.value.description,
          name: spell.value.name,
          linkAnimation: spell.value.linkAnimation,
          linkParticleSystem: spell.value.linkParticleSystem
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getSpell()
    })
    return {
      image,
      createTask,
      navigateBackPage,
      spell,
      gameId,
      personId,
      removeSpell,
      assets,
      addAssets,
      isEdit,
      audio,
      uploadFile,
      editSpell,
      updateSpell
    }
  }
}
</script>
<style>
  .absent svg path {
    fill: #8a0000;
  }
</style>
