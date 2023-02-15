<template>
    <div class="addProducts">
        
        <!-- card -->
        <el-card>

            <!-- form -->
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="品种名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="所属种类">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>

                <el-form-item label="描述">
                    <el-input type="textarea" autosize v-model="form.description"></el-input>
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

                <el-form-item label="养殖方法">
                    <el-input v-model="form.breedMethod"></el-input>
                </el-form-item>
                <el-form-item label="养殖技术">
                    <el-input type="textarea" autosize v-model="form.breedTech"></el-input>
                </el-form-item>

                <el-form-item label="病害">
                    <el-input type="textarea" autosize v-model="form.diseases"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button v-if="ID" type="primary" @click='updateProducts'>保存</el-button>
                    <el-button v-else type="primary" @click="addProducts">新增</el-button>

                    <el-button @click="goBack">取消</el-button>
                </el-form-item>

            </el-form>
        </el-card>




    </div>
</template>

<script>
import random from '../../api/random'
export default {
    name:'addProducts',
    data() {
        return {
            imageName:'',
            form: {
                name: '',
                type:'',
                description:'',
                imgUrl:'',
                breedMethod:'',
                breedTech:'',
                diseases:'',
            },

        };
    },
    methods: {

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
                url:'/api/products/upload',
                method:'POST',
                headers:{"Content-Type":"multipart/form-data"},
                data:formData
            }).then(res=>{
                console.log(res.data.data.imgUrl);
                this.form.imgUrl='http://localhost:3000'+res.data.data.imgUrl
            })
        },
        //上传水产信息
        addProducts(){
            let data=this.qs.stringify(this.form)
            this.$axios({
                url:'/api/products/add',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    return this.$message.success(res.data.data.msg);
                }
            })
        },
        //通过id获取水产信息
        getProducts(id){
            this.$axios({
                method:"GET",
                url:`/api/products/get?id=${id}`,
            }).then(res=>{
                console.log(res.data.data);
                let data=res.data.data.data

                this.form=data
            })
        },
        //获取所有水产信息
        getAllProducts(){
            this.$axios({
                method:"GET",
                url:`/api/products/getAll`,
            }).then(res=>{
                console.log(res.data.data);

            })
        },
        //根据id修改水产品
        updateProducts(){
            let data=this.qs.stringify(this.form)
            this.$axios({
                url:'/api/products/update',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==401)return
                if(res.data.status!==200){
                    return this.$message.error(res.data.data.msg);
                }else{
                    
                }
            })
        },
        goBack(){
            this.$router.push('/products/all')
        },




    },
    mounted(){
        if(this.ID==undefined){
            //添加
        }else{
            this.getProducts(this.ID)
        }
        
    },
    computed:{
        ID(){
            return this.$route.query.id
        }
    }

}
</script>

<style scoped lang="less">
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .addProducts{
        width: 100%;
        height: 100%;

        .el-card{
            width: 100%;
            height: 100%;
        }
    }

    
</style>