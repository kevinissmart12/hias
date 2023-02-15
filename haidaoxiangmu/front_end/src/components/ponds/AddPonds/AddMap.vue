<template>
    <div class="addMap">
        <baidu-map  :scroll-wheel-zoom="true" class="map" :center="center" :zoom="zoom" @ready="handler" map-type="BMAP_HYBRID_MAP"
            @click="paintPolygon" @mousemove="syncPolygon" @rightclick="newPolygon"
        >

            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>

            <bm-marker 
                v-for="(item) in Polygons"
                :key="item.lat"
                :position="item.position" 
                @click="infoWindowOpen(item)"
            >
            </bm-marker>

                <bm-info-window 
                    
                    :position="infoPosition"
                    :show="show" 
                    @close="infoWindowClose"
                    :offset="infosize"
                >
                    <div>当前池塘详细信息：</div>
                    <div>池塘负责人：{{infoOwner.name}}</div>
                    <div>养殖品种：<el-button @click="goProduct(infoproduct.id)" type="text">{{infoproduct.name}}</el-button></div>
                    <el-button type="text">查看该池塘详细信息</el-button>
                </bm-info-window>



            <bm-polygon 
                
                v-for="(item,index) in Polygons" 
                :key="index" 
                :path="item.polygon"
                :editing="item.editing"
                @lineupdate='polygonsUpdate'
            ></bm-polygon>
            
            <bm-polygon 
                :editing='drawingEditing' 
                :path="path" 
                v-for="path,index of drawingPolygon.paths" 
                :key='index+65535'
                @lineupdate="polygonUpdate"
            ></bm-polygon>
            <bm-marker v-if="drawingMarker" :position='drawingMarker' ></bm-marker>
        </baidu-map>
    </div>
</template>

<script>
export default {
    name:"addMap",
    data(){
        return {
            //地图初始配置
            center: {lng: 0, lat: 0},
            zoom: 3,
            marker:{},
            position:{lng: 0, lat: 0},
            draggable:false,
            //infowindow展示
            show:false,
            //infowindow编辑时消失
            opacity:true,
            infosize:{width:0,height:0},
            //需要绘制的图行
            drawingPolygon: {
                editing: false,
                paths: []
            },
            drawingMarker:{},
            //当前绘制的多边形是否能编辑
            drawingEditing:false,

            //infowindow
            infoPosition:{},
            infoOwner:'',
            infoproduct:'',
            id:'',

        }
    },
    methods:{

        drawEdit(){
            this.drawingEditing=true
        },
        polygonUpdate(e){
            
            this.drawingPolygon.paths[0]=e.target.getPath()
            
        },
        polygonsUpdate(e){
            if(this.EditingPonds){
                let paths=e.target.getPath()
                this.$store.commit('ponds/setDrawingPolygon',paths)
                //中心点
                let lng=0
                let lat=0
                paths.forEach((i,v)=>{
                    lng=lng+i.lng
                    lat=lat+i.lat
                })
                lng=lng/paths.length
                lat=lat/paths.length

                this.$store.commit('ponds/setMarker',{lng:lng,lat:lat})
                //更改中心点位置
                this.$store.commit('ponds/setPolygonCenterMarker',{lng:lng,lat:lat,id:this.id})


                //面积
                let Arr=[]
                //把paths转化成需要的数组形式,paths里现在是对象
                paths.forEach((i,v)=>{
                    let arr=[]
                    arr.push(i.lng)
                    arr.push(i.lat)
                    Arr.push(arr)
                })
                Arr.push([
                    paths[0].lng,
                    paths[0].lat
                ])

                var p=this.turf.polygon([Arr])
                // 平方米
                var area=this.turf.area(p)
                // 亩
                var mu=area/(1000*2/3)
                //store
                this.$store.commit('ponds/setEstimateArea',mu)

            }
            
        },


        paintPolygon (e) {
            if (!this.drawingPolygon.editing) {
                return
            }
            const {paths} = this.drawingPolygon

            !paths.length && paths.push([])

            paths[paths.length - 1].push(e.point)


        },
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
            // this.getCenterPoint()
            // this.getArea()
            //此后为编辑模式
            this.$store.commit('ponds/setDrawing',2)
            
            
        },
        // 初始化地图参数
        handler ({BMap, map}) {
            // console.log(BMap, map)
            this.center.lng = 122.048
            this.center.lat = 29.9424
            this.zoom = 16

            this.position.lng = 122.048
            this.position.lat = 29.9424

            this.draggable=true

        },
        infoWindowClose () {
            this.show = false
            //全部设置为false
            this.$store.commit('ponds/setEditingFalse')
            if(!this.EditingPonds){
                this.$store.commit('ponds/setId','')
            }
            

        },
        infoWindowOpen (item) {

            this.infoPosition={
                lng:item.position.lng,
                lat:item.position.lat
            }
            this.infoOwner=item.owner
            this.infoproduct=item.product
            this.id=item.id
            setTimeout(()=>{
                this.show = true
                this.$store.commit('ponds/setId',item.id)
            },100)

            this.$store.commit('ponds/setMarker',item.position)
            this.$store.commit('ponds/setEstimateArea',item.estimateArea)
            this.$store.commit('ponds/setArea',item.area)
            this.$store.commit('ponds/setTown',item.town)
            this.$store.commit('ponds/setVillage',item.village)
            this.$store.commit('ponds/setComment',item.comment)
            this.$store.commit('ponds/setNumber',item.number)

            
            //owner/product
            this.$store.commit('ponds/setOwnerMarker',item.owner)
            this.$store.commit('ponds/setProductMarker',item.product)


        },


        //获取池塘
        getPonds(){
            this.$axios({
                url:'/api/ponds/getAll',
                methods:'GET'
            }).then(res=>{
                console.log(res.data.data);
                if(res.data.status==200){
                    this.$store.commit('ponds/setPolygons',res.data.data.data)
                }
            })
        },
        goProduct(id){

            // console.log(id);
            this.$router.push({
                path:`/products/add?id=${id}`
            })
        },

        //计算中心点
        getCenterPoint(){
            const {paths} = this.drawingPolygon
            //添加marker
            //计算中心点
            let lng=0
            let lat=0

            paths[0].forEach((i,v)=>{
                lng=lng+i.lng
                lat=lat+i.lat
            })
            
            lng=lng/paths[0].length
            lat=lat/paths[0].length
            let drawingObj={
                lng:lng,
                lat:lat
            }
            this.drawingMarker=drawingObj
            this.$store.commit('ponds/setMarker',this.drawingMarker)
        },
        //计算面积
        getArea(){
            let paths=this.drawingPolygon.paths[0]

            let Arr=[]
            //把paths转化成需要的数组形式,paths里现在是对象
            paths.forEach((i,v)=>{
                let arr=[]
                arr.push(i.lng)
                arr.push(i.lat)
                Arr.push(arr)
            })
            Arr.push([
                paths[0].lng,
                paths[0].lat
            ])

            var p=this.turf.polygon([Arr])
            // 平方米
            var area=this.turf.area(p)
            // 亩
            var mu=area/(1000*2/3)
            //store
            this.$store.commit('ponds/setEstimateArea',mu)
        },
        //新池塘上传store
        getDrawingPolygon(){
            this.$store.commit('ponds/setDrawingPolygon',this.drawingPolygon.paths[0])
        },

        pondsEditing(id){
            
            //使当前点击的点的editing=true
            this.$store.commit('ponds/setEditing',{id:id,editing:true})

        }
    },
    created(){
        this.getPonds()
    },
    mounted(){

    },
    computed:{
        
        Drawing(){
            return this.$store.state.ponds.drawing
        },
        EditingPonds(){
            return this.$store.state.ponds.editingPonds
        },
        Polygons(){
            return this.$store.state.ponds.polygons
        },
        Id(){
            return this.$store.state.ponds.id
        },


    },
    watch:{
        Drawing(n,o){
            if(n==0){
                this.drawingPolygon.editing=false

            }else if(n==1){
                this.drawingPolygon.editing=true
                //把store中的一些值清空
                this.$store.commit('ponds/setNumber','')
                this.$store.commit('ponds/setOwnerMarker',{})
                this.$store.commit('ponds/setProductMarker',{})
                this.$store.commit('ponds/setMarker','')
                this.$store.commit('ponds/setEstimateArea','')
                this.$store.commit('ponds/setArea','')
                this.$store.commit('ponds/setTown','')
                this.$store.commit('ponds/setVillage','')
                this.$store.commit('ponds/setComment','')
                this.$store.commit('ponds/setId','')

                //如果info window是开着的，就关掉
                if(this.show){
                    this.show=false
                }

            }else if(n==2){
                this.drawingEditing=false
                this.drawingPolygon.editing=false
                //计算中心点
                this.getCenterPoint()
                //计算面积
                this.getArea()
                //新池塘上传store
                this.getDrawingPolygon()

            }else if(n==3){
                this.drawingEditing=true
                this.drawingPolygon.editing=false

            }
        },
        EditingPonds(n,o){
            if(n){
                console.log(n,'编辑模式');
                this.show=false
                setTimeout(()=>{
                    this.$store.commit('ponds/setEditing',{id:this.id,editing:true})
                },100)
                


            }else{
                console.log(n,'停止编辑模式');
                //全部设置为false
                this.$store.commit('ponds/setEditingFalse')
                //保存,获取当前池塘的点和polygons


            }
        },

    }
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