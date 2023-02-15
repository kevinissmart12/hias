<template>
    <div class="addPonds">
        <el-container>
            <el-aside width="350px" style="padding:20px;">
                <AddControl></AddControl>
            </el-aside>
            <el-main>
                <!-- map -->
                <AddMap></AddMap>

            </el-main>
        </el-container>
    </div>
</template>

<script>
import AddMap from './AddMap_1.vue'
import AddControl from './AddControl_1.vue'
export default {
    name:'AddPonds',
    components:{
        AddMap,
        AddControl
    },
}
</script>

<style lang="less" scoped>
    .addPonds{
        width: 100%;
        height: 100%;

    }
    .el-main{
        padding:0;
    }
</style>