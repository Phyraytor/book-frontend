<template>
  <div class="head">
    <div class="content head__content">
      <h1 class="title">Список аудио</h1>
      <icon-plus :click="createSound" />
    </div>
  </div>
  <div class="items">
    <ul class="items-list">
      <li
        v-for="(sound, index) in sounds"
        class="items-list__item"
        :key="sound.id"
      >
        <router-link class="items-list__link" :to="`/sounds/${sound.id}`">
          <span class="items-index">{{ index + 1 }}</span>
          <span class="items-text">{{ sound.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import { useRouter } from 'vue-router/dist/vue-router'
import QuerySounds from '@/queries/sound'
import { ISound } from '@/interfaces/sound'

export default {
  name: 'SoundList',
  components: { IconPlus },
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
<style>
</style>
