<template>
    <div class="productsAO">
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
import Side from './Products_Area_Output/Side.vue'
import Main from './Products_Area_Output/Main.vue'
export default {
    name:'productsAO',
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