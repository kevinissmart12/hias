<template>
    <div class="account">
        <el-card class="box-card">

            <div slot="header" class="clearfix">
                <span>{{userInfo.isAdmin==1?"管理员":"普通用户"}}</span>
                <el-button @click="formDisableFn" style="float: right; padding: 3px 0" type="text">{{formDisable?"更改信息":"取消"}}</el-button>
            </div>

            <el-form ref="form" :model="userInfo" label-width="80px" :disabled="formDisable">
                <el-form-item label="名称">
                    <el-input  v-model="userInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="联系号码">
                    <el-input v-model="userInfo.mobile"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :before-upload='beforeUpload'
                    >
                        <img v-if="userInfo.imgUrl" :src="userInfo.imgUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="userInfo.sex" placeholder="请选择" clearable>
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input v-model="userInfo.department"></el-input>
                </el-form-item>
                <el-form-item label="出生年月">
                    <el-date-picker
                        v-model="userInfo.birthday"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>


                <el-form-item v-if="formDisable==false">
                    <el-button @click="save" type="primary">保存</el-button>
                    <el-button @click="formDisableFn">取消</el-button>
                </el-form-item>


                </el-form>

        </el-card>
    </div>
</template>

<script>
import random from '../api/random'

export default {
    name:'account',
    data(){
        return{
            userInfo:{},
            imageName:'',
            formDisable:true,
        }
    },
    methods:{
        getUser(){
            this.$axios({
                url:'/api/user/user',
                method:'GET'
            }).then(res=>{
                console.log(res.data.data);
                if(res.data.status==401)return
                if(res.data.status!==200){
                    this.$message.error(res.data.data.msg)
                }
                this.userInfo=res.data.data.data
            })
        },
        beforeUpload(file) {
            this.upload(file)

            return false
        },
        //上传图片，用form-data
        upload(file){
            console.log(file);
            let type=file.name.replace(/.+\./, ".")
            this.imageName=random.randomImageName(6)+type

            const formData=new FormData()
            formData.append('file',file)
            formData.append('name',this.imageName)

            this.$axios({
                url:'/api/user/upload',
                method:'POST',
                headers:{"Content-Type":"multipart/form-data"},
                data:formData
            }).then(res=>{
                console.log(res.data.data.imgUrl);
                this.userInfo.imgUrl='http://localhost:3000'+res.data.data.imgUrl
            })
        },
        formDisableFn(){
            this.formDisable=!this.formDisable
        },
        save(){
            //需要对用户名进行判断
            if(this.userInfo.name==''){
                return this.$message.error('名称不为空')
            }
            if(this.userInfo.mobile==''){
                return this.$message.error('电话不为空')
            }
            if(this.userInfo.sex==''){
                return this.$message.error('请选择性别')
            }
            if(this.userInfo.department==''){
                return this.$message.error('请输入部门')
            }
            if(this.userInfo.birthday==''||this.userInfo.birthday==null){
                return this.$message.error('请选择出生年月')
            }

            let data=this.qs.stringify(this.userInfo)

            this.$axios({
                url:'/api/user/changeDetails',
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res);
                if(res.data.status==200){
                    this.$message.success('修改成功');
                    this.formDisableFn()
                }
            })

        }
        
    },
    created(){
        this.getUser()
    }
}
</script>

<style lang="less" scoped>
    .account{
        width: 100%;
        height: 100%;
    }

    .el-card{
        width: 50%;
        height: 99%;
        margin-left:25%;
    }

        .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }
    .avatar {
        width: 78px;
        height: 78px;
        display: block;
    }
</style>