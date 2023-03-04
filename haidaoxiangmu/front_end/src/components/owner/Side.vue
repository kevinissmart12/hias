<template>
    <div class="side">
        <el-card class="side-card" style="padding:0;">
            <div slot="header" class="clearfix">
                <span>养殖人员查询</span>
                <download-excel
                    class="export-excel-wrapper"
                    :data="json_data"
                    :fields="json_fields"
                    type="xls"
                    worksheet="My Worksheet"
                    name="池塘信息列表"
                    style="float: right; padding: 3px 0"
                >
                    <el-button @click="exportExcel" style="float: right; padding: 3px 0" type="text">导出筛选列表</el-button>
                </download-excel>
            </div>

            <el-form label-position="left" ref="form" :model="form" label-width="80px">
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
                <el-form-item label="类型">
                    <el-select v-model="form.discriminator" placeholder="请选择">
                        <el-option label="个人" value="个人"></el-option>
                        <el-option label="企业" value="企业"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="信用等级">
                    <el-select v-model="form.creditLevel" placeholder="请选择">
                        <el-option label="A" value="A"></el-option>
                        <el-option label="B" value="B"></el-option>
                        <el-option label="C" value="C"></el-option>
                    </el-select>
                </el-form-item>                
                <el-form-item label="审核情况">
                    <el-select v-model="form.checkStatus" placeholder="请选择">
                        <el-option label="审核中" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>

                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button type="danger" @click="quit">去除条件</el-button>

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
                discriminator:'',
                name:'',
                creditLevel:'',
                checkStatus:'',
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
                名称:"name",
                联系电话:"mobile",
                出生年月:"birthday",
                图片:"imgUrl",
                性别:"sex",
                家庭住址:"address",
                出生年月:"birthday",
                所在区:"countyContent",
                所在镇:"townContent",
                所在村:"villageContent",
                从业时间:"engagedTime",
                文化程度:"educationLevel",
                农民头衔:"farmerTitle",
                组织机构代码:"departmentId",
                类型:"discriminator",
                公司:"companyName",
                成立时间:"establishedTime",
                固定资产:"fixedAssets",
                经营内容:"businessContents",
                无公害基地:"isBaseOfEmployee",
                员工人数:"numberOfEmployee",
                特色产品:"featuredProducts",
                信用等级:"creditLevel",
                审核状态:"checkStatus",
            },
            json_data:[

            ],
        }   
    },
    methods:{
        search(){
            let data=this.qs.stringify(this.form)
            console.log(data);
            this.$axios({
                url:'/api/owner/search',
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res);
                if(res.data.status==200){
                    if(res.data.data.has){
                        this.$message.success(res.data.data.msg);
                        //store
                        this.$store.commit('allOwner/setTableData',res.data.data.data)
                    }else{
                        this.$message.error(res.data.data.msg);

                    }
                    
                }
            })
        },
        quit(){
            this.form={
                county:'',
                town:'',
                village:'',
                discriminator:'',
                name:'',
                creditLevel:'',
                checkStatus:'',
            }
            this.$axios({
                url:'/api/owner/getAll',
                method:'GET'
            }).then(res=>{

                if(res.data.status==200){
                    this.$message.warning('已去除搜索条件');
                    this.$store.commit('allOwner/setTableData',res.data.data.data)
                }
            })
        },
        //获取镇和村
        getTown(){
            // let data=this.qs.stringify({
            //     countyId:this.form.county,
            // })

            // this.$axios({
            //     url:'/api/area/getTown',
            //     method:'POST',
            //     data:data
            // }).then(res=>{
            //     console.log(res.data);
            //     if(res.data.status==200){
            //         this.townOption=res.data.data.data
            //         //赋值

            //     }
            // })
            this.townOption=[]
            if(localStorage.getItem('town')){
                //根据countyid获取town
                let town=JSON.parse(localStorage.getItem('town'))
                town.forEach((i,v)=>{
                    if(i.countyId==this.form.county){
                        this.townOption.push(i)
                    }
                })
            }
        },
        getVillage(){

            // let data=this.qs.stringify({
            //     Tid:this.form.town,
            // })

            // this.$axios({
            //     url:'/api/area/getVillage',
            //     method:'POST',
            //     data:data
            // }).then(res=>{
            //     console.log(res.data);
            //     if(res.data.status==200){
            //         this.villageOption=res.data.data.data
            //     }
            // })
            this.villageOption=[]
            if(localStorage.getItem('village')){
                //根据countyid获取town
                let village=JSON.parse(localStorage.getItem('village'))
                village.forEach((i,v)=>{
                    if(i.Tid==this.form.town){
                        this.villageOption.push(i)
                    }
                })
            }
        },
        exportExcel(){
            this.json_data=this.AllOwner
        }
    },
    computed:{
        AllOwner(){
            return this.$store.state.allOwner.tableData
        },
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
    }


}
</script>

<style lang="less" scoped>

    .side{
        width: 100%;
        height: 100%;
    }


    .el-form-item{
        margin-bottom:5px!important;
    }

    
</style>