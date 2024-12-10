import { loadMicroApp } from 'qiankun'
// import utils from '@/utils/util'
const baseUrl = 'localhost'
function genActiveRule(routerPrefix) {
  return (location) => location.pathname.startsWith(routerPrefix)
}
const microApps = [
  {
    name: 'child',
    entry: `//${baseUrl}:8001/child/`,
    container: '#subApplication',
    activeRule: '/child',
  },
]
// 已激活的实例
const activeApps = {}
// 挂载app的方法
const mountMicroApp = (path, router, store) => {
  console.log(path,'path')
  const app = microApps.find((item) => path.startsWith(item.activeRule))
  if (app) {
    app.props = {
      actions: { router, store },
      // utils
    }
    const instance = activeApps[app.activeRule]
    if (instance) {
      instance.update()
    } else {
      activeApps[app.activeRule] = loadMicroApp({ ...app }) // 手动加载子应用
      console.log('进来加载子应用')
    }
  }
}
// 卸载app的方法
const unmountMicroApps = (multipleTabsList) => {
  for (const key in activeApps) {
    const isExist = multipleTabsList.some(
      (tab) => tab.url && tab.url.startsWith(key)
    )
    if (!isExist) {
      activeApps[key].unmount() // 手动卸载子应用
      delete activeApps[key]
    }
  }
}

export { mountMicroApp, unmountMicroApps, microApps }
