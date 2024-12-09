import router from '@/router';
import store from '@/store';
import {mountMicroApp} from '@/microApp'

router.beforeEach((to,from,next)=>{
  console.log(to,'进来？？？？')
  mountMicroApp(to.path,router,store)
  next();
})

router.afterEach((to,from)=>{

})