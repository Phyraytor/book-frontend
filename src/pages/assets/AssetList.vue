<template>
  <div class="content">
    <div class="head">
      <h1 class="title">Ассеты</h1>
    </div>
    <div class="assets">
      <router-link
        v-for="asset in assets"
        :key="asset.id"
        class="assets__item"
        :to="`/assets/${asset.id}`"
      >
        {{ asset.name }}
      </router-link>
    </div>
    <create-asset-from :append="append" />
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import CreateAssetFrom from '@/components/CreateAssetFrom.vue'
const API = 'http://localhost:3030'
export default {
  name: 'StepPage',
  components: {
    CreateAssetFrom
  },
  setup () {
    const assets = ref({})
    const getAssets = async () => {
      const response = await fetch(`${API}/assets`)
      if (!response.ok) {
        console.log(`Ошибка HTTP: ${response.status}`)
        return
      }
      assets.value = await response.json()
    }

    const append = (asset) => {
      assets.value.push(asset)
    }
    onMounted(() => {
      getAssets()
    })
    return {
      assets,
      append
    }
  }
}
</script>
<style>
.assets {
  display: flex;
}
.assets__item {
  background: #fff;
  flex: 0 0 20%;
  aspect-ratio: 1 / 1;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 12px;
}
</style>
