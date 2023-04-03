<template>
    <div class="main">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>池塘信息</span>
                <el-button @click='add' style="float: right; padding: 3px 0" type="text">去添加</el-button>
            </div>
            <el-table :data="tempTableData" stripe style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    v-for="(item,index) in tableItem" 
                    :key="index"
                    ref="table_column"
                >
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="120">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.checkStatus=='已审核'" @click="check(scope.row)" type="text" size="small">去查看</el-button>
                        <el-button @click="deleteSelect(scope.row)" style="color:red" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
        <!--  分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5,10]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next"
            :total="AllPondsLength">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:"main-com",
    data(){
        return{
            tableItem:[
                {'id':'1',prop:'number',label:'区块编号',width:'100'},
                {'id':'2',prop:'owner',label:'拥有者',width:'100'},
                {'id':'3',prop:'product',label:'养殖品种',width:'100'},
                {'id':'4',prop:'productOutput',label:'年产量(斤)',width:'100'},
                {'id':'5',prop:'countyContent',label:'所在区/县',width:'100'},
                {'id':'6',prop:'townContent',label:'所在镇',width:'100'}, 
                {'id':'7',prop:'villageContent',label:'所在村',width:'100'},
                {'id':'8',prop:'area',label:'面积(亩)',width:'80'},
                {'id':'9',prop:'estimateArea',label:'估算面积(亩)',width:'110'}, 
                {'id':'10',prop:'pondsType',label:'养殖类型',width:'100'}, 
                {'id':'11',prop:'lng',label:'经度',width:'150'},
                {'id':'12',prop:'lat',label:'纬度',width:'150'},
                {'id':'13',prop:'checkStatus',label:'审核状态',width:'100'},
            ],
            tempTableData:[],
            currentPage:1,
            pagesize:10,
        }
    },
    methods:{
        //获取池塘
        getPonds(){
            this.$axios({
                url:'/api/ponds/getAll',
                methods:'GET'
            }).then(res=>{
                if(res.data.status==200){
                    
                    this.$store.commit('ponds/setAllPonds',res.data.data.data)
                    if(this.$route.query.id){
                        this.$store.commit('ponds/changeToFirst',this.$route.query.id)
                        // console.log(this.$refs.table_column[0]);
                    }

                    this.tempTableData=this.AllPonds.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)

                    this.getAllTown()
                    this.getALlVillage()


                }
            })
        },
        //获取所有的镇和村
        getAllTown(){
            if(localStorage.getItem('town')){
                this.$store.commit('ponds/setTownData')
            }else{
                this.$axios({
                    url:'/api/area/getAllTown',
                    method:'GET',
                }).then(res=>{
                    if(res.data.status==200){
                        //赋值  
                        this.$store.commit('ponds/setTownData',res.data.data.data)
                    }
                })
            }
            
        },
        getALlVillage(){
            if(localStorage.getItem('village')){
                this.$store.commit('ponds/setVillageData')
            }else{
                this.$axios({
                    url:'/api/area/getAllVillage',
                    method:'GET',
                }).then(res=>{
                    if(res.data.status==200){
                        //赋值  
                        this.$store.commit('ponds/setVillageData',res.data.data.data)
                    }
                })
            }

        },
        handleSizeChange (size) {
            this.pagesize = size;
            this.tempTableData=this.AllPonds.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            this.tempTableData=this.AllPonds.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        check(item){
            this.$router.push({
                path:'/',
                query:{
                    id:item.id,
                }
            })
        },
        deleteSelect(item){
            //获取是否为管理员
            
            let data=this.qs.stringify(item)
            // console.log(data);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((e)=>{
                //前端删除
                //把store里的数据删除
                if(this.IsAdmin==1){
                    this.$store.commit('ponds/deletePonds',item.id)
                    this.tempTableData=this.AllPonds.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
                }
                //后端
                this.$axios({
                    url:'/api/ponds/delete',
                    method:"POST",
                    data:data,
                }).then(res=>{
                    console.log(res);
                    if(res.data.status==200){
                        this.$message.success(res.data.data.msg);
                    }
                })
            }).catch((e)=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            })
        },
        add(){
            this.$router.push({
                path:'/',
            })
        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex == 0 &&this.Id&&this.currentPage==1) {
                // console.log(this.Id);
                // console.log(row);
                return 'warning-row';
            }
            return '';
        }

    },
    created(){
        this.getPonds()
    },
    computed:{
        AllPonds(){
            return this.$store.state.ponds.allPonds
        },
        AllPondsLength(){
            return this.$store.state.ponds.allPonds.length
        },
        Id(){
            return this.$route.query.id
        },
        IsAdmin(){
            return this.$store.state.USERINFO.isAdmin
        }
    },
    watch:{
        AllPonds(n){
            this.currentPage=1
            this.tempTableData=n.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        Id(n,o){
            if(n){

            }
        }
    }
}
</script>

<style lang="less" scoped>
    ::v-deep .warning-row {
        background: oldlace;
    }

    .success-row {
        background: #f0f9eb;
    }
</style>