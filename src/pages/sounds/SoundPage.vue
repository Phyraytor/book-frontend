<template>
  <div class="head">
    <router-link :to="`/games/${person?.game?.id}`" class="back game__persons">
      <icon-back />
    </router-link>
    <div class="content flex">
      <input v-if="isEdit" v-model="person.name" type="text" class="input__title">
      <h1 v-else class="title">{{ person.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updatePerson" />
      <icon-pencil v-else :click="editPerson" />
    </div>
    <div class="buttons game__persons">
      <icon-remove :click="removePerson" />
    </div>
  </div>
  <div class="content">
    <download-sound v-if="false" />
    <textarea v-if="isEdit" v-model="person.description" class="description textarea" />
    <div v-else class="description">
      {{ person.description || 'Описание не задано' }}
    </div>
    <div v-if="false">
      <input v-model="find" type="text" placeholder="ассет">
    </div>
    <create-asset-from v-if="false" :append="addAssets" />
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import CreateAssetFrom from '@/components/CreateAssetFrom.vue'
import DownloadSound from '@/components/UI/DownloadSound.vue'
import IconBack from '@/components/assets/svg/IconBack'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import IconRemove from '@/components/assets/svg/IconRemove'

const API = 'http://localhost:3030'
export default {
  name: 'PersonPage',
  components: {
    CreateAssetFrom,
    DownloadSound,
    IconBack,
    IconSave,
    IconPencil,
    IconRemove
  },
  setup () {
    const assets = ref([])
    const person = ref({})
    const find = ref('')
    const isEdit = ref(false)
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id
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
