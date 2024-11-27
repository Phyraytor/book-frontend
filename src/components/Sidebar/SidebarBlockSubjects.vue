<template>
  <sidebar-block
    title="Предметы"
    type="subjects"
    :create="createSubject"
    :items="subjects"
  />
</template>

<script lang="ts">
import SidebarBlock from '@/components/Sidebar/SidebarBlock.vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { onMounted, ref } from 'vue'
import { ISubject } from '@/interfaces/subject'
import QuerySubjects from '@/queries/subject'

export default {
  name: 'SidebarBlockSubjects',
  components: {
    SidebarBlock
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const subjects = ref<ISubject[]>([])
    const gameId = route.params.gameId
    const createSubject = async () => {
      const subject = await await QuerySubjects.$post({
        name: '',
        description: '',
        gameId
      })
      router.push({ name: 'subject-page', params: { gameId, subjectId: subject.id } })
    }

    const getSubject = async (gameId: number) => {
      subjects.value = await QuerySubjects.$getAll({ gameId })
    }

    onMounted(() => {
      getSubject(+gameId)
    })

    return {
      createSubject,
      subjects
    }
  }
}
</script>

<style scoped>

</style>
