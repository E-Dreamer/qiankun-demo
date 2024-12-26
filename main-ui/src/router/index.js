import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLayout from '@/components/UserLayout'
import {stringifyQuery,parseQuery} from '@/utils/query'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: UserLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home'),
      },
    ],
  },
  {
    path:'/child/*',
    name:"child",
    component:UserLayout
  },
  {
    path:'/404',
    name:'404',
    component:()=>import('@/views/404'),
  },
  {
    path:"*",
    redirect:'/404',
    hidden:true
  },
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  stringifyQuery,
  parseQuery,
  routes,
})

export default router
