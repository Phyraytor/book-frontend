<template>
  <PageLayout>
    <template #header>
      <input v-if="isEdit" v-model="person.name" type="text" class="input__title">
      <h1 v-else class="title">{{ person.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updatePerson" />
      <icon-pencil v-else :click="editPerson" />
    </template>
    <template #sidebarLeft>
      <sidebar-block-spells :items="person.spells" />
    </template>
    <template #description>
      <textarea v-if="isEdit" v-model="person.description" class="description textarea" />
      <div v-else class="description">
        {{ person.description || 'Описание не задано' }}
      </div>
    </template>
  </PageLayout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import PageLayout from '@/layouts/PageLayout'
import SidebarBlockSpells from '@/components/Sidebar/SidebarBlockSpells'

const API = 'http://localhost:3030'
export default {
  name: 'PersonPage',
  components: {
    IconSave,
    IconPencil,
    PageLayout,
    SidebarBlockSpells
  },
  setup () {
    const assets = ref([])
    const person = ref({})
    const find = ref('')
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.personId
    const worldId = route.params.worldId
    const gameId = route.params.gameId
    const addAssets = (asset) => assets.value.push(asset)
    const editPerson = () => {
      isEdit.value = true
    }
    const getPerson = async () => {
      const response = await fetch(`${API}/persons/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      person.value = await response.json()
    }
    const removePerson = async () => {
      const response = await fetch(`${API}/persons/${id}`, {
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
    const updatePerson = async () => {
      const response = await fetch(`${API}/persons/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          description: person.value.description,
          name: person.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getPerson()
    })
    return {
      id,
      worldId,
      gameId,
      person,
      removePerson,
      assets,
      find,
      addAssets,
      isEdit,
      editPerson,
      updatePerson
    }
  }
}
</script>
<style>
</style>
