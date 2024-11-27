<template>
  <PageLayout>
    <template v-if="enemy" #header>
      <input v-if="isEdit" v-model="enemy.name" type="text" class="input__title">
      <h1 v-if="!isEdit" class="title">{{ enemy.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateEnemy" />
      <icon-pencil v-else :click="editEnemy" />
    </template>
    <template v-if="enemy" #sidebarLeft>
      <sidebar-block-spells :items="enemy.spells" />
    </template>
    <template v-if="enemy" #description>
      <textarea v-if="isEdit" v-model="enemy.description" class="description textarea" />
      <div v-else class="description">
        {{ enemy.description || 'Описание не задано' }}
      </div>
    </template>
    <template v-if="enemy" #sidebarRight>
      <download-image
        :enemy-id="enemy?.id"
        :image="image"
        :upload="uploadFile"
      />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { IEnemy } from '@/interfaces/enemy'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import DownloadImage from '@/components/UI/DownloadImage.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import SidebarBlockSpells from '@/components/Sidebar/SidebarBlockSpells.vue'
import QueryEnemies from '@/queries/enemy'

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
    const enemy = ref<IEnemy | null>(null)
    const isEdit = ref<Boolean>(false)
    const router = useRouter()
    const route = useRoute()
    const enemyId = route.params.enemyId
    const gameId = route.params.gameId
    const worldId = route.params.worldId

    const image = computed(() => enemy?.value?.imagePath ? process.env.VUE_APP_API_URL + enemy.value?.imagePath : '')
    const editEnemy = () => {
      isEdit.value = true
    }

    const uploadFile = async (formData: FormData) => {
      if (!enemy.value) return null
      const response = await fetch(`${process.env.VUE_APP_API_URL}/enemies/${enemy.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      enemy.value.imagePath = data.path
    }

    const getEnemy = async () => {
      enemy.value = await QueryEnemies.$get(+enemyId)
    }
    const removeEnemy = async () => {
      await QueryEnemies.$delete(+enemyId)
      router.push({ name: 'game-page', params: { worldId, gameId } })
    }
    const updateEnemy = async () => {
      if (!enemy.value) return null
      await QueryEnemies.$patch(+enemyId, {
        description: enemy.value.description,
        name: enemy.value.name
      })
      isEdit.value = false
    }

    onMounted(() => {
      getEnemy()
    })
    return {
      enemy,
      image,
      isEdit,
      removeEnemy,
      editEnemy,
      updateEnemy,
      uploadFile
    }
  }
}
</script>
<style>
</style>
