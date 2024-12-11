import router from '@/router'
import store from '@/store'
import { mountMicroApp, microApps } from '@/microApp'
router.beforeEach((to, from, next) => {
  mountMicroApp(to.path,router,store).then(res=>{
    console.log(res,'res');
    next()
  }).catch((err) => {
    console.log('err: ', err);
    next()
  })
})

router.afterEach((to, from) => {})
