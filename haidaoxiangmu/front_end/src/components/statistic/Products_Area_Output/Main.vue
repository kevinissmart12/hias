<template>
    <div class="main">
        <el-card class="table-card">
            <div slot="header" class="clearfix">
                <span>养殖池溏面积与产量信息统计</span>
            </div>
            <el-table
                :data="tempTableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    v-for="(item,index) in tableItem" 
                    :key="index"
                    :sortable="item.sortable"
                >
                    <template slot-scope="scope">
                        <img v-if="item.prop=='imgUrl'" :src="scope.row.imgUrl" alt="" width="90">
                        <div v-else>{{scope.row[item.prop]}}</div>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
        <!--  分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total,prev, pager, next"
            :total="ProductsAOLength">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:'main_com',
    data(){
        return{
            tableItem:[
                {'id':'1',prop:'countyContent',label:'所在区/县',width:'150',sortable:true},
                {'id':'2',prop:'townContent',label:'所在镇',width:'150'},
                {'id':'3',prop:'villageContent',label:'所在村',width:'200'},
                {'id':'4',prop:'product',label:'养殖品种',width:'150'},
                {'id':'5',prop:'area',label:'养殖面积(亩)',width:'150',sortable:true},
                {'id':'6',prop:'productOutput',label:'年产量(斤)',width:'150',sortable:true},
            ],
            currentPage:1,
            pagesize:10,
            tempTableData:[],
        }
    },
    methods:{
        //获取所有的镇和村
        getAllTown(){
            if(localStorage.getItem('town')){
                this.$store.commit('statistic/setTownData')
            }else{
                this.$axios({
                    url:'/api/area/getAllTown',
                    method:'GET',
                }).then(res=>{
                    if(res.data.status==200){
                        //赋值  
                        this.$store.commit('statistic/setTownData',res.data.data.data)
                    }
                })
            }
            this.getALlVillage()
        },
        getALlVillage(){
            if(localStorage.getItem('village')){
                this.$store.commit('statistic/setVillageData')
            }else{
                this.$axios({
                    url:'/api/area/getAllVillage',
                    method:'GET',
                }).then(res=>{
                    if(res.data.status==200){
                        //赋值  
                        this.$store.commit('statistic/setVillageData',res.data.data.data)
                    }
                })
            }

        },
        handleSizeChange (size) {
            this.pagesize = size;
            this.tempTableData=this.ProductsAO.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            this.tempTableData=this.ProductsAO.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
    },
    created() {
        this.getAllTown()
        setTimeout(()=>{
            this.tempTableData=this.ProductsAO.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },500)
    },
    computed:{
        ProductsAO(){
            return this.$store.state.statistic.productsAO
        },
        ProductsAOLength(){
            return this.$store.state.statistic.productsAO.length
        }
    },
    watch:{
        ProductsAO(n){
            this.currentPage=1
            this.tempTableData=n.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        }
    }
}
</script>

<style lang="less" scoped>

</style>