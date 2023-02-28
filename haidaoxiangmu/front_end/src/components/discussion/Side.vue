<template>
    <div class="side">
        工具
        <el-button @click="open">{{this.buttonTitle}}</el-button>


        <el-dialog
        :title="title"
        :visible.sync="DialogVisible"
        width="60%"
        :before-close="close">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item v-if="ShowReply==0||ShowReply==1" label="标题">
                    <el-input placeholder="请输入标题" v-model.trim="form.title"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <div style="border: 1px solid #ccc;">
                        <Toolbar
                            style="border-bottom: 1px solid #ccc"
                            :editor="editor"
                            :defaultConfig="toolbarConfig"
                            :mode="mode"
                        />
                        <Editor
                            style="height: 400px; overflow-y: hidden;"
                            v-model="form.content"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onCreated="onCreated"
                        />
                    </div>
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
import Time from '../../api/time'

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
            //以下为富文本插件的参数
            editor: null,
            html: '<p>hello</p>',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'

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
                id:this.UpdateId,
                
            }
            let data=this.qs.stringify(tempData)

            if(this.ShowReply==0){
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
            }else if(this.ShowReply==1){
                
                this.$axios({
                    url:'/api/discussion/update',
                    method:"POST",
                    data:data
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status==200){
                        this.$message.success('修改成功');
                        this.$store.commit('discussion/setDialogVisible',false)
                        //修改讨论
                        this.Discussion.map((item)=>{
                            if(item.id==tempData.id){
                                item.title=tempData.title
                                item.content=tempData.content
                                item.time=Time.time(tempData.time)
                            }
                        })
                    }
                })
            }else if(this.ShowReply==2){
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
            }else if(this.ShowReply==3){
                this.$axios({
                    url:'/api/reply/update',
                    method:"POST",
                    data:data
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status==200){
                        this.$message.success('修改成功');
                        this.$store.commit('discussion/setDialogVisible',false)
                        //修改讨论
                        this.ReplyList.map((item)=>{
                            if(item.id==tempData.id){
                                item.content=tempData.content
                                item.time=Time.time(tempData.time)
                            }
                        })
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
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },


    },
    created(){

    },
    mounted(){

    },
    beforeDestroy() {
        const editor = this.editor

        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
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
        Title(){
            return this.$store.state.discussion.title
        },
        Content(){
            return this.$store.state.discussion.content
        },
        UpdateId(){
            return this.$store.state.discussion.updateId
        },
        Discussion(){
            return this.$store.state.discussion.discussionList
        },
        ReplyList(){
            return this.$store.state.discussion.replyList
        },
    },
    watch:{
        ShowReply(n,o){
            if(n==0){
                this.title='添加新讨论'
                this.buttonTitle='发起新讨论'
            }else if(n==1){
                this.title='修改讨论'
            }else if(n==2){
                this.title='添加回复'
                this.buttonTitle='发起回复'
            }else if(n==3){
                this.title='修改回复'
            }
        },
        Title(n,o){
            this.form.title=n
            
        },
        Content(n,o){
            this.form.content=n

        }
    }
}
</script>

<style lang="less" scoped>

</style>