<template>
    <div class="side">
        <el-card>
            <div slot="header" class="clearfix">
                <span>采样参数设置</span>

                <download-excel
                    class="export-excel-wrapper"
                    :data="json_data"
                    :fields="json_fields"
                    type="xls"
                    worksheet="My Worksheet"
                    name="用户信息采样数据"
                    style="float: right; padding: 3px 0"
                >
                    <el-button @click="exportExcel" style="float: right; padding: 3px 0" type="text">导出采样数据</el-button>
                </download-excel>

            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="采样人数">
                    <el-input v-model="form.n" placeholder='默认10人'></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="search">采样</el-button>
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
                n:''
            },
            json_fields:{
                id:"id",
                类型:"discriminator",
                姓名:"name",
                电话:"mobile",
                出生日期:"birthday",
                性别:"sex",
                地址:"address",
                所在区县:"countyContent",
                所在镇:"countyContent",
                所在村:"townContent",
                从业时间:"engagedTime",
                文化程度:"educationLevel",
                农民头衔:"farmerTitle",
                组织机构代码:"departmentId",
                公司:"companyName",
                成立时间:"establishedTime",
                固定资产:"fixedAssets",
                经营内容:"businessContents",
                无公害基地:"isBaseOfEmployee",
                员工人数:"numberOfEmployee",
                特色产品:"featuredProducts",
                信用等级:"creditLevel",
                备注:"comment",
                审核状态:"checkStatus",
                // imgUrl:'',
            },
            json_data:[

            ]
        }   
    },
    methods:{
        search(){
            if(this.form.n==''){
                this.randomSelect(10)
            }else{
                this.randomSelect(this.form.n)
            }
        },
        randomSelect(n){
            if(n==0){
                this.form.n=''
                return this.$message.error('最少需要一人')
            }
            if(n<0){
                this.form.n=''
                return this.$message.error('人数不能为负数')
            }
            let data=this.qs.stringify({
                n:n
            })

            this.$axios({
                url:'/api/owner/randomSelect',
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.$store.commit('statistic/setRandomOwner',res.data.data.data)
                    this.$message.success('查询成功')

                }
            })
        },
        exportExcel(){
            //获取data
            this.json_data=this.RandomOwner
        }
    },
    computed:{
        RandomOwner(){
            return this.$store.state.statistic.randomOwner
        }
    }
}
</script>

<style  lang="less" scoped>

</style>