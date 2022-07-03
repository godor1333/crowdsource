import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const ifAuthenticated = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('user-token')
  if (token && store.state.user.isAuthenticated) {
    next()
    return
  }
  next('/main')
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '@/views/About.vue')
      },
      {
        path: '/lorem',
        name: 'Lorem',
        component: () =>
          import(/* webpackChunkName: "lorem" */ '@/views/Lorem.vue')
      },
      {
        path: '/main/work',
        name: 'MainWork',
        component: () =>
          import(/* webpackChunkName: "lorem" */ '@/views/MainWorkPage.vue'),
        beforeEnter: ifAuthenticated
      },
      {
        path: '/main',
        name: 'MainPage',
        component: () =>
          import(/* webpackChunkName: "lorem" */ '@/views/MainPage.vue')
      },
      {
        path: '/userlk',
        name: 'LkInfo',
        component: () =>
          import(/* webpackChunkName: "lorem" */ '@/views/PersonalAccount.vue'),
        beforeEnter: ifAuthenticated
      },
      {
        path: '/main/work/task',
        name: 'ViewOrderPage',
        component: () =>
          import(/* webpackChunkName: "lorem" */ '@/views/ViewOrderPage.vue'),
        beforeEnter: ifAuthenticated
      },
      {
        path: '/main/work/statistic',
        name: 'Statistic',
        component: () =>
          import(/* webpackChunkName: "lorem" */ '@/views/Statistic.vue'),
        beforeEnter: ifAuthenticated
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
