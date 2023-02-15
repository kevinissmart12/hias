<template>
    <div class="allPonds">
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
import Main from './Main.vue'
import Side from './Side.vue'
export default {
    name:"allPonds",
    components:{
        Main,
        Side
    }
}
</script>

<style lang="less" scoped>
    .allPonds{
        width: 100%;
        height: 100%;
    }
</style>