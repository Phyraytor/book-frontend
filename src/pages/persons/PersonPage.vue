<template>
  <PageLayout>
    <template v-if="person" #header>
      <input v-if="isEdit" v-model="person.name" type="text" class="input__title">
      <h1 v-else class="title">{{ person.name || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updatePerson" />
      <icon-pencil v-else :click="editPerson" />
    </template>
    <template v-if="person" #sidebarLeft>
      <sidebar-block-spells :items="person.spells" />
    </template>
    <template v-if="person" #description>
      <textarea v-if="isEdit" v-model="person.description" class="description textarea" />
      <div v-else class="description">
        {{ person.description || 'Описание не задано' }}
      </div>
    </template>
  </PageLayout>
</template>
<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { IPerson } from '@/interfaces/person'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import SidebarBlockSpells from '@/components/Sidebar/SidebarBlockSpells.vue'
import QueryPersons from '@/queries/person'

export default {
  name: 'PersonPage',
  components: {
    IconSave,
    IconPencil,
    PageLayout,
    SidebarBlockSpells
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const person = ref<IPerson | null>(null)
    const isEdit = ref(false)
    const personId = route.params.personId
    const worldId = route.params.worldId
    const gameId = route.params.gameId
    const editPerson = () => {
      isEdit.value = true
    }
    const getPerson = async () => {
      person.value = await QueryPersons.$get(+personId)
    }
    const removePerson = async () => {
      await QueryPersons.$delete(+personId)
      router.push({ name: 'game-page', params: { worldId, gameId } })
    }
    const updatePerson = async () => {
      if (!person.value) return null
      await QueryPersons.$patch(+personId, {
        description: person.value.description,
        name: person.value.name
      })
      isEdit.value = false
    }

    onMounted(() => {
      getPerson()
    })
    return {
      person,
      isEdit,
      removePerson,
      editPerson,
      updatePerson
    }
  }
}
</script>
<style lang="scss">
</style>
