import '@/public-path'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.config.productionTip = false
import { routes } from '@/router'
const {name } = require('/package.json')
console.log(name,'name0------')
// import {store} from '@/store'
let instance = null
function render(props = {}) {
  const { container, actions } = props
  console.log(props, 'props')
  // let base = `${process.env.BASE_URL}`
  // let routes = []
  if (window.__POWERED_BY_QIANKUN__) {
    Vue.prototype.$parentRouter = actions.router
    Vue.prototype.$store = Vue.observable(actions.store)
    // commonStore = Vuex.util.extend({},actions.store,store);
    // commonStore = Vuex.mergeStore(actions.store,store);
    // console.log(actions.store.registerModule('child',store))
    // console.log(commonStore, 'commonStore')
    // routes = getRoutes(actions.store)
    // store.registerModule('',actions.store);
  }
  Vue.use(VueRouter)
  let router = new VueRouter({
    // base: window.__POWERED_BY_QIANKUN__ ? '/child/' : '/',
    base:name,
    mode: 'history',
    routes,
  })

  instance = new Vue({
    router,
    // store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app')
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}

export async function update() {
  console.log('child 子应用更新')
}
