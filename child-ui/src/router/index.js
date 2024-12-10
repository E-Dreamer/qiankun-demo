export const routes = [
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
