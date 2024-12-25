import { createRouter, createWebHistory } from 'vue-router'
import GamePage from '@/pages/games/GamePage.vue'
import StepPage from '@/pages/steps/StepPage.vue'
import PersonPage from '@/pages/persons/PersonPage.vue'
import AssetPage from '@/pages/assets/AssetPage.vue'
import EnemyPage from '@/pages/enemies/EnemyPage.vue'
import LanguagePage from '@/pages/languages/LanguagePage.vue'
import MessagePage from '@/pages/messages/MessagePage.vue'
import SubjectPage from '@/pages/subjects/SubjectPage.vue'
import SoundPage from '@/pages/sounds/SoundPage.vue'
import SoundsList from '@/pages/sounds/SoundsList.vue'
import SpellPage from '@/pages/spells/SpellPage.vue'
import WorldPage from '@/pages/worlds/WorldPage.vue'
import TaskPage from '@/pages/tasks/TaskPage.vue'
import TaskList from '@/pages/tasks/TaskList.vue'
import WorldList from '@/pages/worlds/WorldList.vue'
import ArticlePage from '@/pages/articles/ArticlePage.vue'
import ArticleList from '@/pages/articles/ArticleList.vue'
import AssetList from '@/pages/assets/AssetList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: WorldList
  },
  {
    path: '/worlds/:worldId/games/:gameId',
    name: 'games-page',
    component: GamePage
  },
  {
    path: '/articles',
    name: 'article-list',
    component: ArticleList
  },
  {
    path: '/articles/:articleId',
    name: 'article-page',
    component: ArticlePage
  },
  {
    path: '/worlds/:worldId/games/:gameId/tasks/:taskId',
    name: 'task-page',
    component: TaskPage
  },
  {
    path: '/worlds/:worldId/games/:gameId/tasks',
    name: 'tasks-list',
    component: TaskList
  },
  {
    path: '/worlds/:worldId/games/:gameId/languages',
    name: 'languages-page',
    component: LanguagePage
  },
  {
    path: '/worlds/:worldId/games/:gameId/steps/:stepId/messages/:messageId',
    name: 'message-page',
    component: MessagePage
  },
  {
    path: '/worlds/:worldId',
    name: 'world-page',
    component: WorldPage
  },
  {
    path: '/worlds/:worldId/games/:gameId/steps/:stepId',
    name: 'step-page',
    component: StepPage
  },
  {
    path: '/worlds/:worldId/games/:gameId/subjects/:subjectId',
    name: 'subject-page',
    component: SubjectPage
  },
  {
    path: '/sounds',
    name: 'sounds-list',
    component: SoundsList
  },
  {
    path: '/sounds/:soundId',
    name: 'sound-page',
    component: SoundPage
  },
  {
    path: '/worlds/:worldId/games/:gameId/persons/:personId',
    name: 'person-page',
    component: PersonPage
  },
  {
    path: '/worlds/:worldId/games/:gameId/persons/:personId/spells/:spellId',
    name: 'spell-person-page',
    component: SpellPage
  },
  {
    path: '/worlds/:worldId/games/:gameId/enemies/:enemyId/spells/:spellId',
    name: 'spell-enemy-page',
    component: SpellPage
  },
  {
    path: '/worlds/:worldId/games/:gameId/subjects/:subjectId/spells/:spellId',
    name: 'spell-subject-page',
    component: SpellPage
  },
  {
    path: '/worlds/:worldId/games/:gameId/enemies/:enemyId',
    name: 'enemy-page',
    component: EnemyPage
  },
  {
    path: '/assets',
    name: 'assets',
    component: AssetList
  },
  {
    path: '/assets/:assetId',
    name: 'asset-page',
    component: AssetPage
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
