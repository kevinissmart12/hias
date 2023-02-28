<template>
    <div class="index">
        <el-container>
            <el-aside width="350px" style="padding:20px;">
                <Control></Control>
            </el-aside>
            <el-main>
                <!-- map -->
                <Map></Map>

            </el-main>
        </el-container>

    </div>
</template>

<script>
import Map from '../components/ponds/AddPonds/AddMap_1.vue'
import Control from '../components/ponds/AddPonds/AddControl_1.vue'
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