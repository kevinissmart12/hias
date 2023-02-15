<template>
    <div class="dialog">
        <el-container>
            <el-aside width="350px" style="padding:20px;">
                <Side></Side>
            </el-aside>
            <el-main style="padding:20px 0 0 0">
                <Main></Main>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Side from '../components/dialog/Side.vue'
import Main from '../components/dialog/Main.vue'

export default {
    name:"Dialog",
    components:{
        Side,
        Main
    },
    data(){
        return{
            
        }
    }
}
</script>

<style lang="less" scoped>
    .dialog{
        width: 100%;
        height: 100%;
    }
</style>