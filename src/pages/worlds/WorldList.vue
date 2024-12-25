<template>
  <PageLayout>
    <template #header>
      <h1 class="title">Список миров</h1>
      <router-link to="/assets">
        <icon-bag />
      </router-link>
      <router-link to="/articles">
        <icon-article />
      </router-link>
      <icon-plus :click="createWorld" />
    </template>
    <template #description>
      <numbered-list
        :items="worlds"
        :getLink="(worldId) => `/worlds/${worldId}`"
        fieldName="name"
      />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import QueryWorlds from '@/queries/world'
import PageLayout from '@/layouts/PageLayout.vue'
import NumberedList from '@/components/UI/NumberedList.vue'
import IconBag from '@/components/assets/svg/IconBag.vue'
import IconArticle from '@/components/assets/svg/IconArticle.vue'
import { useRouter } from 'vue-router/dist/vue-router'
import { IWorld } from '@/interfaces/world'

export default {
  name: 'WorldList',
  components: { IconPlus, PageLayout, NumberedList, IconArticle, IconBag },
  setup () {
    const router = useRouter()
    const worlds = ref<IWorld[]>([])
    const getWorlds = async () => {
      worlds.value = await QueryWorlds.$getAll()
    }

    const createWorld = async () => {
      const world = await QueryWorlds.$post({
        name: '',
        description: ''
      })
      router.push({ name: 'world-page', params: { worldId: world.id } })
    }

    onMounted(() => {
      getWorlds()
    })

    return {
      worlds,
      createWorld
    }
  }
}
</script>
<style lang="scss">
</style>
