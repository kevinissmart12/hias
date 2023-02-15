<template>
    <div class="main">
        <el-card class="table-card">
            <div slot="header" class="clearfix">
                <span>随机采样人员列表</span>
            </div>
            <el-table
                :data="RandomOwner"
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

            </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'main_com',
    data(){
        return{
            tableItem:[
                {'id':'1',prop:'name',label:'名称/法人',width:'100'},
                {'id':'2',prop:'mobile',label:'电话',width:'150'},
                {'id':'3',prop:'discriminator',label:'类型',width:'100'},
                {'id':'4',prop:'countyContent',label:'所在区/县',width:'100'}, 
                {'id':'5',prop:'townContent',label:'所在镇',width:'100'}, 
                {'id':'6',prop:'villageContent',label:'所在村',width:'150'},
                {'id':'7',prop:'address',label:'地址',width:'150'},
                {'id':'8',prop:'engagedTime',label:'从业时间',width:'100'},
                {'id':'9',prop:'creditLevel',label:'信用等级',width:'100'},
                {'id':'10',prop:'departmentId',label:'组织机构代码',width:'150'},
                {'id':'11',prop:'companyName',label:'企业',width:'150'},
                {'id':'12',prop:'fixedAssets',label:'固定资产',width:'150'},
                {'id':'13',prop:'businessContents',label:'经营内容',width:'150'},
                {'id':'14',prop:'isBaseOfEmployee',label:'无公害基地',width:'150'},
                {'id':'15',prop:'numberOfEmployee',label:'员工人数',width:'150'},
                {'id':'16',prop:'featuredProducts',label:'特色产品',width:'150'},
                {'id':'17',prop:'checkStatus',label:'审核状态',width:'100'},
            ],
            form: {
                discriminator:'',
                id:'',

                name: '',
                mobile:'',
                birthday:'',
                sex:'',
                imgUrl:'',
                address:'',
                county:'',
                countyId:'',
                town:'',
                townId:'',
                village:'',
                villageId:'',
                engagedTime:'',
                educationLevel:'',
                farmerTitle:'',
                departmentId:'',

                companyName:'',
                establishedTime:'',
                fixedAssets:'',
                businessContents:'',
                isBaseOfEmployee:'',
                numberOfEmployee:'',
                featuredProducts:'',
                creditLevel:'',
                comment:'',
                // checkStatus:'',
            },
            tempTableData:[],
        }
    },
    methods: {
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
    },
    created(){
        this.getAllTown()
    },
    computed:{
        RandomOwner(){
            return this.$store.state.statistic.randomOwner
        }
    }
}
</script>

<style lang="less" scoped>

</style>