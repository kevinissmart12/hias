<template>
    <div class="side">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>养殖池塘类型统计</span>
                <download-excel
                    class="export-excel-wrapper"
                    :data="json_data"
                    :fields="json_fields"
                    type="xls"
                    worksheet="My Worksheet"
                    name="用户信息采样数据"
                    style="float: right; padding: 3px 0"
                >
                    <el-button @click="exportExcel" style="float: right; padding: 3px 0" type="text">导出统计列表</el-button>
                </download-excel>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="所在区">
                        <el-select v-model="form.county" placeholder="请选择所在区/县">
                            <el-option
                                v-for="item in countyOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在镇" >
                        <el-select v-model="form.town" placeholder="请选择所在镇" :disabled='form.county==""?true:false'>
                            <el-option
                                v-for="item in townOption"
                                :key="item.id"
                                :label="item.town"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在村">
                        <el-select v-model="form.village" placeholder="请选择所在村" :disabled='form.county==""||form.town==""?true:false'>
                            <el-option
                                v-for="item in villageOption"
                                :key="item.id"
                                :label="item.village"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name:'side',
    data(){
        return{
            form:{
                county:'',
                town:'',
                village:'',
            },
            //1=>定海区，2=>普陀区,3=>岱山县,4=>嵊泗县
            countyOption:[
                {
                    value: 1,
                    label: '定海区'
                }, 
                {
                    value: 2,
                    label: '普陀区'
                }, 
                {
                    value: 3,
                    label: '岱山县'
                }, 
                {
                    value: 4,
                    label: '嵊泗县'
                }, 
            ],
            townOption:[],
            villageOption:[],
            json_fields:{
                所在区:"countyContent",
                所在镇:"townContent",
                所在村:"villageContent",
                海水养殖面积:"seaArea",
                海水养殖估算面积:"seaEstimateArea",
                淡水养殖面积:"freshWaterArea",
                淡水养殖估算面积:"freshWaterEstimateArea",
                养殖总面积:"totalArea",
                养殖估算总面积:"totalEstimateArea",
            },
            json_data:[

            ]
        }
    },
    methods:{
        //获取镇和村
        getTown(){
            let data=this.qs.stringify({
                countyId:this.form.county,
            })

            this.$axios({
                url:'/api/area/getTown',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.townOption=res.data.data.data
                    //赋值
                }
            })
        },
        getVillage(){

            let data=this.qs.stringify({
                Tid:this.form.town,
            })

            this.$axios({
                url:'/api/area/getVillage',
                method:'POST',
                data:data
            }).then(res=>{
                if(res.data.status==200){
                    this.villageOption=res.data.data.data
                }
            })
        },
        search(){
            let data=this.qs.stringify(this.form)
            this.$axios({
                url:'/api/ponds/search',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.data.has==0){
                    return this.$message.error('没有查询到数据')
                }
                if(res.data.status==200){
                    this.$store.commit('statistic/setPondsType',res.data.data.data)
                    this.$message.success('查询成功')
                }
            })
        },
        exportExcel(){
            this.json_data=this.PondsType
        }
    },
    computed:{
        PondsType(){
            return this.$store.state.statistic.pondsType
        }
    },
    created(){
        this.search()
    },
    watch:{
        'form.county'(n,o){
            if(n=='')return
            //重新选择
            if(n!==o){
                //清空
                this.form.town=''
                this.form.village=''
            }
            //重新获取town数据
            this.getTown()
        },
        'form.town'(n,o){
            if(n=='')return
            //重新选择
            if(n!==o){
                //清空
                this.form.village=''
            }
            this.getVillage()
        },
        'form.village'(n,o){
            if(n=='')return
        },
    },
}
</script>

<style lang='less' scoped>

</style>