import { createRouter, createWebHistory } from 'vue-router'
import GamePage from '@/pages/games/GamePage'
import StepPage from '@/pages/steps/StepPage'
import PersonPage from '@/pages/persons/PersonPage'
import AssetPage from '@/pages/assets/AssetPage'
import AssetList from '@/pages/assets/AssetList'
import EnemyPage from '@/pages/enemies/EnemyPage'
import LanguagePage from '@/pages/languages/LanguagePage'
import MessagePage from '@/pages/messages/MessagePage'
import SubjectPage from '@/pages/subjects/SubjectPage'
import SoundPage from '@/pages/sounds/SoundPage'
import SoundsList from '@/pages/sounds/SoundsList'
import SpellPage from '@/pages/spells/SpellPage'
import WorldList from '@/pages/worlds/WorldList'
import WorldPage from '@/pages/worlds/WorldPage'
import TaskPage from '@/pages/tasks/TaskPage'
import TaskList from '@/pages/tasks/TaskList'

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
    path: '/worlds/:worldId/games/:gameId/enemies/:enemyId',
    name: 'enemy-page',
    component: EnemyPage
  },
  {
    path: '/worlds/:worldId/assets',
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
