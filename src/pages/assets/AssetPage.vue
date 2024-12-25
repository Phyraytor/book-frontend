<template>
  <PageLayout>
    <template v-if="asset" #header>
      <input v-if="isEdit" v-model="asset.name" type="text" class="input__title">
      <h1 v-if="!isEdit" class="title">{{ asset.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateAsset" />
      <icon-pencil v-else :click="editAsset" />
    </template>
    <template v-if="asset" #description>
      <input v-if="isEdit" v-model="asset.link" type="text" class="input__sound">
      <div class="link" v-else>
        <a v-if="asset.link" class="" :href="asset.link" target="_blank">Ссылка</a>
        <p v-else>Ссылка не указана</p>
      </div>
      <textarea v-if="isEdit" v-model="asset.description" class="description textarea" />
      <div v-else class="description">
        {{ asset.description || 'Описание не задано' }}
      </div>
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { IAsset } from '@/interfaces/asset'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QueryAssets from '@/queries/asset'

export default {
  name: 'AssetPage',
  components: {
    IconSave,
    IconPencil,
    PageLayout
  },
  setup () {
    const asset = ref<IAsset | null>(null)
    const isEdit = ref<Boolean>(false)
    const router = useRouter()
    const route = useRoute()
    const assetId = route.params.assetId

    const image = computed(() => asset?.value?.imagePath ? process.env.VUE_APP_API_URL + asset.value?.imagePath : '')
    const editAsset = () => {
      isEdit.value = true
    }

    const uploadFile = async (formData: FormData) => {
      if (!asset.value) return null
      const response = await fetch(`${process.env.VUE_APP_API_URL}/assets/${asset.value.id}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      asset.value.imagePath = data.path
    }

    const getAsset = async () => {
      asset.value = await QueryAssets.$get(+assetId)
    }

    const removeAsset = async () => {
      await QueryAssets.$delete(+assetId)
      router.push({ name: 'worlds' })
    }
    const updateAsset = async () => {
      if (!asset.value) return null
      await QueryAssets.$patch(+assetId, {
        link: asset.value.link,
        description: asset.value.description,
        name: asset.value.name
      })
      isEdit.value = false
    }

    onMounted(() => {
      getAsset()
    })
    return {
      asset,
      image,
      isEdit,
      removeAsset,
      editAsset,
      updateAsset,
      uploadFile
    }
  }
}
</script>
<style lang="scss">
  .link {
    display: flex;
    width: 100%;
    & a {
      padding: 16px 12px;
      display: flex;
      width: calc(100% - 24px);
      cursor: pointer;
      &:hover {
        background: #303841;
        color: #fff;
      }
    }
  }
</style>
