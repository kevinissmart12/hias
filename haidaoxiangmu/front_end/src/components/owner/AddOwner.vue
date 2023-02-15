<template>
    <div class="addOwner">

        <el-container>
            <el-header class="head">{{'添加'+discriminator+'养殖'}}</el-header>
            <el-container>
                <el-main style="padding:0;">
                    
                    <el-form label-position="left" :inline="true" :model="form" label-width="100px">

                        <el-form-item label="个人/企业">
                            <el-radio-group v-model="form.discriminator">
                            <el-radio label="个人"></el-radio>
                            <el-radio label="企业"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item title="个人信息" name="1">
                                <el-form-item label="名称/法人" >
                                    <el-input class="short" v-model="form.name"></el-input>
                                </el-form-item>

                                <el-form-item :label="form.discriminator=='个人'?'手机号码':'联系电话'">
                                    <el-input class="short" v-model="form.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="家庭住址">
                                    <el-input class="short" v-model="form.address"></el-input>
                                </el-form-item>
                                <el-form-item label="所在镇">
                                    <el-input class="short" v-model="form.town"></el-input>
                                </el-form-item>
                                <el-form-item label="所在村">
                                    <el-input class="short" v-model="form.village"></el-input>
                                </el-form-item>

                                <el-form-item label="出生年月">
                                    <el-date-picker
                                        class="short"
                                        v-model="form.birthday"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>

                                <el-form-item label="性别">
                                    <el-radio-group class="short" v-model="form.sex">
                                        <el-radio label="男"></el-radio>
                                        <el-radio label="女"></el-radio>
                                    </el-radio-group>
                                </el-form-item>

                                <el-form-item label="文化程度">
                                    <el-select v-model="form.educationLevel" placeholder="请选择" class="short">
                                    <el-option label="小学" value="小学"></el-option>
                                    <el-option label="初中" value="初中"></el-option>
                                    <el-option label="高中" value="高中"></el-option>
                                    <el-option label="大学" value="大学"></el-option>
                                    <el-option label="研究生" value="研究生"></el-option>
                                    <el-option label="博士" value="博士"></el-option>

                                    </el-select>
                                </el-form-item>
                                
                                <el-form-item label="组织机构代码">
                                    <el-input class="short" v-model="form.departmentId"></el-input>
                                </el-form-item>
                                <el-form-item label="从业时间">
                                    <el-input class="short" v-model="form.engagedTime"></el-input>
                                </el-form-item>
                                <el-form-item label="农民头衔">
                                    <el-input class="short" v-model="form.farmerTitle"></el-input>
                                </el-form-item>
                                <el-form-item label="信用等级">
                                    <el-select v-model="form.creditLevel" placeholder="请选择" class="short">
                                    <el-option label="A" value="A"></el-option>
                                    <el-option label="B" value="B"></el-option>
                                    <el-option label="C" value="C"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="图片">
                                    <el-upload
                                        class="avatar-uploader"
                                        action="#"
                                        :show-file-list="false"
                                        :before-upload='beforeUpload'
                                    >
                                        <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>

                                <el-form-item style="display:block;"  label="备注">
                                    <el-input style="width:510px" autosize type="textarea" v-model="form.comment"></el-input>
                                </el-form-item>

                            </el-collapse-item>

                            <el-collapse-item v-if="form.discriminator=='企业'" title="企业信息" name="2">
                                <!-- 和企业有关的 -->
                                <el-form-item v-if="form.discriminator=='企业'" label="公司">
                                    <el-input class="short" v-model="form.companyName"></el-input>
                                </el-form-item>
                                <el-form-item v-if="form.discriminator=='企业'" label="成立时间">
                                    <el-date-picker
                                        class="short"
                                        v-model="form.establishedTime"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item v-if="form.discriminator=='企业'" label="固定资产">
                                    <el-input class="short" v-model="form.fixedAssets"></el-input>
                                </el-form-item>
                                <el-form-item v-if="form.discriminator=='企业'" label="经营内容">
                                    <el-input class="short" v-model="form.businessContents"></el-input>
                                </el-form-item>
                                <el-form-item v-if="form.discriminator=='企业'" label="无公害基地">
                                    <el-input class="short" v-model="form.isBaseOfEmployee"></el-input>
                                </el-form-item>
                                <el-form-item v-if="form.discriminator=='企业'" label="员工人数">
                                    <el-input class="short" v-model="form.numberOfEmployee"></el-input>
                                </el-form-item>
                                <el-form-item v-if="form.discriminator=='企业'" label="特色产品">
                                    <el-input class="short" v-model="form.featuredProducts"></el-input>
                                </el-form-item>

                            </el-collapse-item>
                        </el-collapse>

                        <el-form-item style="display:block;text-align:center">
                            <el-button type="primary" @click="add">添加</el-button>
                        </el-form-item>

                    </el-form>

                </el-main>
            </el-container>
        </el-container>



    </div>
</template>

<script>
import random from '../../api/random'
export default {
    name:'addOwner',
    data(){
        return{
            form: {
                discriminator:'个人',
                id:'',
                name: '',
                mobile:'',
                birthday:'',
                sex:'',
                imgUrl:'',
                address:'',
                town:'',
                village:'',
                engagedTime:'',
                educationLevel:'',
                farmerTitle:'',
                departmentId:'',
                companyName:'',
                establishedTime:'',
                fixedAssets:'',
                businessContents:'',
                isBaseOfEmployee:'',
                numberOfEmployee:'',
                featuredProducts:'',
                creditLevel:'',
                comment:'',
                // checkStatus:'',
            },
            activeName:'1',
            imageName:'',
        }
    },
    computed:{
        discriminator(){
            return this.form.discriminator
        }
    },
    watch:{
        discriminator(n,o){
            console.log(n);
        }
    },
    methods:{
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
                url:'/api/owner/upload',
                method:'POST',
                headers:{"Content-Type":"multipart/form-data"},
                data:formData
            }).then(res=>{
                console.log(res.data.data.imgUrl);
                this.form.imgUrl='http://localhost:3000'+res.data.data.imgUrl
            })
        },
        add(){
            let data=this.qs.stringify(this.form)

            this.$axios({
                url:'/api/owner/add',
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res);
                if(res.data.status==401)return
                if(res.data.status!==200){
                    return this.$message.error(res.data.data.msg);
                }else{
                    this.$message.success('添加成功');
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    .addOwner{
        width: 100%;
        height: 100%;
        background-color: #fff;
        padding:20px;
        box-sizing: border-box;
    }

    .head{
        margin-bottom:20px;
        font-size:24px;
        font-weight: 900;
        text-align: center;
    }

    .short{
        width: 200px;
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