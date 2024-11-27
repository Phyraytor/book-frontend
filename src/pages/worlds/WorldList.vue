<template>
  <PageLayout>
    <template #header>
      <h1 class="title">Список миров</h1>
      <router-link to="/articles">Статьи</router-link>
      <icon-plus :click="createWorld" />
    </template>
    <template #description>
      <div class="items">
        <ul class="items-list">
          <li
            v-for="(world, index) in worlds"
            class="items-list__item"
            :key="world.id"
          >
            <router-link class="items-list__link" :to="`/worlds/${world.id}`">
              <span class="items-index">{{ index + 1 }}</span>
              <span class="items-text">{{ world.name }}</span>
              <div class="buttons">
                <icon-mobile v-if="world.isMobile" :click="createWorld" />
                <icon-online v-if="world.isOnline" :click="createWorld" />
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import IconOnline from '@/components/assets/svg/IconOnline.vue'
import IconMobile from '@/components/assets/svg/IconMobile.vue'
import QueryWorlds from '@/queries/world'
import PageLayout from '@/layouts/PageLayout.vue'
import { useRouter } from 'vue-router/dist/vue-router'
import { IWorld } from '@/interfaces/world'
export default {
  name: 'WorldList',
  components: { IconPlus, IconOnline, IconMobile, PageLayout },
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
<style>
</style>
