<template>
    <div class="container">

        <!-- 模糊背景 -->
        <div class="bg"></div>

        <div class="login">
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

                <div class="button">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="warning" @click="register">注册</el-button>
                </div>

            </el-form>
        </div>



        <!-- <input class="name" type="text" v-model=name>
        <input class="password" type="password" v-model=password>
        <button @click="login">登录</button> -->
    </div>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            ruleForm: {
                name:'',
                password:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                ],
            }
        }
    },
    methods:{
        login(){

            //如果name，password为空
            if(this.ruleForm.name==''||this.ruleForm.password==''){
                return this.$message.error('账号或密码不为空');
            }

            let data=this.qs.stringify(this.ruleForm)

            this.$axios.post('/api/user/login',data).then(res=>{

                if(res.data.status!==200){
                    return this.$message.error(res.data.data.msg);
                }else{
                    //jwt存储
                    localStorage.setItem('jwtToken',res.data.data.token)
                    this.$router.push('/')
                    this.$message.success(res.data.data.msg);
                }
                
            })
        },
        register(){
            //跳转到注册
            this.$router.push('/register')
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        position:relative;
        width: 100%;
        height: 100%;


        .bg{
            width: 100%;
            height: 100%;
            background: url('../assets/images/bg.jpg') no-repeat;
            background-size: cover;
            filter:blur(10px);
        }
    }

    .login{
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