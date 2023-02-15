<template>
    <div class="mainContent">

        <el-card class="card">

            <div slot="header" class="clearfix">
                <span>讨论</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>

            <el-card class="discussion" v-for="(item,index) in discussionList" :key="index" >
                <div class="card-container">
                    <div class="left">
                        <div class="title">
                            <span class="text" @click="goReply(item.id)">{{item.title}}</span>
                        </div> 
                        <div class="content">
                            {{item.content}}
                        </div>
                    </div>
                    <div class="right">
                        <div class="time">{{item.time}}</div>
                        <el-popover
                            placement="top-start"
                            title="Username"
                            :width="200"
                            trigger="hover"
                            :content="item.user.name"
                            class="username"
                        >
                            <template #reference>
                                <el-button class="m-2">发起人:{{item.user.name}}</el-button>
                            </template>
                        </el-popover>

                        <div class="delete" @click="deleteDiscussion(item.id)">删除</div>
                    </div>
                </div>
                
            </el-card>
        </el-card>

            <!--  分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="DCurrentPage"
                :page-size="DPageSize"
                :page-sizes="[5,10]"
                layout="total,sizes, prev, pager, next"
                :total="DiscussionLength"
                class="pagination">
                
            </el-pagination>

    </div>
</template>

<script>
export default {
    name:'mainContent',
    data(){
        return{
            discussionList:[],

        }
    },
    methods:{
        getDiscussion(){

            this.$axios({
                url:'/api/discussion/getAll',
                method:"GET"
            }).then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    this.discussionList=res.data.data.data.slice((this.DCurrentPage-1)*this.DPageSize,this.DCurrentPage*this.DPageSize)
                    //store
                    this.$store.commit('discussion/setDiscussionList',res.data.data.data)
                    //setuser
                    this.getUid()
                }

            })
        },
        handleSizeChange (size) {

            this.discussionList=this.Discussion.slice((this.DCurrentPage-1)*size,this.DCurrentPage*size)
            this.$store.commit('discussion/setDPageSize',size)
        },
        handleCurrentChange (currentPage) {

            this.discussionList=this.Discussion.slice((currentPage-1)*this.DPageSize,currentPage*this.DPageSize)
            this.$store.commit('discussion/setDCurrentPage',currentPage)

        },
        goReply(id){
            
            //传递did和是否显示回复
            this.$store.commit('discussion/setDid',id)
            this.$store.commit('discussion/setShowReply',true)

        },
        getUid(){
            this.$axios({
                url:'/api/user/user',
                method:'GEt'
            }).then(res=>{

                if(res.data.status==200){
                    this.$store.commit('discussion/setUid',res.data.data.data.id)
                    this.$store.commit('discussion/setAdmin',res.data.data.data.isAdmin)
                    this.$store.commit('discussion/setName',res.data.data.data.name)

                }
                
            })
        },
        deleteDiscussion(id){
            this.$confirm('此操作将永久删除该讨论, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let data=this.qs.stringify({
                    id:id
                })
                this.$axios({
                    url:'/api/discussion/delete',
                    method:"POST",
                    data:data
                }).then(res=>{
                    console.log(res.data);

                    if(res.data.status==200){
                        this.$message.success('删除成功');
                    }
                })
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });       
            })

        },

    },
    created(){
        this.getDiscussion()
    },
    mounted(){
        // this.ConnectWebSocket()
    },
    computed:{
        Discussion(){
            return this.$store.state.discussion.discussionList
        },
        DiscussionLength(){
            return this.$store.state.discussion.discussionList.length
        },
        DCurrentPage(){
            return this.$store.state.discussion.DCurrentPage
        },
        DPageSize(){
            return this.$store.state.discussion.DPageSize
        },
    },
    watch:{
        DiscussionLength(n,o){
            let left=(this.DiscussionLength%this.DPageSize)//是否为0
            let currentPages=Math.floor(this.DiscussionLength/this.DPageSize)
            if(left!=0){
                currentPages+=1
            }
            this.discussionList=this.Discussion.slice((currentPages-1)*this.DPageSize,currentPages*this.DPageSize)
            this.$store.commit('discussion/setDCurrentPage',currentPages)
            
        }
    }

}
</script>

<style lang="less" scoped>
    .mainContent{
        position: relative;
        width: 100%;
        height: 100%;

        .card{
            position: relative;
            width: 100%;
            height: 100%;
            overflow-y: scroll;
        }
    }

    .card > ::v-deep .el-card__body{
        padding:0;
    }

    .discussion{

        width: 100%;
        background-color: #f5f5f5;
        .card-container{
            display: flex;
            flex-direction: row;

            .left{
                flex:1;
            }
            .right{
                position:relative;
                width: 150px;
            }
        }
        .title{
            font-size:24px;
            font-weight: 900;
        }
        .content{
            font-size:16px;
            padding:10px;
        }
        .text:hover{
            color:rgb(64, 119, 222);
            text-decoration:underline;
        }
        .time{
            position:absolute;
            bottom:-10px;
            right:0;
            width: 120px;
            font-weight: 200;
            font-size: 10px;
            color:rgba(0,0,0,.8)
        }
        .username{
            position:absolute;
            top:-10px;
            left:0;
            width: 110px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            ::v-deep .el-button{
                padding:0;
                background-color: #f5f5f5;
                border:none;
                span{
                    width:110px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow:ellipsis;
                }
            }
        }
        .delete{
            position:absolute;
            right:0px;
            top:-10px;
            color:rgb(214, 91, 54);
            cursor: pointer;
        }
        .delete:hover{
            text-decoration: underline;
        }
    }

    .pagination{
        position:absolute;
        bottom:-35px;
        z-index:999;
    }
</style>