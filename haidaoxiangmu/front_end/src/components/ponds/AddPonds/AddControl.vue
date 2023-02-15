<template>
    <div class="addControl">
        <el-button :type="type" @click="drawMode" style="margin-bottom:10px;">{{text}}</el-button>
        <el-button :disabled="Id?false:true" :type="editingPonds?'danger':'success'" @click='editMode' style="margin-bottom:10px;">{{editingPonds?'停止编辑':'编辑池塘'}}</el-button>

        <!-- 对该池塘添加owner和product,从数据库中选 -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="区块编号">
                <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="养殖人员">
                <el-input class="owner" v-model="form.owner" placeholder="请选择养殖人员" 
                    @input="getOwner" @focus="focusedOwner">
                    <el-button slot="append" icon="el-icon-close" @click="vanishOwner"></el-button>
                </el-input>
                <SearchOwner :list="Owner" @getSelectedItem="getSelectedOwner"></SearchOwner>
            </el-form-item>
            <el-form-item label="养殖品种">
                <el-input  class="product" v-model="form.product" placeholder="请选择养殖品种" 
                    @input="getProduct" @focus="focusedProduct">
                    <el-button slot="append" icon="el-icon-close" @click="vanishProduct"></el-button>
                </el-input>
                <SearchProduct :list="Product" @getSelectedItem="getSelectedProduct"></SearchProduct>
            </el-form-item>
            <el-form-item label="经度">
                <el-input :disabled="true" v-model="form.lng" placeholder="尚未创建池塘"></el-input>
            </el-form-item>
            <el-form-item label="纬度">
                <el-input :disabled="true" v-model="form.lat" placeholder="尚未创建池塘"></el-input>
            </el-form-item>
            <el-form-item label="估算面积">
                <el-input :disabled="true" v-model="form.estimateArea" placeholder="尚未创建池塘">
                    <template slot="append">亩</template>
                </el-input>
            </el-form-item>
            <el-form-item label="实际面积">
                <el-input v-model="form.area" placeholder="请输入面积">
                    <template slot="append">亩</template>
                </el-input>
            </el-form-item>
            <el-form-item label="所在镇">
                <el-input  v-model="form.town" placeholder="请输入所在镇"></el-input>
            </el-form-item>
            <el-form-item label="所在村">
                <el-input  v-model="form.village" placeholder="请输入所在村"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input  v-model="form.comment" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addPonds">立即创建</el-button>
                <el-button type="success" @click="updatePonds">保存</el-button>

                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import SearchOwner from '../../input-search/SearchOwner.vue'
import SearchProduct from '../../input-search/SearchProduct.vue'

export default {
    name:"AddControl",
    components:{
        SearchOwner,
        SearchProduct
    },
    data(){
        return{
            drawing:0,
            editingPonds:false,
            text:'添加池塘',
            type:'primary',
            form:{
                number:'',
                //owner
                ownerId:'',
                owner:'',
                //product
                productId:'',
                product:'',
                //经纬度
                lng:'',
                lat:'',
                //面积
                estimateArea:'',
                area:'',
                //town
                town:'',
                village:'',
                polygon:'',
                comment:'',
                checkStatus:0,
                id:'',
            },
            focusMode:false,
            
        }
    },
    methods:{
        //进入绘图编辑模式
        drawMode(){
            if(this.drawing==0){
                this.drawing=1
            }else if(this.drawing==1){
                this.drawing=0
            }

            if(this.drawing==2){
                this.drawing=3
            }else if(this.drawing==3){
                this.drawing=2
            }
            this.$store.commit('ponds/setDrawing',this.drawing)
        },
        //编辑
        editMode(){
            this.editingPonds=!this.editingPonds
            this.$store.commit('ponds/setEditingPonds',this.editingPonds)
        },
        //获取owner
        getOwner(){
            
            let searchForm={
                name:this.form.owner,
                town:'',
                village:'',
                discriminator:'',
                checkStatus:'',
            }
            if(!this.focusMode){
                if(this.form.owner.trim()=='')return
            }
            
            let data=this.qs.stringify(searchForm)

            this.$axios({
                url:'/api/owner/search',
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.$store.commit('ponds/setOwner',res.data.data.data)
                }
            })
        },
        //从search组件中取值
        getSelectedOwner(val){
            this.form.owner=val.name
            this.form.ownerId=val.id

        },
        //点击x去除值，并收起search组件
        vanishOwner(){
            this.form.owner=''
            this.form.ownerId=''
            //收起select组件
            this.$store.commit('search/setShowListOwner',false)

        },
        focusedOwner(){
            if(this.form.owner==''){
                this.focusMode=true
            }else{
                this.focusMode=false
            }
            
            if(this.focusMode){
                this.getOwner()
            }
            
        },

        //获取product
        getProduct(){
            let searchForm={
                name:this.form.product,

            }
            if(!this.focusMode){
                if(this.form.owner.trim()=='')return
            }
            
            let data=this.qs.stringify(searchForm)

            this.$axios({
                url:'/api/products/search',
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.$store.commit('ponds/setProduct',res.data.data.data)
                }
            })
        },
        //从search组件中取值
        getSelectedProduct(val){
            this.form.product=val.name
            this.form.productId=val.id
        },
        //点击x去除值，并收起search组件
        vanishProduct(){
            this.form.product=''
            this.form.productId=''
            //收起select组件
            this.$store.commit('search/setShowListProduct',false)

        },
        focusedProduct(){
            if(this.form.product==''){
                this.focusMode=true
            }else{
                this.focusMode=false
            }
            
            if(this.focusMode){
                this.getProduct()
            }
            
        },

        //添加ponds
        addPonds(){
            let data=this.qs.stringify(this.form)

            this.$axios({
                url:"/api/ponds/add",
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res.data);
            })
        },
        //修改ponds
        updatePonds(){
            this.form.id=this.Id
            let data=this.qs.stringify(this.form)

            this.$axios({
                url:"/api/ponds/update",
                method:"POST",
                data:data
            }).then(res=>{
                console.log(res.data);
            })
        }

    },
    created(){

    },
    computed:{
        
        Drawing(){
            return this.$store.state.ponds.drawing
        },
        Owner(){
            return this.$store.state.ponds.owner
        },
        Product(){
            return this.$store.state.ponds.product
        },
        Marker(){
            return this.$store.state.ponds.marker
        },
        EstimateArea(){
            return this.$store.state.ponds.estimateArea
        },
        Area(){
            return this.$store.state.ponds.area
        },
        Town(){
            return this.$store.state.ponds.town
        },
        Village(){
            return this.$store.state.ponds.village
        },
        Comment(){
            return this.$store.state.ponds.comment
        },
        Number(){
            return this.$store.state.ponds.number
        },
        OwnerMarker(){
            return this.$store.state.ponds.ownerMarker
        },
        ProductMarker(){
            return this.$store.state.ponds.productMarker
        },
        DrawingPolygon(){
            return this.$store.state.ponds.drawingPolygon
        },
        Id(){
            return this.$store.state.ponds.id
        }

    },
    watch:{
        Drawing(n){
            this.drawing=n
            if(n==0){
                this.text='添加池塘'
                this.type="primary"
            }else if(n==1){
                this.text='停止绘制'
                this.type="danger"
            }
            else if(n==2){
                this.text='编辑池塘'
                this.type="success"
            }else if(n==3){
                this.text='停止编辑'
                this.type="danger"
            }
        },
        OwnerMarker(n){
            this.form.owner=n.name
            this.form.ownerId=n.id
        },
        ProductMarker(n){
            this.form.product=n.name
            this.form.productId=n.id
        },
        Number(n){
            this.form.number=n
        },
        Marker(n){
            this.form.lng=n.lng
            this.form.lat=n.lat
        },
        EstimateArea(n){
            this.form.estimateArea=n
        },
        Area(n){
            this.form.area=n
        },
        Town(n){
            this.form.town=n
        },
        Village(n){
            this.form.village=n
        },
        Comment(n){
            this.form.comment=n
        },
        DrawingPolygon(n){
            this.form.polygon=n
        }
    }
}
</script>

<style lang="less" scoped>


    .owner{
        position: relative;
    }
</style>