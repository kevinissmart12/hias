<template>
    <div class="addProducts">
        
        <!-- card -->
        <el-card >
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
            </div>
            <!-- form -->
            <el-form ref="form" :model="form" label-width="80px" label-position="left">
                <div class="form_flex">
                    <div class="left">
                        <el-form-item label="品种名称" >
                            <el-input v-model.trim="form.name" style="width:400px;"></el-input>
                        </el-form-item>

                        <el-form-item label="所属种类">
                            <el-select v-model="form.type" placeholder="请选择" style="width:400px;">
                                <el-option
                                v-for="item in typeList"
                                :key="item.id"
                                :label="item.content"
                                :value="item.content">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="养殖方法" >
                            <el-select v-model="form.breedMethod" placeholder="请选择" style="width:400px;">
                                <el-option
                                v-for="item in breedMethodList"
                                :key="item.id"
                                :label="item.content"
                                :value="item.content">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="right">
                        <el-form-item label="图片" class="pic">
                            <el-upload
                                class="avatar-uploader"
                                action="#"
                                :show-file-list="false"
                                :before-upload='beforeUpload'
                            >
                                <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" style="border:1px solid rgba(0,0,0,.3);border-radius:5px">
                                <i v-else class="el-icon-plus avatar-uploader-icon" style="border:1px solid rgba(0,0,0,.3);border-radius:5px"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item label="描述">
                    <div style="border: 1px solid #ccc;">
                        <Toolbar
                            style="border-bottom: 1px solid #ccc"
                            :editor="editor_desc"
                            :defaultConfig="toolbarConfig"
                            :mode="mode"
                        />
                        <Editor
                            style="height: 400px; overflow-y: hidden;"
                            v-model="form.description"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onCreated="onCreated_desc"
                        />
                    </div>
                </el-form-item>

                <el-form-item label="养殖技术">
                    <div style="border: 1px solid #ccc;">
                        <Toolbar
                            style="border-bottom: 1px solid #ccc"
                            :editor="editor_tech"
                            :defaultConfig="toolbarConfig"
                            :mode="mode"
                        />
                        <Editor
                            style="height: 400px; overflow-y: hidden;"
                            v-model="form.breedTech"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onCreated="onCreated_tech"
                        />
                    </div>
                </el-form-item>

                <el-form-item label="病害" >
                    <div style="border: 1px solid #ccc;">
                        <Toolbar
                            style="border-bottom: 1px solid #ccc"
                            :editor="editor_dise"
                            :defaultConfig="toolbarConfig"
                            :mode="mode"
                        />
                        <Editor
                            style="height: 400px; overflow-y: hidden;"
                            v-model="form.diseases"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onCreated="onCreated_dise"
                        />
                    </div>
                </el-form-item>

                

                <el-form-item class="btn" >
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
import Product from '../../api/product'

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

            typeList:[],
            breedMethodList:[],

            //以下为富文本插件的参数
            editor_desc: null,
            editor_tech: null,
            editor_dise: null,


            html: '<p>hello</p>',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'

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
            //对未填写的内容进行判断
            if(this.form.name==''){
                return this.$message.warning('请填写品种名称');
            }
            if(this.form.type==''){
                return this.$message.warning('请选择所属种类');
            }
            if(this.form.breedMethod==''){
                return this.$message.warning('请选择养殖方法');
            }
            if(this.form.imgUrl==''){
                return this.$message.warning('请上传图片');
            }
            if(this.form.description==''){
                return this.$message.warning('请填写描述');
            }
            if(this.form.breedTech==''){
                return this.$message.warning('请填写养殖技术');
            }
            if(this.form.diseases==''){
                return this.$message.warning('请填写病害');
            }


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

        onCreated_desc(editor) {
            this.editor_desc = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        onCreated_tech(editor) {
            this.editor_tech = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        onCreated_dise(editor) {
            this.editor_dise = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },

    },
    created() {
        this.typeList=Product.type
        this.breedMethodList=Product.breedMethod
    },
    mounted(){
        if(this.ID==undefined){
            //添加
        }else{
            //查看/编辑
            this.getProducts(this.ID)
        }

        // setTimeout(() => {
        //     this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
        // }, 1500)
        
    },
    beforeDestroy() {
        const editor_desc = this.editor_desc
        const editor_tech = this.editor_tech
        const editor_dise = this.editor_dise

        if (editor_desc == null&&editor_tech==null&&editor_dise==null) return
        editor_desc.destroy() // 组件销毁时，及时销毁编辑器
        editor_tech.destroy() // 组件销毁时，及时销毁编辑器
        editor_dise.destroy() // 组件销毁时，及时销毁编辑器

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
        position: relative;
        width: 100%;
        height: 100%;
        .el-card{
            margin-left:12.5%;
            width: 75%;
            height: 100%;
            min-width:900px;

        }
    }

    .form_flex{
        display: flex;
        .right{
            margin-left:50px;
            width: 100%;
        }
    }
    .el-form{
        .btn{
            text-align: center;
        }
        ::v-deep .el-form-item__content{
            margin:0;
        }
    }

    
</style>