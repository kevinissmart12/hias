<template>
    <div class="discussion">
        <el-container>
            <el-aside width="250px" style="padding-top:20px;">
                <Side></Side>
            </el-aside>
            <el-main>

                <transition name="el-fade-in-linear">
                    <Main v-if="ShowReply==0||ShowReply==1"></Main>
                </transition>

                <transition name="el-fade-in-linear">
                    <Reply v-if="ShowReply==2||ShowReply==3"></Reply>
                </transition>

            </el-main>
        </el-container>
    </div>
</template>

<script>
import Side from '../components/discussion/Side.vue'
import Main from '../components/discussion/Main.vue'
import Reply from '../components/discussion/Reply.vue'

export default {
    name:'discussion',
    data(){
        return{

        }
    },
    methods:{
        
    },
    created(){
        
    },
    mounted(){
        
    },
    components:{
        Side,
        Main,
        Reply
    },
    computed:{
        ShowReply(){
            return this.$store.state.discussion.showReply
        },
    }
}
</script>

<style lang="less" scoped>
    .discussion{
        width: 100%;
        height: 100%;
    }
    .el-main{
        padding-bottom:35px;
    }
</style>