<template>
    <div class="townStatus">
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
import Side from './TownStatus/Side.vue'
import Main from './TownStatus/Main.vue'
export default {
    name:'townStatus',
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