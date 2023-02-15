<template>
    <div class="area">
        <el-form ref="form" :model="form">
            <el-form-item label="所在区">
                <el-select v-model="county" placeholder="请选择所在区/县">
                    <el-option
                        v-for="item in countyOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所在镇" >
                <el-select v-model="town" placeholder="请选择所在镇" :disabled='county==""?true:false'>
                    <el-option
                        v-for="item in townOption"
                        :key="item.id"
                        :label="item.town"
                        :value="item.id">
                    </el-option>
                </el-select>
                <!-- <el-input  v-model="form.town" @input='updateForm(form.town,"setTown")' placeholder="请输入所在镇"></el-input> -->
            </el-form-item>
            <el-form-item label="所在村">
                <el-select v-model="village" placeholder="请选择所在村" :disabled='county==""||town==""?true:false'>
                    <el-option
                        v-for="item in villageOption"
                        :key="item.id"
                        :label="item.village"
                        :value="item.id">
                    </el-option>
                </el-select>
                <!-- <el-input  v-model="form.village" @input='updateForm(form.village,"setVillage")' placeholder="请输入所在村"></el-input> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name:'area',
    data(){
        return{
            form:{

            },

        }
    },
    methods:{
        //获取镇和村
        getTown(){
            let data=this.qs.stringify({
                countyId:this.county,
            })

            this.$axios({
                url:'/api/area/getTown',
                method:'POST',
                data:data
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.townOption=res.data.data.data
                }
            })
        },
        getVillage(){

            let data=this.qs.stringify({
                Tid:this.town,
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
    }
}
</script>

<style lang='less' scoped>

</style>