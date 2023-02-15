<template>
    <div class="side">
        工具
        <el-button @click="open">{{this.buttonTitle}}</el-button>


        <el-dialog
        :title="title"
        :visible.sync="DialogVisible"
        width="50%"
        :before-close="close">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item v-if="!ShowReply" label="标题">
                    <el-input placeholder="请输入标题" v-model.trim="form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input :rows="5" placeholder="请输入内容" type="textarea" v-model.trim="form.content"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>

        </el-dialog>




    </div>
</template>

<script>
import Random from '../../api/random'
export default {
    data(){
        return{
            form:{
                title:'',
                content:'',
            },
            dialogVisible: false,
            title:'添加新讨论',
            buttonTitle:'发起新讨论',

        }
    },
    methods:{
        open(){
            this.$store.commit('discussion/setDialogVisible',true)
        },
        close() {
            this.$store.commit('discussion/setDialogVisible',false)
            this.$store.commit('discussion/setRId','')

        },
        submit(){
            let tempData={
                title:this.form.title,
                content:this.form.content,
                time:new Date(),
                uid:this.Uid,
                did:this.Did,
                rid:this.Rid,
                name:this.Name,
                
            }
            let data=this.qs.stringify(tempData)


            if(this.ShowReply){

                this.$axios({
                    url:'/api/reply/add',
                    method:"POST",
                    data:data
                }).then(res=>{
                    console.log(res.data);

                    if(res.data.status==200){
                        this.$store.commit('discussion/setDialogVisible',false)
                        this.$store.commit('discussion/setHasReply',true)
                        this.$store.commit('discussion/setRId','')

                        this.$message.success('回复成功');

                        let id=res.data.data.id
                        this.getReply(id)
                    }
                    
                })

            }else{
                this.$axios({
                    url:'/api/discussion/add',
                    method:"POST",
                    data:data
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status==200){
                        this.$store.commit('discussion/setDialogVisible',false)

                        this.$message.success('发起讨论成功');
                        //store添加
                        tempData.id=res.data.data.id
                        this.$store.commit('discussion/addDiscussionList',tempData)
                    }
                    
                })
            }

        },

        //获取刚发出的品论
        getReply(id){

            this.$axios({
                url:`/api/reply/get?id=${id}`,
                method:"GET"
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.$store.commit('discussion/addReplyList',res.data.data.data)
                }
            })
        }


    },
    created(){

    },
    mounted(){

    },
    computed:{
        ShowReply(){
            return this.$store.state.discussion.showReply
        },
        Did(){
            return this.$store.state.discussion.discussionId
        },
        Rid(){
            return this.$store.state.discussion.replyId
        },
        Uid(){
            return this.$store.state.discussion.uid
        },
        Name(){
            return this.$store.state.discussion.name
        },

        DialogVisible(){
            return this.$store.state.discussion.dialogVisible
        },
    },
    watch:{
        ShowReply(n,o){
            if(n){
                this.title='发送回复'
                this.buttonTitle='发送回复'
            }else{
                this.title='添加新讨论'
                this.buttonTitle='发起新讨论'
            }
        },
    }
}
</script>

<style lang="less" scoped>

</style>