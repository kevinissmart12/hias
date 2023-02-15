<template>
  <div id="app">
    
      <el-container v-if="path!=='/login'&path!=='/register'">
            <!--导航栏nav-->
            <el-header>
              <TopNav></TopNav>
            </el-header>
            <!--根据导航栏的选择，改变路由-->
            <el-main>
              <router-view/>
            </el-main>
      </el-container>

      <router-view v-else/>

  </div>
</template>

<script>
import TopNav from './components/topNav/TopNav.vue'
export default {
  components:{
    TopNav
  },
  computed:{
    path(){
      return this.$route.path
    }
    
  }
}
</script>

<style lang="less">
  #app{
    min-width: 900px;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;

    .el-container{
      width: 100%;
      height: 100%;
    }
  }
  *{
    margin:0;
    padding:0;
  }
</style>
