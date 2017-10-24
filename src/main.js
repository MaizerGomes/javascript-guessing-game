// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto' // Polyfill ie11

import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import Notify from 'vue-notifyjs'

import store from './store'

import App from '@/App.vue'
import Game from '@/components/Game/Game.vue'
import Ranking from '@/components/Game/Ranking.vue'
import Menu from '@/components/Menu/Menu.vue'

Vue.use(VueRouter)
Vue.use(Notify, {
  horizontalAlign: 'right',
  verticalAlign: 'bottom'
})

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: Menu
      },
      {
        path: 'play/:game',
        component: Game
      },
      {
        path: 'ranking/:game',
        component: Ranking
      }
    ]
  }
]

const router = new VueRouter({
  routes // short for routes: routes
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')

// hide loading
document.querySelector('.loading-container').style.display = 'none'

window.vm = Vue
