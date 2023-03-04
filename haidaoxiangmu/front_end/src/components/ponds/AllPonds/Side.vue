<template>
    <div class="side">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>池塘查询</span>
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
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="养殖人员">
                    <el-select v-model="form.owner" @change="selectOwner" @clear="vanishOwner" filterable clearable placeholder="请选择">
                        <el-option
                            v-for="item in Owners"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="养殖品种">
                    <el-select v-model="form.product" @change="selectProduct" @clear="vanishProduct" filterable clearable placeholder="请选择">
                        <el-option
                            v-for="item in Products"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
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
                    <el-form-item label="审核情况">
                        <el-select v-model="form.checkStatus" placeholder="请选择">
                            <el-option label="审核中" value="0"></el-option>
                            <el-option label="已通过" value="1"></el-option>
                            <el-option label="未通过" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button type="danger" @click="quit">去除条件</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>

<script>
export default {
    name:"Side",
    data(){
        return{
            form:{
                owner:'',
                ownerId:'',
                product:'',
                productId:'',
                county:'',
                town:'',
                village:'',
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
                区块编号:"number",
                拥有者:"owner",
                养殖品种:"product",
                年产量:"productOutput",
                所在区:"countyContent",
                所在镇:"townContent",
                所在村:"villageContent",
                面积:"area",
                经度:"lng",
                纬度:"lat",
                审核状态:"checkStatus",
            },
            json_data:[

            ],
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
                console.log(res.data);
                if(res.data.status==200){
                    this.villageOption=res.data.data.data
                }
            })
        },
        search(){
            
            let data=this.qs.stringify(this.form)
            
            this.$axios({
                url:'/api/ponds/search',
                method:"POST",
                data:data
            }).then(res=>{
                // console.log(res.data.data);
                if(res.data.status==200){
                    if(res.data.data.has){
                        this.$message.success(res.data.data.msg);
                        //store
                        this.$store.commit('ponds/setAllPonds',res.data.data.data)
                    }else{
                        this.$message.error(res.data.data.msg);

                    }
                    
                }
            })
        },
        quit(){
            this.form={
                owner:'',
                ownerId:'',
                product:'',
                productId:'',
                county:'',
                town:'',
                village:'',
                checkStatus:'',
            }
            this.$axios({
                url:'/api/ponds/getAll',
                method:'GET'
            }).then(res=>{

                if(res.data.status==200){
                    this.$message.warning('已去除搜索条件');
                    this.$store.commit('ponds/setAllPonds',res.data.data.data)

                }
            })
        },
        //获取owner
        getOwner(){
            
            let searchForm={
                name:this.form.owner,
                county:'',
                town:'',
                village:'',
                discriminator:'',
                creditLevel:'',
                checkStatus:'',
            }
            
            let data=this.qs.stringify(searchForm)

            this.$axios({
                url:'/api/owner/search',
                method:"POST",
                data:data
            }).then(res=>{
                if(res.data.status==200){
                    this.$store.commit('ponds/setOwners',res.data.data.data)
                    this.getProduct()
                }
            })
        },
        selectOwner(){
            this.Owners.forEach((i,v)=>{
                if(i.id==this.form.owner){
                    this.form.owner=i.name
                    this.form.ownerId=i.id
                }
            })

        },
        //点击x去除值
        vanishOwner(){
            this.form.owner=''
            this.form.ownerId=''
        },

        //获取product
        getProduct(){
            let searchForm={
                name:this.form.product,

            }
            
            let data=this.qs.stringify(searchForm)

            this.$axios({
                url:'/api/products/search',
                method:"POST",
                data:data
            }).then(res=>{
                if(res.data.status==200){
                    this.$store.commit('ponds/setProducts',res.data.data.data)
                }
            })
        },
        selectProduct(){
            this.Products.forEach((i,v)=>{
                if(i.id==this.form.product){
                    this.form.product=i.name
                    this.form.productId=i.id
                }
            })
        },
        //点击x去除值，并收起search组件
        vanishProduct(){
            this.form.product=''
            this.form.productId=''
        },

        exportExcel(){
            this.json_data=this.AllPonds
        }
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
    created(){
        this.getOwner()
    },
    computed:{
        Owners(){
            return this.$store.state.ponds.owners
        },
        Products(){
            return this.$store.state.ponds.products
        },
        AllPonds(){
            return this.$store.state.ponds.allPonds
        },
    }
}
</script>

<style lang="less" scoped>

</style>