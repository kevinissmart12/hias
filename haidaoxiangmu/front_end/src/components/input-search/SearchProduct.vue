<template>
    <div class="search-box" :class="ShowList?'':'listShow'">
        <div class="search" :class="overLength?'overLength':''">
            <div class="search_list"  v-for="(item,index) in list" :key="index" @click="select(item)">
                {{item.name}}
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name:'search',
    props:{
        list:[]
    },
    data(){
        return{
            overLength:false,
        }
    },
    methods: {
        select(item){
            // console.log(item);
            this.$emit('getSelectedItem',item)
            this.$store.commit('search/setShowListProduct',false)
        }
    },
    computed:{
        ShowList(){
            return this.$store.state.search.showListProduct
        }
    },
    watch:{
        list(){
            if(this.list){
                this.$store.commit('search/setShowListProduct',true)
                if(this.list.length>5){
                    this.overLength=true
                }else{
                    this.overLength=false
                }
            }else{
                this.$store.commit('search/setShowListProduct',false)

            }
            
        }
    }
}
</script>

<style lang="less" scoped>
    .search{
        position: absolute;
        width: 100%;
        background-color: #fff;
        border:1px solid rgba(0,0,0,.2);
        z-index:10;
        .search_list{
            padding-left:20px;
            border-bottom: 1px solid rgba(0,0,0,.1);
        }
        .search_list:hover{
            background-color: #f5f5f5;
            cursor: pointer;
        }
    }

    .listShow{
        display: none;
    }

    .overLength{
        height: 205px;
        overflow-y: scroll;
    }

</style>