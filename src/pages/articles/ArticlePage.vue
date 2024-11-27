<template>
  <PageLayout>
    <template v-if="article" #header>
      <input v-if="isEdit" v-model="article.title" type="text" class="input__title">
      <h1 v-else class="title">{{ article.title || 'Имя не задано' }}</h1>
      <icon-save v-if="isEdit" :click="updateArticle"/>
      <icon-pencil v-else :click="editArticle"/>
    </template>
    <template v-if="article" #description>
      <textarea v-if="isEdit" v-model="article.description" class="description textarea"/>
      <div v-else class="description">
        {{ article.description || 'Описание не задано' }}
      </div>
    </template>
  </PageLayout>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import IconSave from '@/components/assets/svg/IconSave.vue'
import IconPencil from '@/components/assets/svg/IconPencil.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QueryArticles from '@/queries/article'
import { IArticle } from '@/interfaces/article'

export default {
  name: 'ArticlePage',
  components: { IconSave, IconPencil, PageLayout },
  setup () {
    const name = ref('')
    const isEdit = ref(false)
    const article = ref<IArticle | null>(null)
    const route = useRoute()
    const articleId = route.params.articleId
    const router = useRouter()
    const editArticle = () => {
      isEdit.value = true
    }

    const getArticle = async () => {
      article.value = await QueryArticles.$get(+articleId)
    }

    const removeArticle = async () => {
      await QueryArticles.$delete(+articleId)
      router.push({ name: 'article-list' })
    }

    const updateArticle = async () => {
      if (!article.value) return null
      await QueryArticles.$patch(+articleId, {
        description: article.value.description,
        title: article.value.title
      })
      isEdit.value = false
    }

    onMounted(() => {
      getArticle()
    })

    return {
      article,
      editArticle,
      updateArticle,
      removeArticle,
      isEdit,
      name
    }
  }
}
</script>

<style scoped>
</style>
