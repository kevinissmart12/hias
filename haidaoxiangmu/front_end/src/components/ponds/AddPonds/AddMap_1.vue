<template>
    <div class="addMap">
        <baidu-map  :scroll-wheel-zoom="true" class="map" :center="center" :zoom="zoom" @ready="handler" map-type="BMAP_HYBRID_MAP"
            @mousemove="syncPolygon" @click="paintPolygon" @rightclick="newPolygon"
        >

            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <!-- 后端点获取的池塘的点 -->
            <bm-marker 
                v-for="(item) in Polygons"
                :key="item.lat"
                :position="item.position" 
                @click="infoWindowOpen(item)"
            >
            </bm-marker>
            <!-- 信息窗口 -->
            <bm-info-window 
                :position="infoPosition"
                :show="show" 
                @close="infoWindowClose"
            >
                <div>当前池塘详细信息：</div>
                <div>池塘负责人：{{infoOwner.name?infoOwner.name:'无'}}</div>
                <div>养殖品种：
                    <el-button v-if="infoproduct.name" @click="goProduct(infoproduct.id)" type="text">{{infoproduct.name}}</el-button>
                    <span v-else>无</span>
                </div>
                <el-button type="text" @click="goPond">查看该池塘详细信息</el-button>
            </bm-info-window>
            <!-- 后端获取的池塘形状 -->
            <bm-polygon 
                
                v-for="(item,index) in Polygons" 
                :key="index" 
                :path="item.polygon"
                :editing="item.editing"
                @lineupdate='polygonsUpdate'
            ></bm-polygon>
            <!-- 新增池塘的点和形状 -->
            <bm-marker v-if="drawingMarker" :position='drawingMarker' ></bm-marker>
            <bm-polygon
                :path="path" 
                v-for="path,index of drawingPolygon.paths"
                :key="index+10000"
            ></bm-polygon>

        </baidu-map>
    </div>
</template>

<script>
export default {
    name:'addMap',
    data(){
        return{
            //地图初始配置
            center:'舟山市',
            //13,16
            zoom: 16,
            marker:{},
            position:{lng: 0, lat: 0},
            draggable:false,
            //infowindow展示
            show:false,
            //需要绘制的图行
            drawingPolygon: {
                editing: false,
                paths: []
            },
            drawingMarker:{},
            //infowindow属性,
            infoPosition:{},
            infoOwner:'',
            infoproduct:'',

            //对地图上已存在的图形进行编辑的属性
            id:'',
            editPond:false,

        }
    },
    methods:{
        // 初始化地图参数
        handler ({BMap, map}) {
            // console.log(BMap, map)
            this.center=this.Center
            this.zoom = 16

            this.position.lng = 122.048
            this.position.lat = 29.9424

            this.draggable=true


        },
        //获取池塘
        getPonds(){
            this.$axios({
                url:'/api/ponds/getAllPass',
                methods:'GET'
            }).then(res=>{
                if(res.data.status==200){
                    this.$store.commit('ponds/setPolygons',res.data.data.data)
                    this.getAllTown()
                    this.getALlVillage()

                }
            })
        },
        //跳转到水产
        goProduct(id){
            
            this.$router.push({
                path:`/products/all?id=${id}`
            })
        },
        goPond(){
            let id = this.Id
            this.$router.push({
                path:'/ponds/all',
                query:{
                    id:id
                }
            })
        },

        //计算中心点
        getCenterPoint(path){
            
            //添加marker
            //计算中心点
            let lng=0
            let lat=0

            path.forEach((i,v)=>{
                lng=lng+i.lng
                lat=lat+i.lat
            })
            
            lng=lng/path.length
            lat=lat/path.length
            let drawingObj={
                lng:lng,
                lat:lat
            }
            return drawingObj
        },
        //计算面积
        getArea(path){

            let Arr=[]
            //把path转化成需要的数组形式,path里现在是对象
            path.forEach((i,v)=>{
                let arr=[]
                arr.push(i.lng)
                arr.push(i.lat)
                Arr.push(arr)
            })
            Arr.push([
                path[0].lng,
                path[0].lat
            ])

            var p=this.turf.polygon([Arr])
            // 平方米
            var area=this.turf.area(p)
            // 亩
            var mu=area/(1000*2/3)

            return mu
        },

        infoWindowClose () {
            this.show = false
            //全部设置为false
            this.$store.commit('ponds/setEditingFalse')
            this.$store.commit('ponds/setClickFn',false)
            this.$store.commit('ponds/clearDrawinfPolygon')


            // if(!this.EditPond){
            //     //设置当前查看的图形id
            //     this.id=''
            //     this.$store.commit('ponds/setId','')
            // }
            

        },
        infoWindowOpen(item){
            // console.log(item);
            this.$store.commit('ponds/setClickFn',true)
            this.$store.commit('ponds/setCenter')

            if(item.id==65535){
                this.infoPosition={
                    lng:item.position.lng,
                    lat:item.position.lat
                }
                let newItem=this.Polygons[this.Polygons.length-1]
                //新增的
                this.infoOwner={
                    id:newItem.owner.Id,
                    name:newItem.owner.name
                }
                this.infoproduct={
                    id:newItem.product.id,
                    name:newItem.product.name,
                }
                //设置form的一系列值，传到store
                this.$store.commit('ponds/setNumber',newItem.number)
                this.$store.commit('ponds/setOwner',newItem.owner.name)
                this.$store.commit('ponds/setOwnerId',newItem.owner.id)
                this.$store.commit('ponds/setProduct',newItem.product.name)
                this.$store.commit('ponds/setProductId',newItem.product.id)
                this.$store.commit('ponds/setProductOutput',newItem.productOutput)
                this.$store.commit('ponds/setLng',newItem.position.lng)
                this.$store.commit('ponds/setLat',newItem.position.lat)
                this.$store.commit('ponds/setEstimateArea',newItem.estimateArea)
                this.$store.commit('ponds/setPondsType',newItem.pondsType)
                this.$store.commit('ponds/setArea',newItem.area)
                this.$store.commit('ponds/setCounty',newItem.county)
                this.$store.commit('ponds/setTown',newItem.town)
                this.$store.commit('ponds/setVillage',newItem.village)
                this.$store.commit('ponds/setPolygon',newItem.polygon)
                this.$store.commit('ponds/setComment',newItem.comment)
                this.$store.commit('ponds/setCheckStatus',0)
                
                setTimeout(()=>{
                    this.show = true
                    //设置当前查看的图形id
                    this.id=newItem.id
                    this.$store.commit('ponds/setId',newItem.id)
                },100)

            }else{
                // console.log(item);
                this.infoPosition={
                    lng:item.position.lng,
                    lat:item.position.lat
                }
                if(!item.owner){
                    this.infoOwner='null'
                    this.$store.commit('ponds/setOwner','null')
                    this.$store.commit('ponds/setOwnerId',-1)
                }else{
                    this.infoOwner=item.owner
                    this.$store.commit('ponds/setOwner',item.owner.name)
                    this.$store.commit('ponds/setOwnerId',item.owner.id)
                }

                if(!item.product){
                    this.infoproduct='null'
                    this.$store.commit('ponds/setProduct','null')
                    this.$store.commit('ponds/setProductId',-1)
                }else{
                    this.infoproduct=item.product
                    this.$store.commit('ponds/setProduct',item.product.name)
                    this.$store.commit('ponds/setProductId',item.product.id)
                }
                
                
                //设置form的一系列值，传到store
                this.$store.commit('ponds/setNumber',item.number)

                this.$store.commit('ponds/setProductOutput',item.productOutput)

                this.$store.commit('ponds/setLng',item.position.lng)
                this.$store.commit('ponds/setLat',item.position.lat)
                this.$store.commit('ponds/setEstimateArea',item.estimateArea)
                this.$store.commit('ponds/setArea',item.area)
                this.$store.commit('ponds/setPondsType',item.pondsType)

                this.$store.commit('ponds/setCounty',item.county)
                this.$store.commit('ponds/setTown',item.town)
                this.$store.commit('ponds/setVillage',item.village)
                this.$store.commit('ponds/setPolygon',item.polygon)
                this.$store.commit('ponds/setComment',item.comment)
                this.$store.commit('ponds/setCheckStatus',item.checkStatus)
                

                setTimeout(()=>{
                    this.show = true
                    //设置当前查看的图形id
                    this.id=item.id
                    this.$store.commit('ponds/setId',this.id)
                    // console.log(this.$route.fullPath=this.$route.path+`id=${this.id}`);
                },100)
            }


        },

        //获取所有的镇和村
        getAllTown(){
            if(localStorage.getItem('town')){
                this.$store.commit('ponds/setTownData')
            }else{
                this.$axios({
                    url:'/api/area/getAllTown',
                    method:'GET',
                }).then(res=>{
                    if(res.data.status==200){
                        //赋值  
                        this.$store.commit('ponds/setTownData',res.data.data.data)
                    }
                })
            }
            
        },
        getALlVillage(){
            if(localStorage.getItem('village')){
                this.$store.commit('ponds/setVillageData')
            }else{
                this.$axios({
                    url:'/api/area/getAllVillage',
                    method:'GET',
                }).then(res=>{
                    if(res.data.status==200){
                        //赋值  
                        this.$store.commit('ponds/setVillageData',res.data.data.data)
                        
                    }
                })
            }
            this.afterJump()
        },


        //从allponds页面跳到addponds页面要执行的函数
        afterJump(){
            
            setTimeout(()=>{
                if(this.$route.query.id){
                    // console.log(this.$route.query.id);
                    //如果是从查看过来的就需要获取polygons，然后循环查找
                    let exist=false
                    this.Polygons.forEach((i,v)=>{
                        if(i.id==this.$route.query.id){
                            this.infoWindowOpen(i)
                            exist=true
                            return 
                        }
                    })
                    if(!exist){
                        this.$message.warning('当前池塘还在审核')
                    }
                }
            },300)
        },



        //多边形更新函数
        polygonsUpdate(e){
            if(this.EditPond){
                let paths=e.target.getPath()
                //中心点
                let position=this.getCenterPoint(paths)
                let estimateArea=this.getArea(paths)
                //更改中心点位置更改面积
                this.$store.commit('ponds/editPolygon',
                {lng:position.lng,lat:position.lat,estimateArea:estimateArea,paths:paths,id:this.id})
                this.$store.commit('ponds/setDrawingPolygon',paths)
            }
            
        },
        //以下为画图的三个函数
        syncPolygon (e) {
            if (!this.drawingPolygon.editing) {
                return
            }
            const {paths} = this.drawingPolygon
            if (!paths.length) {
                return
            }
            const path = paths[paths.length - 1]
            if (!path.length) {
                return
            }
            if (path.length === 1) {
                path.push(e.point)
            }
            this.$set(path, path.length - 1, e.point)
        },
        newPolygon (e) {
            if (!this.drawingPolygon.editing) {
                return
            }
            const {paths} = this.drawingPolygon
            if(!paths.length) {
                paths.push([])
            }
            const path = paths[paths.length - 1]
            path.pop()
            if (path.length) {
                paths.push([])
            }
            //计算出中心点，面积
            var position=this.getCenterPoint(paths[0])
            this.drawingMarker=position
            var estimateArea=this.getArea(paths[0])
            //点的路径
            var polygon=paths[0]
            //把这些值传到store，更新form值
            //同时还要在polygons中查看是否已经新增了一个数组
            //有了就更新值，不然就新增
            this.$store.commit('ponds/setLng',position.lng)
            this.$store.commit('ponds/setLat',position.lat)
            this.$store.commit('ponds/setEstimateArea',estimateArea)
            this.$store.commit('ponds/setPolygon',polygon)
            this.$store.commit('ponds/setDrawingPolygon',polygon)
            this.$store.commit('ponds/newPolygon',this.EditPond)
            //把新增的多边形path清空
            //如果不清除就会出现两个重合的多边形
            this.drawingPolygon.paths=[]
            this.drawingMarker={}
            //停止绘制
            this.$store.commit('ponds/setAddPond',false)

        },
        paintPolygon (e) {
            if (!this.drawingPolygon.editing) {
                return
            }
            const {paths} = this.drawingPolygon
            !paths.length && paths.push([])
            paths[paths.length - 1].push(e.point)
            
        }
    },
    computed:{
        Polygons(){
            return this.$store.state.ponds.polygons
        },
        AddPond(){
            return this.$store.state.ponds.addPond
        },
        EditPond(){
            return this.$store.state.ponds.editPond
        },
        Center(){
            return this.$store.state.ponds.center
        },
        ClickFn(){
            return this.$store.state.ponds.clickFn
        },
        Id(){
            return this.$store.state.ponds.id
        },
        router(){
            return this.$route.query
        },

    },
    watch:{
        AddPond(n){
            this.drawingPolygon.editing=n
            if(n){
                this.show=false
                //如果当前有选中的id不为新增的池塘或者当前id不存在
                //还要清空store中的form表
                if(this.Id==''){

                }else{
                    this.$store.commit('ponds/clearForm')
                }
                
                
            }
        },
        EditPond(n){
            this.editPond=n
            if(n){
                // console.log(n,'编辑模式');
                this.show=false
                setTimeout(()=>{
                    this.$store.commit('ponds/setEditing',{id:this.id,editing:true})
                },100)
                this.$store.commit('ponds/ResetDrawingPolygon')
                
            }else{
                // console.log(n,'停止编辑模式');
                //全部设置为false
                this.$store.commit('ponds/setEditingFalse')
                
            }
        },
        Center(n){
            this.center=n
        },
        show(n){
            if(n){
                this.$store.commit('ponds/setClickFn',true)
                this.$store.commit('ponds/ResetDrawingPolygon')
            }
        },
        router(n){
            console.log(n);
        }
    },
    created(){
        this.getPonds()
    },
    destroyed(){
        this.$store.commit('ponds/clearForm')
        this.$store.commit('ponds/setCenter')
        this.$store.commit('ponds/setAddPond',false)
        this.$store.commit('ponds/setEditPond',false)
        this.$store.commit('ponds/setClickFn',false)
        this.$store.commit('ponds/clearDrawinfPolygon')
        this.$store.commit('ponds/clearPolygons')
        this.$store.commit('ponds/clearAllPonds')




    },
}
</script>

<style lang="less" scoped>
    .addMap{
        width: 100%;
        height: 100%;
        .map{
            width: 100%;
            height: 100%;
        }
    }

    .infoNone{
        display: none;
        opacity: 0;
    }
</style>