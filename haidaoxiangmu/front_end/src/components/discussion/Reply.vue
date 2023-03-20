<template>
    <div class="reply">
        <el-card class="card">
            <div slot="header" class="clearfix">
                <span style="font-size:28px;font-weight:900;">{{discussion.title}}</span>
                <el-button @click="close" style="float: right; padding: 3px 0" type="text">
                    <i class="el-icon-close"></i>
                </el-button>

            </div>
            <!-- 无回复展示 -->
            <div v-show="HasReply==false" class="no-reply">
                <span>还没有人回复这个帖子,您可以</span>
                <el-button type='text' @click="openDialog">发送</el-button>
            </div>

            <el-card class="reply-card" v-for="(item,index) in replyList" :key="index">
                <div class="username">
                    {{item.user.name}}
                </div>
                <div class="content" v-html="item.content"></div>

                <!-- 回复的回复 -->
                <div v-if="item.rid" class="reply-reply">
                    <div class="username">
                        回复给:{{item.fatherUser.name}}
                    </div>
                    <div class="content" v-html="item.fatherReply.content"></div>
                    
                </div>

                <div class="time">
                    {{item.time}}
                </div>
                <span v-if="item.user.id==Uid||IsAdmin==1" class="delete-reply" @click='deleteReply(item.id)'>
                    删除
                </span>
                <span class="send-reply" @click='sendReply(item.id)'>
                    回复
                </span>
                <span class="update-reply" @click='updateReply(item.id)'>
                    修改
                </span>

            </el-card>

        </el-card>


        <!--  分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="RCurrentPage"
            :page-size="RPageSize"
            :page-sizes="[5,10]"
            layout="total,sizes, prev, pager, next"
            :total="ReplyListLength"
            class="pagination">
            
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:'reply',
    data(){
        return{
            discussion:{},
            replyList:[],
        }
    },
    methods:{
        getReply(){

            this.$axios({
                url:`/api/discussion/get?id=${this.Did}`,
                method:"GET"
            }).then(res=>{
                console.log(res.data.data);

                if(res.data.status==200){
                    this.discussion=res.data.data.data
                    if(res.data.data.reply.length==undefined){

                        this.$store.commit('discussion/setHasReply',false)
                        
                    }else{

                        this.$store.commit('discussion/setHasReply',true)

                        this.replyList=res.data.data.reply.slice((this.RCurrentPage-1)*this.RPageSize,this.RCurrentPage*this.RPageSize)

                        //reply 上传 store 在store修饰具体信息
                        this.$store.commit('discussion/setReplyList',res.data.data.reply)

                    }
                }

            })
        },
        close(){
            this.$store.commit('discussion/setShowReply',0)
            this.$store.commit('discussion/setReplyList',[])
            this.$store.commit('discussion/setRCurrentPage',1)
        },
        sendReply(id){
            this.$store.commit('discussion/setDialogVisible',true)
            this.$store.commit('discussion/setRId',id)
            this.$store.commit('discussion/setShowReply',2)
            this.$store.commit('discussion/setContent','')
        },
        deleteReply(id){

            this.$confirm('此操作将永久删除该回复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let data=this.qs.stringify({
                    id:id
                })
                this.$axios({
                    url:'/api/reply/delete',
                    method:"POST",
                    data:data
                }).then(res=>{
                    console.log(res.data);

                    if(res.data.status==200){
                        this.$message.success('删除成功');
                        //store中去除此评论
                        this.$store.commit('discussion/deleteReply',id)
                    }
                })
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });       
            })


        },
        updateReply(id){
            this.$store.commit('discussion/setDialogVisible',true)
            this.$store.commit('discussion/setShowReply',3)
            //获取内容
            this.ReplyList.map((item)=>{
                if(item.id==id){
                    // this.$store.commit('discussion/setTitle',item.title)
                    this.$store.commit('discussion/setContent',item.content)
                    this.$store.commit('discussion/setUpdateId',id)
                    this.$store.commit('discussion/setRId',item.rid)


                }
            })
        },
        handleSizeChange (size) {

            this.replyList=this.ReplyList.slice((this.RCurrentPage-1)*size,this.RCurrentPage*size)
            this.$store.commit('discussion/setRPageSize',size)
        },
        handleCurrentChange (currentPage) {

            this.replyList=this.ReplyList.slice((currentPage-1)*this.RPageSize,currentPage*this.RPageSize)
            this.$store.commit('discussion/setRCurrentPage',currentPage)

        },
        openDialog(){
            this.$store.commit('discussion/setDialogVisible',true)
        },
    },
    computed:{

        Did(){
            return this.$store.state.discussion.discussionId
        },
        ReplyList(){
            return this.$store.state.discussion.replyList
        },
        Uid(){
            return this.$store.state.discussion.uid
        },
        IsAdmin(){
            return this.$store.state.discussion.isAdmin
        },
        ReplyListLength(){
            return this.$store.state.discussion.replyList.length
        },
        RCurrentPage(){
            return this.$store.state.discussion.RCurrentPage
        },
        RPageSize(){
            return this.$store.state.discussion.RPageSize
        },
        HasReply(){
            return this.$store.state.discussion.hasReply
        }
    },
    created(){
        this.getReply()
    },
    watch:{
        ReplyListLength(n,o){
            let left=(this.ReplyListLength%this.RPageSize)//是否为0
            let currentPages=Math.floor(this.ReplyListLength/this.RPageSize)
            if(left!=0){
                currentPages+=1
            }
            this.replyList=this.ReplyList.slice((currentPages-1)*this.RPageSize,currentPages*this.RPageSize)
            this.$store.commit('discussion/setRCurrentPage',currentPages)
            
        }
    }
}
</script>

<style lang='less' scoped>
    .reply{
        width: 100%;
        height: 100%;
        position:relative;
        .card{
            height: 100%;
            overflow-y:scroll ;
        }
    }
    .card > ::v-deep .el-card__body{
        padding:0;
        
    }
    .reply-card{
        position:relative;
    }
    .username{
        font-size:16px;
    }
    .content{
        font-size:20px;
        font-weight: 700;
        padding:20px;
    }
    .time{
        position:absolute;
        font-size:10px;
        font-weight:200;
    }
    .send-reply{
        position:absolute;
        right:50px;
        bottom:5px;
        color:rgb(63, 81, 195);
        cursor: pointer;
    }
    .delete-reply{
        position:absolute;
        right:90px;
        bottom:5px;
        color:rgb(214, 91, 54);
        cursor: pointer;
    }
    .update-reply{
        position:absolute;
        right:10px;
        bottom:5px;
        color:rgb(63, 81, 195);
        cursor: pointer;
    }
    .send-reply:hover{
        text-decoration: underline;
    }
    .delete-reply:hover{
        text-decoration: underline;
    }
    .update-reply:hover{
        text-decoration: underline;
    }
    .reply-reply{
        padding:20px;
        margin-bottom:5px;
        background-color: #f5f5f5;
    }

    .pagination{
        position:absolute;
        bottom:-35px;
        z-index:999;
    }


    .no-reply{
        text-align: center;
        padding:10px;
        span{
            font-size:20px;
        }
        .el-button{
            font-size:20px;
        }
    }
</style>