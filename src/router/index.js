import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Private from '@/components/Private'
import NotFound from '@/components/NotFound'

import store from '@/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/private',
      component: Private,
      beforeEnter: (to, from, next) => {
        if (store.getters.isLogged) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ],
  linkActiveClass: 'is-active'
})
