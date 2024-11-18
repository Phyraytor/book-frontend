<template>
  <PageLayout>
    <template #header>
      <input v-if="enemy && isEdit" v-model="enemy.name" type="text" class="input__title">
      <h1 v-if="enemy && !isEdit" class="title">{{ enemy.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateEnemy" />
      <icon-pencil v-else :click="editEnemy" />
    </template>
    <template #sidebarLeft>
      <sidebar-block-spells :items="enemy.spells" />
    </template>
    <template #description>
      <textarea v-if="isEdit" v-model="enemy.description" class="description textarea" />
      <div v-else class="description">
        {{ enemy.description || 'Описание не задано' }}
      </div>
    </template>
    <template #sidebarRight>
      <download-image
        v-if="enemy"
        :enemy-id="enemy?.id"
        :image="image"
        :upload="uploadFile"
      />
    </template>
  </PageLayout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import DownloadImage from '@/components/UI/DownloadImage'
import PageLayout from '@/layouts/PageLayout'
import SidebarBlockSpells from '@/components/Sidebar/SidebarBlockSpells'

const API = 'http://localhost:3030'
export default {
  name: 'EnemyPage',
  components: {
    DownloadImage,
    IconSave,
    IconPencil,
    PageLayout,
    SidebarBlockSpells
  },
  setup () {
    const assets = ref([])
    const enemy = ref({})
    const find = ref('')
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.enemyId
    const gameId = route.params.gameId
    const worldId = route.params.worldId

    const image = computed(() => API + enemy.value.imagePath)
    const addAssets = (asset) => assets.value.push(asset)
    const editEnemy = () => {
      isEdit.value = true
    }

    const createSpell = async () => {
      const response = await fetch(`${API}/spells`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          name: '',
          description: '',
          enemyId: id
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      const step = await response.json()
      router.push({ name: 'spell-enemy-page', params: { gameId: gameId, enemyId: id, id: step.id } })
    }

    const uploadFile = async (formData) => {
      const response = await fetch(`${API}/enemies/${enemy.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      enemy.value.imagePath = data.path
    }

    const getEnemy = async () => {
      const response = await fetch(`${API}/enemies/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      enemy.value = await response.json()
    }
    const removeEnemy = async () => {
      const response = await fetch(`${API}/enemies/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      router.push({ name: 'game-page', params: { id: enemy.value?.game?.id } })
    }
    const updateEnemy = async () => {
      const response = await fetch(`${API}/enemies/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: enemy.value.description,
          name: enemy.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getEnemy()
    })
    return {
      id,
      worldId,
      gameId,
      enemy,
      removeEnemy,
      createSpell,
      assets,
      image,
      find,
      addAssets,
      isEdit,
      editEnemy,
      uploadFile,
      updateEnemy
    }
  }
}
</script>
<style>
</style>
