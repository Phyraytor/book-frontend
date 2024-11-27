<template>
  <PageLayout>
    <template #header>
      <h1 class="title">Список аудио</h1>
      <icon-plus :click="createSound"/>
    </template>
    <template #description>
      <numbered-list
        :items="sounds"
        :getLink="(soundId) => `/sounds/${soundId}`"
        fieldName="name"
      />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'
import { ISound } from '@/interfaces/sound'
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import QuerySounds from '@/queries/sound'
import PageLayout from '@/layouts/PageLayout.vue'
import NumberedList from '@/components/UI/NumberedList.vue'

export default {
  name: 'SoundList',
  components: { IconPlus, PageLayout, NumberedList },
  setup () {
    const router = useRouter()
    const sounds = ref<ISound[]>([])

    const getSounds = async () => {
      sounds.value = await QuerySounds.$getAll()
    }

    const createSound = async () => {
      const sound = await QuerySounds.$post({
        planes: '',
        sources: '',
        notices: '',
        story: '',
        name: '',
        description: ''
      })
      router.push({ name: 'sounds-page', params: { id: sound.id } })
    }

    onMounted(() => {
      getSounds()
    })

    return {
      sounds,
      createSound
    }
  }
}
</script>
<style lang="scss">
</style>
