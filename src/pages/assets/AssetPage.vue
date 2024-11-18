<template>
  <div class="content">
    <div class="head">
      <h1 class="title">{{ asset.name }}</h1>
      <button class="button" @click="remove">Удалить</button>
    </div>
    <div class="main">
      <div>
        <img
          v-if="asset.image"
          :src="asset.image"
          :alt="asset.name"
        />
        <a v-if="asset.link" :href="asset.link">Ссылка</a>
      </div>
      <div class="description">
        {{ asset.description }}
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
const API = 'http://localhost:3030'
export default {
  name: 'StepPage',
  setup () {
    const asset = ref({})
    const router = useRouter()
    const route = useRoute()
    const id = route.params.assetId
    const getAsset = async () => {
      const response = await fetch(`${API}/assets/${id}`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      asset.value = await response.json()
    }
    const remove = async () => {
      const response = await fetch(`${API}/assets/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      router.push({ name: 'assets' })
    }
    onMounted(() => {
      getAsset()
    })
    return {
      asset,
      remove
    }
  }
}
</script>
<style>
</style>
