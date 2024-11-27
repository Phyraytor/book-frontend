<template>
  <PageLayout>
    <template v-if="spell" #header>
      <input v-if="isEdit" v-model="spell.name" type="text" class="input__title">
      <h1 v-else class="title">{{ spell.name || 'Имя не задано' }}</h1>

      <router-link v-if="spell.linkAnimation" :to="spell.linkAnimation" class="">
        <icon-animation />
      </router-link>
      <icon-animation v-else :click="() => createTask(ETaskTypes.ANIMATION)" class-name="absent" />

      <router-link v-if="spell.linkParticleSystem" :to="spell.linkParticleSystem" class="">
        <icon-particle-system />
      </router-link>
      <icon-particle-system v-else :click="() => createTask(ETaskTypes.PARTICLE_SYSTEM)" class-name="absent" />

      <icon-save v-if="isEdit" :click="updateSpell" />
      <icon-pencil v-else :click="editSpell" />
    </template>
    <template v-if="spell" #sidebarLeft>
      <download-sound :audio="audio" :upload="uploadFile" />
    </template>

    <template v-if="spell" #description>
      <textarea v-if="isEdit" v-model="spell.description" class="description textarea" />
      <div v-else class="description">
        {{ spell.description || 'Описание не задано' }}
      </div>
    </template>
    <template v-if="spell" #sidebarRight>
      <download-image :audio="image" :upload="uploadFile" />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import IconParticleSystem from '@/components/assets/svg/IconParticleSystem.vue'
import IconAnimation from '@/components/assets/svg/IconAnimation.vue'
import DownloadImage from '@/components/UI/DownloadImage.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QuerySpells from '@/queries/spell'
import QueryTasks from '@/queries/task'
import { ISpell } from '@/interfaces/spell'
import { ETaskTypes } from '@/interfaces/task'

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
    const spell = ref<ISpell | null>(null)
    const isEdit = ref<boolean>(false)
    const router = useRouter()
    const route = useRoute()
    const spellId = route.params.spellId
    const worldId = route.params.worldId
    const gameId = route.params.gameId
    const personId = route.params.personId
    const enemyId = route.params.enemyId

    const audio = computed(() => spell.value?.sound?.path && (process.env.VUE_APP_API_URL + spell.value?.sound?.path))
    const image = computed(() => spell.value?.imagePath && (process.env.VUE_APP_API_URL + spell.value?.imagePath))

    const navigateBackPage = () => {
      if (personId) {
        router.push({ name: 'person-page', params: { worldId, gameId, id: personId } })
      }
      if (enemyId) {
        router.push({ name: 'enemy-page', params: { worldId, gameId, id: enemyId } })
      }
    }

    const editSpell = () => {
      isEdit.value = true
    }

    const uploadFile = async (formData: FormData) => {
      if (!spell.value) return
      const response = await fetch(`${process.env.VUE_APP_API_URL}/spells/${spellId}/upload`, {
        method: 'POST',
        body: formData
      })
      spell.value.sound = await response.json()
    }

    const getSpell = async () => {
      spell.value = await QuerySpells.$get(+spellId)
    }

    const removeSpell = async () => {
      await QuerySpells.$delete(+spellId)
      navigateBackPage()
    }

    const createTask = async (type: ETaskTypes) => {
      if (!spell.value) return null
      const title = `${type === ETaskTypes.ANIMATION ? 'Анимация' : 'Система частиц'} для умения ${spell.value?.name.toLowerCase()}`
      const task = await QueryTasks.$post({
        description: '',
        parentLink: window.location.pathname,
        type,
        title
      })
      const link = type === ETaskTypes.ANIMATION ? 'linkAnimation' : 'linkParticleSystem'
      spell.value[link] = `/worlds/${worldId}/games/${gameId}/tasks/${task.id}`
      await updateSpell()
      router.push({ name: 'task-page', params: { worldId, gameId, taskId: task?.id } })
    }

    const updateSpell = async () => {
      if (!spell.value) return null
      await QuerySpells.$patch(+spellId, {
        description: spell.value.description,
        name: spell.value.name,
        linkAnimation: spell.value.linkAnimation,
        linkParticleSystem: spell.value.linkParticleSystem
      })
      isEdit.value = false
    }

    onMounted(() => {
      getSpell()
    })

    return {
      ETaskTypes,
      image,
      audio,
      spell,
      isEdit,
      createTask,
      removeSpell,
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
