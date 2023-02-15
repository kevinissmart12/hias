<template>
    <div class="main">
        <el-card class="table-card">
            <div slot="header" class="clearfix">
                <span>{{TableHead==''?tableHead:TableHead}}养殖情况统计</span>
            </div>
            <el-table
                :data="tempTableData"
                style="width: 100%"
                :default-sort = "{prop: 'countyContent', order: 'ascending'}"
                >
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
            :total="TownStatusLength">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:'main_com',
    data(){
        return{
            tableItem:[
                {'id':'1',prop:'name',label:'养殖品种',width:'400',sortable:false},
                {'id':'2',prop:'area',label:'养殖面积(亩)',width:'350',sortable:true},
                {'id':'3',prop:'productOutput',label:'年产量(斤)',width:'350',sortable:true},
            ],
            currentPage:1,
            pagesize:10,
            tempTableData:[],
            tableHead:'舟山省',
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
            this.tempTableData=this.TownStatus.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            this.tempTableData=this.TownStatus.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        },
    },
    created(){
        this.getAllTown()
    },
    computed:{
        TownStatus(){
            return this.$store.state.statistic.townStatus
        },
        TownStatusLength(){
            return this.$store.state.statistic.townStatus.length
        },
        TableHead(){
            return this.$store.state.statistic.tableHead
        }
    },
    watch:{
        TownStatus(n){
            this.currentPage=1
            this.tempTableData=n.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
        }
    }
}
</script>

<style lang="less" scoped>

</style>