<template>
  <div>
    这是子应用的about页面
    <div class='custom_title'>这是公共的css</div>
    <!-- <router-link to="/slider">slider</router-link> | -->
     <div @click="$router.push({path:'/slider'})">slider</div>
     <div @click="$parentRouter.push('/home')">回到主应用的home页面</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        msg:''
      }
    },
    mounted() {
      console.log(this.$store,'----')
      console.log(this.$route.query)
    },
  }
</script>

<style scoped>

</style>