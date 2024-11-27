<template>
  <PageLayout>
    <template #header>
      <h1 class="title">Список статей</h1>
      <icon-plus :click="createArticle" />
    </template>
    <template #description>
      <numbered-list
        :items="articles"
        :getLink="(articleId) => `/articles/${articleId}`"
        fieldName="title"
      />
    </template>
  </PageLayout>
</template>
<script lang="ts">
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QueryArticles from '@/queries/article'
import NumberedList from '@/components/UI/NumberedList.vue'
import { IArticle } from '@/interfaces/article'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'

export default {
  name: 'ArticleList',
  components: { IconPlus, PageLayout, NumberedList },
  setup () {
    const router = useRouter()
    const articles = ref<IArticle[]>([])
    const getArticles = async () => {
      articles.value = await QueryArticles.$getAll()
    }

    const createArticle = async () => {
      const article = await QueryArticles.$post({
        title: '',
        description: ''
      })
      router.push({ name: 'article-page', params: { articleId: article.id } })
    }

    onMounted(() => {
      getArticles()
    })

    return {
      articles,
      createArticle
    }
  }
}
</script>
<style lang="scss">
</style>
