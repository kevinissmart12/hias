<template>
    <div class="randomOwner">
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
import Side from './RandomOwner/Side.vue'
import Main from './RandomOwner/Main.vue'
export default {
    name:'randomOwner',
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