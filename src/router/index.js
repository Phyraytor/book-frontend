import { createRouter, createWebHashHistory } from 'vue-router'
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

const routes = [
  {
    path: '/',
    name: 'home',
    component: WorldList
  },
  {
    path: '/worlds/:worldId/games/:id',
    name: 'games-page',
    component: GamePage
  },
  {
    path: '/games/:id/languages',
    name: 'languages-page',
    component: LanguagePage
  },
  {
    path: '/games/:gameId/steps/:stepId/messages/:id',
    name: 'message-page',
    component: MessagePage
  },
  {
    path: '/worlds/:id',
    name: 'world-page',
    component: WorldPage
  },
  {
    path: '/games/:gameId/steps/:id',
    name: 'step-page',
    component: StepPage
  },
  {
    path: '/games/:gameId/subjects/:id',
    name: 'subject-page',
    component: SubjectPage
  },
  {
    path: '/games/:gameId/sounds',
    name: 'sounds-list',
    component: SoundsList
  },
  {
    path: '/games/:gameId/sounds/:id',
    name: 'sound-page',
    component: SoundPage
  },
  {
    path: '/games/:gameId/persons/:id',
    name: 'person-page',
    component: PersonPage
  },
  {
    path: '/games/:gameId/persons/:personId/spells/:id',
    name: 'spell-page',
    component: SpellPage
  },
  {
    path: '/games/:gameId/enemies/:enemyId/spells/:id',
    name: 'spell-enemy-page',
    component: SpellPage
  },
  {
    path: '/games/:gameId/enemies/:id',
    name: 'enemy-page',
    component: EnemyPage
  },
  {
    path: '/assets',
    name: 'assets',
    component: AssetList
  },
  {
    path: '/assets/:id',
    name: 'asset-page',
    component: AssetPage
  }
]
export default createRouter({
  history: createWebHashHistory(),
  routes
})
