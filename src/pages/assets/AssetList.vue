<template>
  <PageLayout>
    <template #header>
      <h1 class="title">Список ассетов</h1>
      <router-link to="/articles">
        <icon-article />
      </router-link>
      <icon-plus :click="createAsset" />
    </template>
    <template #sidebarLeft>
      <p class="description">
        Эпики зачем-то вырезали кнопку избранного, потому придётся пока её сделать, надеюсь когда-нибудь вернут
      </p>
    </template>
    <template #description>
      <numbered-list
        :items="assets"
        :getLink="(assetId) => `/assets/${assetId}`"
        fieldName="name"
      />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import QueryAssets from '@/queries/asset'
import PageLayout from '@/layouts/PageLayout.vue'
import NumberedList from '@/components/UI/NumberedList.vue'
import IconArticle from '@/components/assets/svg/IconArticle.vue'
import { useRouter } from 'vue-router/dist/vue-router'
import { IAsset } from '@/interfaces/asset'

export default {
  name: 'AssetList',
  components: { IconPlus, PageLayout, NumberedList, IconArticle },
  setup () {
    const router = useRouter()
    const assets = ref<IAsset[]>([])
    const getAssets = async () => {
      assets.value = await QueryAssets.$getAll()
    }

    const createAsset = async () => {
      const asset = await QueryAssets.$post({
        name: '',
        description: '',
        link: ''
      })
      router.push({ name: 'asset-page', params: { assetId: asset.id } })
    }

    onMounted(() => {
      getAssets()
    })

    return {
      assets,
      createAsset
    }
  }
}
</script>
<style lang="scss">
</style>
