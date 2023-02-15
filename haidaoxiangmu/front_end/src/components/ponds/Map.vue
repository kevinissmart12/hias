<template>
    <div class="Map">

        <!-- 地图，不用动它 -->
        <div class="map" id="map"></div>

        <button @click="startEdit">编辑</button>
        <button @click="endEdit">停止</button>

    </div>
</template>

<script>

export default {
    name: 'HelloWorld',
    data(){
        return{
            map:{},
            //用于创建地图初始坐标
            allMapPoint:{
                x:122.0478587026,
                y:29.942425790241312
            },
            //多边图行中间点,
            //只有点击图行时，才出现
            //当有多个图行时，最多只出现一个
            centerPoint:{
                x:122.0478587026,
                y:29.942425790241312,
            },
            //centerpoint marker
            centerPointMarker:{},
            //以,;来判断点，最后一组数据不能有;
            points:['122.0452438546,29.94264534284173;122.0457689541,29.942290903455056;122.0448565938,29.940878850006936;122.0442264745,29.94178210920206'],
            //多边形
            polygon:{},
            polygonLength:0,
        }
    },
    methods:{

        CreateMap(){
            this.map = new BMapGL.Map("map");          // 创建地图实例   需要容器的id
            var point = new BMapGL.Point(this.allMapPoint.x,this.allMapPoint.y);  // 创建点坐标 
            this.map.centerAndZoom(point, 15);     //初始化地图，设置中心点坐标和地图级别
            this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

            this.map.addEventListener('click', function (e) {
                console.log('点击位置经纬度：' + e.latlng.lng+ ',' + e.latlng.lat);
            });

            //控件偏移参数
            var opts = {
                offset: new BMapGL.Size(10, 10)
            }
            //以下为缩放控件，这是必备的
            var zoomCtrl = new BMapGL.ZoomControl(opts);  // 添加缩放控件
            this.map.addControl(zoomCtrl)

            this.map.setMapType(BMAP_SATELLITE_MAP);      // 设置地图类型为地球模式

        },
        endEdit(){
            this.polygon.disableEditing();

            //修改这个多边图行的点数
            this.polygonLength=this.polygon.points.length
            this.setCenterPoint()

            //将当前图形信息上传后端

        },
        startEdit(){
            this.polygon.enableEditing();
        },


        //设置图行中间点
        setCenterPoint(){
        
            //remove 旧的点
            if(this.centerPointMarker.point!=undefined){
                //存在旧的点
                this.map.removeOverlay(this.centerPointMarker)
            }
            //根据polygon的多组坐标=>求出平均点，而且这个点必须存在于多边形中

            this.getCenterPoint()

            //用于在地图上显示渔场的中间坐标 
            var centerPoint = new BMapGL.Point(this.centerPoint.x,this.centerPoint.y);  // 创建点坐标 
            
            this.centerPointMarker = new BMapGL.Marker(centerPoint, {
                //是否能都移动
                enableDragging: false
            });        
            // 创建标注   
            this.map.addOverlay(this.centerPointMarker); 
            this.centerPointMarker.addEventListener("click", function(e){   
                console.log(e);  
            });

        },
        //初始化已存在的多边图行
        setPolygon(callback){
            //初始化已存在的多边图行
            this.polygon = new BMapGL.Polygon(this.points, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
            this.map.addOverlay(this.polygon);
            this.polygon.enableEditing();
            this.polygonLength=this.polygon.points.length
            
            if(typeof callback=='function'){
                callback()
            }
        },

        //求出多边形中间顶
        getCenterPoint(){
            //存在中心和重心在图形外面的情况
            //先用点之间的平均值来求
            //获取当前多边形所有的点
            // console.log(this.polygon.points);
            var list=Array.from(this.polygon.points)
            var totalX=0
            var totalY=0
            var length=list.length
            //此时新添加的点
            list.forEach((i,v)=>{
                
                if(i.latLng==undefined){
                    //百度地图提供的api 墨卡托坐标转经纬度
                    let latLngResult=this.map.mercatorToLnglat(i.lng,i.lat)
                    //给该点加入坐标
                    i.latLng={
                        lat:latLngResult[1],
                        lng:latLngResult[0]
                    }


                }
                //把坐标的值加入到总的值中
                totalX+=i.latLng.lng
                totalY+=i.latLng.lat

            })
            this.centerPoint.x=totalX/length
            this.centerPoint.y=totalY/length

        },


    },
    mounted() {
        this.CreateMap()
        this.setPolygon(()=>{
            this.setCenterPoint()
        })
        
    },

    }
</script>

<style scoped lang="less">
    .Map{
        width: 100%;
        height: 100%;
    }

    .map{
        width: 100%;
        height: 100%;

    }
</style>
