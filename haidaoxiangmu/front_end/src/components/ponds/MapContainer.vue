<template>
    <div class="mapContainer">
        <!-- 控件，用于修改地图的一系列信息 -->
        <!-- <Control></Control> -->
        <!-- 地图 -->
        <Map></Map>


    </div>
</template>

<script>
import Map from './Map.vue'
import Control from './Control.vue'

export default {
    name:'MapContainer',
    data(){
        return{

        }
    },
    components:{
        Map,
        Control
    }
}
</script>

<style lang='less' scoped>
    .mapContainer{
        display: flex;
    }
</style>