import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLayout from '@/components/UserLayout'
Vue.use(VueRouter)

const routes = [
  {
    path: '/slairs',
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
    path:"*",
    redirect:'/404',
    hidden:true
  },
  {
    path:'/404',
    name:'404',
    component:()=>import('@/views/404'),
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
