<template>
    <div class="topNav">

        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <div v-if="userInfo.isAdmin==0">
                <div class="menuItem" v-for="(item,index) in menu" :key="index">
                        <el-menu-item :index="item.id" v-if="!item.children&&item.isAdmin==userInfo.isAdmin">{{item.content}}</el-menu-item>
                        <el-submenu :index="item.id" v-if="item.children">
                            <template slot="title">{{item.content}}</template>
                                <el-menu-item :index="subitem.id" v-for="(subitem,subindex) in item.children" :key="subindex">{{subitem.content}}</el-menu-item>
                        </el-submenu>
                </div>
            </div>
            <div v-if="userInfo.isAdmin==1">
                <div class="menuItem" v-for="(item,index) in menu" :key="index">
                        <el-menu-item :index="item.id" v-if="!item.children">{{item.content}}</el-menu-item>
                        <el-submenu :index="item.id" v-if="item.children">
                            <template slot="title">{{item.content}}</template>
                                <el-menu-item :index="subitem.id" v-for="(subitem,subindex) in item.children" :key="subindex">{{subitem.content}}</el-menu-item>
                        </el-submenu>
                </div>
            </div>
            

        </el-menu>

        <div class="info">
            <div class="name">你好，{{userInfo.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'topNav',
    data(){
        return{
            activeIndex2: '1',
            menu:[
                {'id':'1',content:'主页',isAdmin:0,url:'/'},
                {'id':'2',content:'养殖池塘列表',isAdmin:0,url:'/ponds/all'},
                {'id':'3',content:'养殖户管理',isAdmin:0,url:'/owner/all'},
                {'id':'4',content:'养殖品种管理',isAdmin:0,children:[
                    {'id':'4-1',content:'全部养殖品种列表',isAdmin:0,url:'/products/all'},
                    {'id':'4-2',content:'添加/编辑养殖品种',isAdmin:0,url:'/products/add'},
                ]},
                {'id':'5',content:'统计数据',isAdmin:0,children:[
                    {'id':'5-1',content:'养殖池塘类型统计',isAdmin:0,url:'/statistic/pondsType'},
                    {'id':'5-2',content:'养殖品种面积与产量的统计',isAdmin:0,url:'/statistic/productsAO'},
                    {'id':'5-3',content:'全镇养殖情况统计',isAdmin:0,url:'/statistic/townStatus'},
                    {'id':'5-4',content:'养殖人员随机采样',isAdmin:0,url:'/statistic/randomOwner'},
                ]},
                {'id':'6',content:'账户管理',isAdmin:0,url:'/account'},
                {'id':'7',content:'日志&审核',isAdmin:1,url:'/dialog'},
                {'id':'8',content:'信息交流',isAdmin:0,url:'/discussion'},
                {'id':'9',content:'退出登录',isAdmin:0,url:'/login'},

            ],
            userInfo:{}
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
            if(keyPath.length==1){
                //没有子项的
                console.log(this.menu[key-1].url);
                if(this.menu[key-1].url=='/login'){
                    localStorage.removeItem('jwtToken')
                }
                this.$router.push(this.menu[key-1].url)
            }else{
                console.log(this.menu[keyPath[0]-1].children[key.slice(-1)-1].url);

                this.$router.push(this.menu[keyPath[0]-1].children[key.slice(-1)-1].url)

            }
        },
        getUser(){
            this.$axios({
                url:'/api/user/user',
                method:'GET'
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.userInfo=res.data.data.data
                }
                
            })
        },
    },
    created(){
        this.getUser()
    }
}
</script>

<style lang="less" scoped>
    .el-menu{
        position:relative;
        min-width: 900px;
        .menuItem{
            float:left;

        }
    }
    ::v-deep .el-submenu__icon-arrow{
        right:5px!important;
    }

    .info{
        
        position:absolute;
        top:0;
        right:20px;
        width: 200px;
        height: 56px;
        background-color: rgb(84, 92, 100);
        .name{
            width: 100%;
            height: 100%;
            color: #fff;
            line-height: 56px;
        }

    }
</style>