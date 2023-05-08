<template>
    <div class="allProducts">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>养殖信息列表</span>
            </div>

            <el-table
                :data="tempTableData"
                style="width: 100%"
                :row-class-name="tableRowClassName"
            >
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    v-for="(item,index) in tableItem" 
                    :key="index"
                    ref="table_column"
                >
                    <template slot-scope="scope">
                        <img v-if="item.prop=='imgUrl'" :src="scope.row.imgUrl" alt="" width="90">
                        <div v-else>{{scope.row[item.prop]}}</div>
                    </template>
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="checkProduct(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="goProductEdit(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteProduct(scope.row)" style="color:red" type="text" size="small" >删除</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!--  分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next"
                :total="TableLength">
            </el-pagination>

        </el-card>

        <el-dialog
            title="养殖信息"
            :visible.sync="dialogVisible"
            width="60%"
        >
            <table border="1" style="width:100%"  align="center">
                <tr>
                    <td  width="100px" height="50px" align="center">品种名称</td>
                    <td width="40%">{{productInfo.name}}</td>
                    <td rowspan="3" align="center"><img :src="productInfo.imgUrl" style="height:150px"></td>
                </tr>
                <tr>
                    <td width="100px" height="50px" align="center">所属种类</td>
                    <td>{{productInfo.type}}</td>
                </tr>
                <tr>
                    <td width="100px" height="50px" align="center">养殖方式</td>
                    <td>{{productInfo.breedMethod}}</td>
                </tr>
                <tr>
                    <td align="center">描述</td>
                    <td colspan="2"  v-html="productInfo.description"></td>
                </tr>
                <tr>
                    <td align="center">养殖技术</td>
                    <td colspan="2"  v-html="productInfo.breedTech"></td>
                </tr>
                <tr>
                    <td align="center">病害</td>
                    <td colspan="2"  v-html="productInfo.diseases"></td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>





    </div>
</template>

<script>
export default {
    name:'allProducts',
    data() {
        return {

            tempTableData:[],
            tableItem:[
                {'id':'1',prop:'name',label:'名称',width:'180'},
                {'id':'2',prop:'imgUrl',label:'图片',width:'180'},
                {'id':'3',prop:'type',label:'所属种类',width:'180'},
                {'id':'4',prop:'breedMethod',label:'养殖方式',width:'180'}, 
                // {'id':'5',prop:'breedTech',label:'养殖技术',width:'300'}, 
                // {'id':'6',prop:'description',label:'描述',width:'300'}, 
                // {'id':'7',prop:'diseases',label:'病害',width:'300'},
                {'id':'8',prop:'checkStatus',label:'审核状况',width:'100'},

            ],
            currentPage:1,
            pagesize:5,
            dialogVisible: false,
            productInfo:{},
        }
    },
    methods:{
        getProducts(){
            this.$axios({
                url:'/api/products/getAll',
                method:'GET'
            }).then(res=>{

                if(res.data.status==200){
                    this.$message.success(res.data.data.msg);
                    this.$store.commit('allProducts/setTableData',res.data.data.data)
                    if(this.$route.query.id){
                        this.$store.commit('allProducts/changeToFirst',this.$route.query.id)
                        // console.log(this.$refs.table_column[0]);
                    }
                    this.tempTableData=this.TableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)

                }

            })
        },
        checkProduct(item){
            this.dialogVisible=true
            this.productInfo=item
            
        },
        goProductEdit(item){
            this.$router.push({
                path:'/products/add',
                query:{
                    id:item.id
                }
            })

        },
        deleteProduct(item){
            let data =this.qs.stringify(item)
            if(this.IsAdmin==1){
                this.$confirm('确认删除数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((e)=>{
                    if(this.IsAdmin==1){
                        this.$store.commit('allProducts/deleteProduct',item.id)
                        this.tempTableData=this.TableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
                    }
                    this.$axios({
                        url:'/api/products/delete',
                        method:'POST',
                        data:data
                    }).then(res=>{
                        console.log(res.data);
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
            }else{
                this.$confirm('确认请求删除数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then((e)=>{
                    
                    this.$axios({
                        url:'/api/products/delete',
                        method:'POST',
                        data:data
                    }).then(res=>{
                        console.log(res.data);
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
            }


        },
        handleSizeChange (size) {
            this.pagesize = size;
            this.tempTableData=this.TableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            this.tempTableData=this.TableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)

        },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex == 0 &&this.ID&&this.currentPage==1) {
                // console.log(this.ID);
                // console.log(row);
                return 'warning-row';
            }
            return '';
        }
    },
    created(){
        this.getProducts()
    },
    computed:{
        TableLength(){
            return this.$store.state.allProducts.tableData.length
        },
        TableData(){
            return this.$store.state.allProducts.tableData
        },
        ID(){
            return this.$route.query.id
        },
        IsAdmin(){
            return this.$store.state.userinfo.isAdmin
        }
    }
}
</script>

<style lang='less' scoped>
    .allProducts{
        position: relative;
        width: 100%;
        height: 100%;
        .el-card{
            margin-left:12.5%;
            width: 75%;
            height: 100%;
        }
    }
    table {
        border-collapse: collapse;
    }
    ::v-deep .warning-row {
        background: oldlace;
    }

    .success-row {
        background: #f0f9eb;
    }
    
</style>