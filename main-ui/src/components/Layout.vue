<!--
 * @Author: E-Dreamer
 * @Date: 2024-12-09 15:34:14
 * @LastEditTime: 2024-12-10 17:23:13
 * @LastEditors: E-Dreamer
 * @Description: 
-->
<template>
  <div class='Layout'>
    <div class='header'>
      <div class='listItem' v-for='(item,index) in list' :key='index' @click='pathClick(item)'>{{item.label}}</div>
    </div>
    <div class='container'>
      <router-view/>
      <div v-for='(item,index) in microApps' :key='index' class='subApplications' :id='getId(item.container)' v-show="$route.path.startsWith(item.activeRule)" ></div>
    </div>
  </div>
</template>

<script>
import {microApps} from '@/microApp'
  export default {
    data(){
      return {
        microApps,
        list:[
          {
            label:'home',
            path:'/home'
          },
          {
            label:'about',
            path:'/child/about'
          }
        ]
      }
    },
    methods:{
      pathClick(item){
        // history.pushState(null, item.label, item.path)
        this.$router.push({path:item.path})
        // console.log(this.$route.path,'$route.path')
      },
      getId(id){
        return id.substring(1)
      },
    }
  }
</script>

<style scoped>
.Layout {
  width:100%;
  height:100%;
  display:flex;
  flex-direction:column;
}
.header {
  width:100%;
  height:50px;
  background:pink;
  display:flex;
  align-items:center;
}
.listItem {
  margin-right:10px;
  cursor:pointer;
}
.container {
  height:0;
  flex:1;
  background:#f2f2f2;
}
.subApplications {
  height:100%;
  width: 100%;
  position:relative;
}
</style>