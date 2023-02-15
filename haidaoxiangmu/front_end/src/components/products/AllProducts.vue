<template>
    <div class="allProducts">
        <el-table
            :data="tempTableData"
            style="width: 100%">
            <el-table-column
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                v-for="(item,index) in tableItem" 
                :key="index"
            >
                <template slot-scope="scope">
                    <img v-if="item.prop=='imgUrl'" :src="scope.row.imgUrl" alt="" width="90">
                    <div v-else>{{scope.row[item.prop]}}</div>
                </template>
            </el-table-column>

            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="deleteProduct(scope.row)" style="color:red" type="text" size="small" >删除</el-button>
                    <el-button @click="goProductEdit(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>

        </el-table>


        <!--  分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 6]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next"
            :total="TableLength">
        </el-pagination>



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
                {'id':'5',prop:'breedTech',label:'养殖技术',width:'300'}, 
                {'id':'6',prop:'description',label:'描述',width:'300'}, 
                {'id':'7',prop:'diseases',label:'病害',width:'300'},
                {'id':'8',prop:'checkStatus',label:'审核状况',width:'100'},

            ],
            currentPage:1,
            pagesize:3
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
                    this.tempTableData=res.data.data.data.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
                    this.$store.commit('allProducts/setTableData',res.data.data.data)
                }

            })
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


        },
        handleSizeChange (size) {
            this.pagesize = size;
            this.tempTableData=this.TableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            this.tempTableData=this.TableData.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)

        },
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
        }
    }
}
</script>

<style lang='less' scoped>

</style>