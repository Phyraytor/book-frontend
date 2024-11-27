<template>
  <PageLayout :remove="remove">
    <template v-if="sound" #header>
      <input v-if="isEdit" v-model="sound.name" type="text" class="input__title">
      <h1 v-else class="title">{{ sound.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateSound" />
      <icon-pencil v-else :click="editSound" />
    </template>
    <template v-if="sound" #description>
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
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { ISound } from '@/interfaces/sound'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QuerySounds from '@/queries/sound'

export default {
  name: 'SoundPage',
  components: {
    PageLayout,
    IconSave,
    IconPencil
  },
  setup () {
    const sound = ref<ISound | null>(null)
    const isEdit = ref(false)
    const route = useRoute()
    const router = useRouter()
    const soundId = route.params.soundId
    const editSound = () => {
      isEdit.value = true
    }
    const audio = computed(() => sound.value?.path ? process.env.VUE_APP_API_URL + sound.value.path : '')
    const getSound = async () => {
      sound.value = await QuerySounds.$get(+soundId)
    }

    const remove = async () => {
      await QuerySounds.$delete(+soundId)
      router.push({ name: 'sounds-list' })
    }

    const updateSound = async () => {
      if (!sound.value) return null
      await QuerySounds.$patch(+soundId, {
        link: sound.value.link,
        author: sound.value.author,
        description: sound.value.description,
        name: sound.value.name
      })
      isEdit.value = false
    }

    onMounted(() => {
      getSound()
    })

    return {
      audio,
      sound,
      isEdit,
      remove,
      editSound,
      updateSound
    }
  }
}
</script>
<style lang="scss">
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
