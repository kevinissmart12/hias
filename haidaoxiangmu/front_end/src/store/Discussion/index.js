import Time from '../../api/time'
import Random from '../../api/random'
export default {
    namespaced:true,
    state:{
        //discussion
        discussionList:[],
        discussionId:'',
        //0=>添加讨论
        //1=>修改讨论
        //2=>添加回复
        //3=>修改回复
        showReply:0,

        DCurrentPage:1,
        DPageSize:5,

        //reply
        replyList:[],
        replyId:'',
        RCurrentPage:1,
        RPageSize:5,
        hasReply:true,

        //userid
        uid:'',
        isAdmin:'',
        name:'',

        //diaglog
        dialogVisible:false,
        //title content
        title:'',
        content:'',
        updateId:'',
    },
    mutations:{
        setDiscussionList(state,data){
            data.forEach((i,v)=>{
                i.time=Time.time(i.time)
            })

            state.discussionList=data
        },
        addDiscussionList(state,data){
            data.time=Time.time(data.time)
            data.user={
                'name':data.name
            }
            
            state.discussionList.push(data)
        },
        deleteDiscussion(state,id){
            state.discussionList=state.discussionList.filter((item)=>item.id!=id)

        },
        setDid(state,id){
            state.discussionId=id
        },
        setShowReply(state,data){
            state.showReply=data
        },

        //reply
        setReplyList(state,data){
            //给有rid的列中的user添加user信息
            data.forEach((i,v)=>{
                if(i.rid){
                    //再循环
                    data.forEach((subi,subv)=>{
                        //找到父回复
                        if(i.rid==subi.id){
                            i.fatherUser=subi.user
                        }
                    })
                    
                }
                i.time=Time.time(i.time)

            })
            state.replyList=data
        },
        addReplyList(state,data){
            if(data.rid){
                data.time=Time.time(data.time)
                data.fatherReply.time=Time.time(data.fatherReply.time)
            }
            
            state.replyList.push(data)
        },
        deleteReply(state,id){
                let arr=[]
                //查找所有回复，找到的回复的rid==id，
                function get(id){
                    arr.push(id)
                    state.replyList.forEach((i,v)=>{
                        if(id==i.rid){
                            get(i.id)
                        }
                    })
                }
                get(id)
                
                
                setTimeout(()=>{
                    //删除arr中的id
                    arr.forEach((i,v)=>{
                        state.replyList=state.replyList.filter((item)=>item.id!=i)
                    })
                },100)
                

        },
        //reply-id
        setRId(state,id){
            state.replyId=id
        },
        setHasReply(state,data){
            state.hasReply=data
        },
        

        setUid(state,id){
            state.uid=id
        },
        setAdmin(state,num){
            state.isAdmin=num
        },
        setName(state,str){
            state.name=str
        },


        //page
        setDCurrentPage(state,num){
            state.DCurrentPage=num
        },
        setDPageSize(state,num){
            state.DPageSize=num
        },
        setRCurrentPage(state,num){
            state.RCurrentPage=num
        },
        setRPageSize(state,num){
            state.RPageSize=num
        },


        //dialog
        setDialogVisible(state,data){
            state.dialogVisible=data
        },
        setTitle(state,data){
            state.title=data
        },
        setContent(state,data){
            state.content=data
        },
        setUpdateId(state,data){
            state.updateId=data
        }
    }

}