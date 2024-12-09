<template>
  <div>这是主应用 home页面
    <div class='custom_title'>这是公共的css</div>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';
export default {
  components:{HelloWorld},
  data () {
    return {}
  }
}
</script>
<style scoped></style>