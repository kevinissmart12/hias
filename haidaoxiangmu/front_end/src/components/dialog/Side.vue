<template>
    <div class="side">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>筛选</span>
            </div>
            <!-- 各个选项 -->
            <el-form ref="form" :model="form" label-width="80px">

                <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="请选择类型">
                        <el-option label="添加" value="0"></el-option>
                        <el-option label="修改" value="1"></el-option>
                        <el-option label="删除" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作对象">
                    <el-select v-model="form.op_obj" placeholder="请选择操作的对象">
                        <el-option label="池塘信息" value="0"></el-option>
                        <el-option label="拥有者信息" value="1"></el-option>
                        <el-option label="水产品信息" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="提交人">
                    <el-select v-model="form.uid" @change="selectUser" @clear="vanishUser" filterable clearable placeholder="请选择">
                        <el-option
                            v-for="item in UserData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="danger" @click="quit">去除条件</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name:"side",
    data(){
        return{
            form: {
                uid: '',
                username:'',
                type:'',
                op_obj:'',
                front:0,
                end:10,
            }
        }
    },
    methods:{
        search(){
            this.$store.commit('dialog/setCurrentPage',1)
            this.$store.commit('dialog/setSearch',true)
            this.$store.commit('dialog/setForm',this.form)
        },
        selectUser(){
            this.UserData.forEach((i,v)=>{
                if(i.id==this.form.uid){
                    this.form.username=i.name
                    this.form.uid=i.id
                }
            })
        },
        vanishUser(){
            this.form.username=''
            this.form.uid=''
        },
        quit(){
            this.form={
                uid: '',
                username:'',
                type:'',
                op_obj:'',
                front:0,
                end:10,
            }
            this.$store.commit('dialog/setCurrentPage',1)
            this.$store.commit('dialog/setSearch',false)
            this.$store.commit('dialog/setForm',this.form)
        }

    },
    computed:{
        UserData(){
            return this.$store.state.dialog.userData
        },
        CurrentPage(){
            return this.$store.state.dialog.currentPage
        },        
        Pagesize(){
            return this.$store.state.dialog.pageSize
        },
    },
    beforeDestroy() {
        this.$store.commit('dialog/setCurrentPage',1)
        this.$store.commit('dialog/setSearch',false)
        
    },
    
}
</script>

<style lang="less" scoped>
    .side{
        width: 100%;
        height: 100%;

    }
</style>