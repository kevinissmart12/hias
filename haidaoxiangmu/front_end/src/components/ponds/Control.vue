<template>
    <div class="control">
        <!-- 表 -->

        <!-- <el-form ref="form" :model="form" label-width="80px" label-position="left" size="mini">

            <el-form-item :label="item.label" v-for='(item,index) in formLabel' :key="index">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form> -->

        

    </div>
</template>

<script>
export default {
    name:'Control',
    data() {
        return {
            form: {
                name: '',
            },
            formLabel:[
                {'id':1,'label':'区块编号'},
                {'id':2,'label':'养殖人员'},
                {'id':3,'label':'养殖品种'},
                {'id':4,'label':'所在镇'},
                {'id':5,'label':'所在村'},
                {'id':6,'label':'经度'},
                {'id':7,'label':'纬度'},
                {'id':8,'label':'池塘面积'},
                {'id':9,'label':'估算面积'},
                {'id':10,'label':'养殖方式'},
                {'id':11,'label':'备注'},
            ],
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        }
    }
    
}
</script>

<style lang='less' scoped>

</style>