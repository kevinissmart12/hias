<template>
    <div class="container">
        
        <!-- bg -->
        <div class="bg"></div>

        <div class="register">
            <!-- header -->
            <div class="header">
                <p>海岛健康养殖信息服务系统</p>
            </div>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model.trim="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model.trim="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="身份">
                    <el-select v-model="ruleForm.isAdmin" placeholder="身份">
                    <el-option label="用户" value="0"></el-option>
                    <el-option label="管理员" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <div class="button">
                    <el-button type="warning" @click="register">注册</el-button>
                </div>

            </el-form>
        </div>

    </div>
</template>

<script>
export default {
    name:'register',
    data(){
        return{
            ruleForm: {
                name:'',
                password:'',
                isAdmin:'',
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        register(){
            //如果name，password为空
            if(this.ruleForm.name==''||this.ruleForm.password==''||this.ruleForm.isAdmin==''){
                return this.$message.error('账号、密码等不为空');
            }
            let data=this.qs.stringify(this.ruleForm)

            this.$axios({
                url:'/api/user/register',
                method:"POST",
                data:data
            }).then(res=>{

                if(res.data.status!==200){
                    return this.$message.error(res.data.data.msg);
                }else{
                    this.$router.push('/login')
                    this.$message.success(res.data.data.msg);
                }

            })
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height:100%;
        position:relative;

        .bg{
            width: 100%;
            height: 100%;
            background: url('../assets/images/bg.jpg') no-repeat;
            background-size: cover;
            filter:blur(10px);
        }
    }
    .register{
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        
        .header{
            text-align: left;
            font-size:28px;
            padding:15px 0 15px 15px;
            color:#fff;
            background-color: rgb(100, 156, 254);
        }

        .el-form{
            position:relative;
            width: 450px;
            background-color: rgba(255,255,255,0.9);
            padding:20px 0;

            .el-input{
                width: 300px;
            }
            .button{
                margin-left:100px;
            }

        }
        
    }

</style>