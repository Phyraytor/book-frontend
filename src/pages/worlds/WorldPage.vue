<template>
  <PageLayout>
    <template v-if="world" #header>
      <input v-if="isEdit" v-model="world.name" type="text" class="input__title">
      <h1 v-else class="title">{{ world.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateWorld" />
      <icon-pencil v-else :click="editWorld" />
    </template>
    <template v-if="world" #description>
      <textarea v-if="isEdit" v-model="world.description" class="description textarea" />
      <div v-else class="description">
        {{ world.description || 'Описание не задано' }}
      </div>
    </template>
    <template #sidebarRight>
      <sidebar-block-games />
    </template>
  </PageLayout>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { IWorld } from '@/interfaces/world'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import SidebarBlockGames from '@/components/Sidebar/SidebarBlockGames.vue'
import Queryitems from '@/queries/world'

export default {
  name: 'WorldPage',
  components: { SidebarBlockGames, IconSave, IconPencil, PageLayout },
  setup () {
    const name = ref('')
    const isEdit = ref(false)
    const world = ref<IWorld | null>(null)
    const route = useRoute()
    const worldId = route.params.worldId
    const router = useRouter()
    const editWorld = () => {
      isEdit.value = true
    }

    const getWorld = async () => {
      world.value = await Queryitems.$get(+worldId)
    }
    const removeWorld = async () => {
      await Queryitems.$delete(+worldId)
      router.push({ name: 'world-list' })
    }

    const updateWorld = async () => {
      if (!world.value) return null
      await Queryitems.$patch(+worldId, {
        description: world.value.description,
        name: world.value.name
      })
      isEdit.value = false
    }

    onMounted(() => {
      getWorld()
    })

    return {
      world,
      editWorld,
      updateWorld,
      removeWorld,
      isEdit,
      name
    }
  }
}
</script>

<style scoped>
</style>
