var express = require('express');
var router = express.Router();
//数据库
var db = require('../db/index')
//discussion sql模块
var discussion = require('../db/discussion/discussion')
//reply sql模块
var reply = require('../db/reply/reply')
//user sql模块
var user = require('../db/user/user')
//增加新的 discussion
//输入除了id以外的其他信息
//需要token
router.post('/add',function(req,res,next){
    const discussionInfo= req.body
    // discussionInfo.content=encodeURIComponent(JSON.stringify(discussionInfo.content))

    db.query(discussion.add(discussionInfo),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:"添加讨论失败"}})
        
        res.send({
            status:200,
            data:{
                msg:'添加成功',
                id:result.insertId
            }
        })
    })
})



//更新 discussion
//输入所有信息
//需要token
router.post('/update',function(req,res,next){
    const discussionInfo= req.body
    // discussionInfo.content=encodeURIComponent(JSON.stringify(discussionInfo.content))
    console.log(discussionInfo);
    db.query(discussion.update(discussionInfo),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:"更新讨论失败"}})
        
        res.send({
            status:200,
            data:{
                msg:'更新成功'
            }
        })
    })
})

//删除 discussion  和 discussion 下面的 reply
//输入id
//需要token
router.post('/delete',function(req,res,next){
    const id= req.body.id

    //删除讨论下的回复
    db.query(reply.deleteByDid(id),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)console.log("删除讨论下回复失败或没有回复")

        db.query(discussion.delete(id),function(err,result){
            if(err)return res.send(err)
    
            if(result.affectedRows==0)return res.send({status:400,data:{msg:"删除讨论失败"}})
            
            res.send({
                status:200,
                data:{
                    msg:'删除成功'
                }
            })
    
        })
    })


})


//获取 discussion 和 discussion 下面的 reply
//输入id
//需要token
router.get('/get',function(req,res,next){
    const id=req.query.id

    db.query(discussion.get(id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个讨论"}})

        let discussionResult=result[0]

        // 获取discussion 下面的 reply
        db.query(reply.getByDid(id),function(err,result){
            if(err)return res.send(err)

            let replyResult

            if(result.length==0){
                replyResult={
                    msg:'此讨论还没有回复',
                    data:null
                }
            }else{
                
                replyResult=result
                replyResult.forEach((i,v)=>{
                    //对当前结果再次进行查找，添加用户的name
                    db.query(user.searchId(i.uid),function(err,result){
                        if(err)return res.send(err)
                
                        if(result.length==0)return res.send({status:400,data:{msg:"用户信息不存在"}})
                        
                        let data={
                            id:result[0].id,
                            name:result[0].name,
                            mobile:result[0].mobile,
                            birthday:result[0].birthday,
                            sex:result[0].sex,
                            department:result[0].department,
                            imgUrl:result[0].imgUrl,
                            isAdmin:result[0].isAdmin
                        }
                        i.user=data
                
                    })

                })

                replyResult.forEach((i,v)=>{
                    //对当前结果再次进行查找，添加回复的回复
                    if(i.rid){
                        db.query(reply.getByRid(i.rid),function(err,result){
                            if(err)return res.send(err)
                    
                            if(result.length==0)return res.send({status:400,data:{msg:"不存在上一级回复"}})

                            i.fatherReply=result[0]
                        })
                    }

                })
                
            }

            setTimeout(()=>{
                res.send({
                    status:200,
                    data:{
                        msg:'查找成功',
                        data:discussionResult,
                        reply:replyResult
                    }
                })
            },200)


        })

    })
})

//获取所有 discussion
//需要token
router.get('/getAll',function(req,res,next){

    db.query(discussion.getAll(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个讨论"}})
        
        //对所获取的所有discussion的user信息
        result.forEach((i,v)=>{

            db.query(user.searchId(i.uid),function(err,subresult){
                if(err)return res.send(err)

                if(subresult.length==0) console.log({status:400,data:{msg:"该讨论的有发起者不见了"}})

                i.user=subresult[0]
            })
        })

        setTimeout(()=>{
            res.send({
                status:200,
                data:{
                    msg:'查找成功',
                    data:result
                }
            })
        },200)

    })
})


//websocket发送新加内容




module.exports = router;