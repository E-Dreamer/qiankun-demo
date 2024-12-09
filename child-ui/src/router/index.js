export const routes = [
  {
    path:'/',
    name:'home',
    redirect:'/about',
  },
  {
    path:'/about',
    name:'about',
    component:()=>import('@/views/about.vue')
  },
  {
    path:'/slider',
    name:'slider',
    component:()=>import('@/views/slider.vue')
  }
]
