<template>
    <div class="pondsType">
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
import Side from './PondsType/Side.vue'
import Main from './PondsType/Main.vue'
export default {
    name:'pondsType',
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

</style>