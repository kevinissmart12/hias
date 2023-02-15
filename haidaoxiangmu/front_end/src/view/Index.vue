<template>
    <div class="index">
        <el-container>
            <el-aside width="250px" style="padding:20px;">
                <!-- <Control></Control> -->
            </el-aside>
            <el-main>
                <!-- map -->
                <!-- <Map></Map> -->

            </el-main>
        </el-container>

    </div>
</template>

<script>
import Map from '../components/ponds/Map.vue'
import Control from '../components/ponds/Control.vue'
export default {
    name:'Index',
    data(){
        return{

        }
    },
    methods:{

    },
    created() {

    },
    mounted(){
        
    },
    components:{
        Map,
        Control
    }
}
</script>

<style lang="less" scoped> 
    .index{
        width: 100%;
        height: 100%;

        background-color: #fff;
    }

    .el-main{
        padding:0;
    }
</style>