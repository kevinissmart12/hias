<template>
    <div class="addControl">
        <el-button 
            @click="changeAddPond" 
            style="margin-bottom:10px;"
            :type='AddPond?"danger":"primary"'
        >
            {{AddPond?'停止绘制':'添加池塘'}}
        </el-button>
        <el-button 
            @click="changeEditPond" 
            style="margin-bottom:10px;"
            :type='EditPond?"danger":"success"'
            :disabled='Id?false:true'
        >
            {{EditPond?'停止编辑':'编辑池塘'}}
        </el-button>
        <!-- 对该池塘添加owner和product,从数据库中选 -->
        <el-form ref="form" :model="form" :rules="rules"  label-width="100px">
            <el-form-item label="海水/淡水" prop="pondsType">
                <el-select v-model="form.pondsType" placeholder="请选择海水/淡水养殖" @change='updateForm(form.pondsType,"setPondsType")'>
                    <el-option
                        label="海水养殖"
                        value="0"
                    >
                    </el-option>
                    <el-option
                        label="淡水养殖"
                        value="1"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区块编号" prop="number">
                <el-input v-model="form.number" @input='updateForm(form.number,"setNumber")'></el-input>
            </el-form-item>
            <el-form-item label="所在区" prop="county">
                <el-select v-model="form.county" placeholder="请选择所在区/县">
                    <el-option
                        v-for="item in countyOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在镇" prop="town">
                <el-select v-model="form.town" placeholder="请选择所在镇" :disabled='form.county==""?true:false'>
                    <el-option
                        v-for="item in townOption"
                        :key="item.id"
                        :label="item.town"
                        :value="item.id">
                    </el-option>
                </el-select>
                <!-- <el-input  v-model="form.town" @input='updateForm(form.town,"setTown")' placeholder="请输入所在镇"></el-input> -->
            </el-form-item>
            <el-form-item label="所在村" prop="village" >
                <!-- :disabled='form.county==""||form.town==""?true:false' -->
                <el-select v-model="form.village" placeholder="请选择所在村" :disabled='form.county==""||form.town==""?true:false'>
                    <el-option
                        v-for="item in villageOption"
                        :key="item.id"
                        :label="item.village"
                        :value="item.id">
                    </el-option>
                </el-select>
                <!-- <el-input  v-model="form.village" @input='updateForm(form.village,"setVillage")' placeholder="请输入所在村"></el-input> -->
            </el-form-item>

            <el-form-item label="养殖人员" prop="owner">
                <el-select v-model="form.owner" @change="selectOwner" @clear="vanishOwner" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in Owners"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="养殖品种" prop="product">
                <el-select v-model="form.product" @change="selectProduct" @clear="vanishProduct" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in Products"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="经度" >
                <el-input :disabled="true" v-model="form.lng"  placeholder="尚未创建池塘"></el-input>
            </el-form-item>
            <el-form-item label="纬度">
                <el-input :disabled="true" v-model="form.lat"  placeholder="尚未创建池塘"></el-input>
            </el-form-item>
            <el-form-item label="估算面积">
                <el-input :disabled="true" v-model="form.estimateArea"  placeholder="尚未创建池塘">
                    <template slot="append">亩</template>
                </el-input>
            </el-form-item>
            <el-form-item label="实际面积" prop="area">
                <el-input v-model="form.area" @input='updateForm(form.area,"setArea")' placeholder="请输入面积">
                    <template slot="append">亩</template>
                </el-input>
            </el-form-item>
            <el-form-item label="年产量" prop="productOutput">
                <el-input v-model="form.productOutput" @input='updateForm(form.productOutput,"setProductOutput")' placeholder="请输入面积">
                    <template slot="append">斤</template>
                </el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
                <el-input  v-model="form.comment" @input='updateForm(form.comment,"setComment")' placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-show="Id==65535" @click="addPonds">立即创建</el-button>
                <el-button type="success" v-show="Id!=65535" @click="updatePonds">保存</el-button>

                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import SearchOwner from '../../input-search/SearchOwner.vue'
import SearchProduct from '../../input-search/SearchProduct.vue'


export default {
    name:'addControl',
    components:{
        SearchOwner,
        SearchProduct,
    },
    data(){
        return{
            focusMode:false,
            form:{
                number:'',
                //owner
                ownerId:'',
                owner:'',
                //product
                productId:'',
                product:'',
                productOutput:'',
                //经纬度
                lng:'',
                lat:'',
                //面积
                estimateArea:'',
                area:'',
                pondsType:'',
                //位置
                county:'',
                town:'',
                village:'',
                polygon:'',
                comment:'',
                checkStatus:0,
                id:'',
            },
            rules: {
                pondsType: [
                    { required: true, message: '请选择池塘类型', trigger: 'change' },
                ],
                number: [
                    { required: true, message: '请输入区块编号', trigger: 'change' }
                ],
                county: [
                    { required: true, message: '请选择所在区', trigger: 'change' },
                ],
                town: [
                    { required: true, message: '请选择所在镇', trigger: 'change' },
                ],
                village: [
                    { required: true, message: '请选择所在村', trigger: 'change' },
                ],
                owner: [
                    { required: true, message: '请选择养殖人员', trigger: 'change' },
                ],
                product: [
                    { required: true, message: '请选择养殖品种', trigger: 'change' },
                ],
                area: [
                    { required: true, message: '请输入实际面积', trigger: 'change' },
                ],
                productOutput: [
                    { required: true, message: '请输入年产量', trigger: 'change' },
                ],
            },
            //所在区，不用存在于form中
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
        }
    },
    methods:{
        //获取owner
        getOwner(){
            
            let searchForm={
                name:this.form.owner,
                county:'',
                town:'',
                village:'',
                discriminator:'',
                creditLevel:'',
                checkStatus:1,
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
                    this.$store.commit('ponds/setOwner',this.form.owner)
                    this.$store.commit('ponds/setOwnerId',this.form.ownerId)
                    this.$store.commit('ponds/newPolygon',this.EditPond)
                    this.$store.commit('ponds/oldPolygon',this.EditPond)
                }
            })

        },
        //点击x去除值
        vanishOwner(){
            this.form.owner=''
            this.form.ownerId=''
            this.$store.commit('ponds/setOwner','')
            this.$store.commit('ponds/setOwnerId','')
            this.$store.commit('ponds/newPolygon',this.EditPond)
            this.$store.commit('ponds/oldPolygon',this.EditPond)
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
        selectProduct(val){
            this.Products.forEach((i,v)=>{
                if(i.id==this.form.product){
                    this.form.product=i.name
                    this.form.productId=i.id
                    this.$store.commit('ponds/setProduct',this.form.product)
                    this.$store.commit('ponds/setProductId',this.form.productId)
                    this.$store.commit('ponds/newPolygon',this.EditPond)
                    this.$store.commit('ponds/oldPolygon',this.EditPond)
                }
            })
        },
        //点击x去除值，并收起search组件
        vanishProduct(){
            this.form.product=''
            this.form.productId=''
            this.$store.commit('ponds/setProduct','')
            this.$store.commit('ponds/setProductId','')
            this.$store.commit('ponds/newPolygon',this.EditPond)
            this.$store.commit('ponds/oldPolygon',this.EditPond)
        },


        //获取镇和村
        getTown(){

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
            // let data=this.qs.stringify({
            //     countyId:this.form.county
            // })
            // this.$axios({
            //     url:"/api/area/getTown",
            //     method:'POST',
            //     data:data
            // }).then(res=>{
            //     console.log(res.data);
            //     if(res.data.status==200){
            //         this.townOption=res.data.data.data
            //     }
            // })
        },
        getVillage(){

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
        // getTownandVillage(){
        //     this.AllTownOption=JSON.parse(localStorage.getItem('town'))
        //     this.AllVillageOption=JSON.parse(localStorage.getItem('town'))

        // },


        //添加ponds
        addPonds(){
            if(this.form.pondsType==''){
                return this.$message.error('请选择池塘类型')
            }
            if(this.form.number==''){
                return this.$message.error('请输入区块编号')
            }
            if(this.form.county==''){
                return this.$message.error('请选择所在区')
            }
            if(this.form.town==''){
                return this.$message.error('请选择所在镇')
            }
            if(this.form.village==''){
                return this.$message.error('请选择所在村')
            }
            if(this.form.owner==''){
                return this.$message.error('请选择养殖人员')
            }
            if(this.form.product==''){
                return this.$message.error('请选择养殖品种')
            }
            if(this.form.area==''){
                return this.$message.error('请输入养殖面积')
            }
            if(this.form.productOutput==''){
                return this.$message.error('请输入年产量')
            }
            this.form.polygon=this.DrawingPolygon
            let data=this.qs.stringify(this.form)

            this.$axios({
                url:"/api/ponds/add",
                method:"POST",
                data:data
            }).then(res=>{
                if(res.data.status==200){
                    this.$message.success('添加成功');
                    //更改polygons中的新添加的池塘id
                    this.$store.commit('ponds/setId','')
                    this.$store.commit('ponds/changeNormalId',res.data.data.id)
                    this.$router.push({
                        path:'/',
                        query:{
                            id:res.data.data.id
                        }
                    })
                    //刷新
                    window.location.reload();
                    this.$router.go(0);
                }
            })
        },
        //修改ponds
        updatePonds(){
            //停止编辑
            this.$store.commit('ponds/setEditPond',false)
            this.form.id=this.Id
            this.form.polygon=this.DrawingPolygon
            if(this.form.id=='')return this.$message.error('没选择池塘');
            if(this.form.pondsType==''){
                return this.$message.error('请选择池塘类型')
            }
            if(this.form.number==''){
                return this.$message.error('请输入区块编号')
            }
            if(this.form.county==''){
                return this.$message.error('请选择所在区')
            }
            if(this.form.town==''){
                return this.$message.error('请选择所在镇')
            }
            if(this.form.village==''){
                return this.$message.error('请选择所在村')
            }
            if(this.form.owner==''){
                return this.$message.error('请选择养殖人员')
            }
            if(this.form.product==''){
                return this.$message.error('请选择养殖品种')
            }
            if(this.form.area==''){
                return this.$message.error('请输入养殖面积')
            }
            if(this.form.productOutput==''){
                return this.$message.error('请输入年产量')
            }

            
            let data=this.qs.stringify(this.form)

            this.$axios({
                url:"/api/ponds/update",
                method:"POST",
                data:data
            }).then(res=>{
                if(res.data.status==200){
                    this.$message.success('更新成功');

                    this.$router.push({
                        path:'/',
                        query:{
                            id:this.form.id
                        }
                    })
                    //刷新
                    window.location.reload();
                    this.$router.go(0);
                }
            })
        },

        validate(){
            if(this.form.pondsType==''){
                return this.$message.error('请选择池塘类型')
            }
            if(this.form.number==''){
                return this.$message.error('请输入区块编号')
            }
            if(this.form.county==''){
                return this.$message.error('请选择所在区')
            }
            if(this.form.town==''){
                return this.$message.error('请选择所在镇')
            }
            if(this.form.village==''){
                return this.$message.error('请选择所在村')
            }
            if(this.form.owner==''){
                return this.$message.error('请选择养殖人员')
            }
            if(this.form.product==''){
                return this.$message.error('请选择养殖品种')
            }
            if(this.form.area==''){
                return this.$message.error('请输入养殖面积')
            }
            if(this.form.productOutput==''){
                return this.$message.error('请输入年产量')
            }
        },



        //修改按钮
        //添加和编辑
        changeAddPond(){
            this.$store.commit('ponds/setAddPond',!this.AddPond)
        },
        changeEditPond(){
            this.$store.commit('ponds/setEditPond',!this.EditPond)
        },


        //输入框实时更新传递store
        updateForm(val,str){
            setTimeout(()=>{
                this.$store.commit(`ponds/${str}`,val)
                this.$store.commit('ponds/newPolygon',this.EditPond)
                this.$store.commit('ponds/oldPolygon')

            },100)

        },
    },
    computed:{
        Owners(){
            return this.$store.state.ponds.owners
        },
        Products(){
            return this.$store.state.ponds.products
        },
        AddPond(){
            return this.$store.state.ponds.addPond
        },
        EditPond(){
            return this.$store.state.ponds.editPond
        },
        //以下为form表中的值
        Number(){
            return this.$store.state.ponds.number
        },
        Owner(){
            return this.$store.state.ponds.owner
        },
        OwnerId(){
            return this.$store.state.ponds.ownerId
        },
        Product(){
            return this.$store.state.ponds.product
        },
        ProductId(){
            return this.$store.state.ponds.productId
        },
        ProductOutput(){
            return this.$store.state.ponds.productOutput
        },
        Lng(){
            return this.$store.state.ponds.lng
        },
        Lat(){
            return this.$store.state.ponds.lat
        },
        EstimateArea(){
            return this.$store.state.ponds.estimateArea
        },
        Area(){
            return this.$store.state.ponds.area
        },
        PondsType(){
            return this.$store.state.ponds.pondsType
        },
        County(){
            return this.$store.state.ponds.county
        },
        Town(){
            return this.$store.state.ponds.town
        },
        Village(){
            return this.$store.state.ponds.village
        },
        Polygon(){
            return this.$store.state.ponds.polygon
        },
        Comment(){
            return this.$store.state.ponds.comment
        },
        CheckStatus(){
            return this.$store.state.ponds.checkStatus
        },
        Id(){
            return this.$store.state.ponds.id
        },
        DrawingPolygon(){
            return this.$store.state.ponds.drawingPolygon
        },

    },
    watch:{
        'form.county'(n,o){
            if(n=='')return
            // //重新选择
            // if(n!==o){
            //     //清空
            //     this.form.town=''
            //     this.form.village=''
            // }

            //重新获取town数据
            this.getTown()
            this.updateForm(this.form.county,"setCounty")
        },
        'form.town'(n,o){
            if(n=='')return
            // //重新选择
            // if(n!==o){
            //     //清空
            //     this.form.village=''
            // }
            this.getVillage()
            // //上传store
            this.updateForm(this.form.town,"setTown")
        },
        'form.village'(n,o){
            if(n=='')return
            this.updateForm(this.form.village,"setVillage")

        },


        Number(n){
            this.form.number=n
        },
        Owner(n){
            this.form.owner=n
        },
        OwnerId(n){
            this.form.ownerId=n
        },
        Product(n){
            this.form.product=n
        },
        ProductId(n){
            this.form.productId=n
        },
        ProductOutput(n){
            this.form.productOutput=n
        },
        Lng(n){
            this.form.lng=n
        },
        Lat(n){
            this.form.lat=n
        },
        EstimateArea(n){
            this.form.estimateArea=n
        },
        Area(n){
            this.form.area=n
        },
        PondsType(n){
            this.form.pondsType=n
        },
        County(n){
            this.form.county=n
        },
        Town(n){
            this.form.town=n
        },
        Village(n){
            this.form.village=n
        },
        Polygon(n){
            this.form.polygon=n
        },
        Comment(n){
            this.form.comment=n
        },
        CheckStatus(n){
            this.form.checkStatus=n
        },
        Id(n){
            this.form.id=n
        },
    },
    created(){
        this.getOwner()
    }
}
</script>

<style lang="less" scoped>
    .owner{
        position: relative;
    }
</style>