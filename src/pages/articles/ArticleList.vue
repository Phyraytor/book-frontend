<template>
  <PageLayout>
    <template #header>
      <h1 class="title">Список статей</h1>
      <icon-plus :click="createArticle" />
    </template>
    <template #description>
      <div class="items">
        <ul class="items-list">
          <li
            v-for="(article, index) in articles"
            class="items-list__item"
            :key="article.id"
          >
            <router-link class="items-list__link" :to="`/articles/${article.id}`">
              <span class="items-index">{{ index + 1 }}</span>
              <span class="items-text">{{ article.title || 'Имя не задано' }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </PageLayout>
</template>
<script lang="ts">
import IconPlus from '@/components/assets/svg/IconPlus.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import QueryArticles from '@/queries/article'
import { IArticle } from '@/interfaces/article'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router/dist/vue-router'

export default {
  name: 'ArticleList',
  components: { IconPlus, PageLayout },
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
<style>
</style>
