<template>
  <div>
    这是子应用的about页面
    <div class='custom_title'>这是公共的css</div>
    <router-link to="/slider">slider</router-link> |
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
    },
  }
</script>

<style scoped>

</style>