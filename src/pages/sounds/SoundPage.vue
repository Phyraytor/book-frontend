<template>
  <PageLayout :remove="remove">
    <template #header>
      <input v-if="isEdit" v-model="sound.name" type="text" class="input__title">
      <h1 v-else class="title">{{ sound.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateSound" />
      <icon-pencil v-else :click="editSound" />
    </template>
    <template #description>
      <audio v-if="!isEdit && audio" controls>
        <source :src="audio" type="audio/mpeg">
        <p>Браузер не поддерживает аудио</p>
      </audio>
      <input v-if="isEdit" v-model="sound.author" type="text" class="input__sound">
      <p v-else class="">Автор: {{ sound.author || 'Имя не задано' }}</p>
      <input v-if="isEdit" v-model="sound.link" type="text" class="input__sound">
      <p v-else class="">Источник: {{ sound.link || 'Имя не задано' }}</p>
      <textarea v-if="isEdit" v-model="sound.description" class="description textarea" />
      <div v-else class="description">
        {{ sound.description || 'Описание не задано' }}
      </div>
    </template>
  </PageLayout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import IconSave from '@/components/assets/svg/IconSave'
import IconPencil from '@/components/assets/svg/IconPencil'
import PageLayout from '@/layouts/PageLayout'

const API = 'http://localhost:3030'
export default {
  name: 'SoundPage',
  components: {
    PageLayout,
    IconSave,
    IconPencil
  },
  setup () {
    const assets = ref([])
    const sound = ref({})
    const find = ref('')
    const isEdit = ref(false)
    const route = useRoute()
    const router = useRouter()
    const id = route.params.soundId
    const worldId = route.params.worldId
    const addAssets = (asset) => assets.value.push(asset)
    const editSound = () => {
      isEdit.value = true
    }
    const audio = computed(() => sound.value.path ? API + sound.value.path : '')
    const getSound = async () => {
      const response = await fetch(`${API}/sounds/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      sound.value = await response.json()
    }

    const remove = async () => {
      const response = await fetch(`${API}/sounds/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      router.push({ name: 'sounds-list' })
    }

    const updateSound = async () => {
      const response = await fetch(`${API}/sounds/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          link: sound.value.link,
          author: sound.value.author,
          description: sound.value.description,
          name: sound.value.name
        })
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      isEdit.value = false
    }

    onMounted(() => {
      getSound()
    })
    return {
      remove,
      audio,
      sound,
      worldId,
      assets,
      find,
      addAssets,
      isEdit,
      editSound,
      updateSound
    }
  }
}
</script>
<style>
.input__sound {
  margin: 0;
  font-size: 18px;
  border: none;
  font-weight: 600;
  font-family: Georgia, serif;
  flex-grow: 1;
  padding: 0 12px;
  background: #303841;
  color: #fff;
  border-bottom: 1px solid #fff;
  height: 73px;
  width: calc(100% - 24px);
}
</style>
