var express = require('express');
var router = express.Router();
//数据库
var db = require('../db/index')
//reply sql模块
var reply = require('../db/reply/reply')
//user sql模块
var user = require('../db/user/user')


//增加新的reply
//输入除了id以外的其他信息
//需要token
router.post('/add',function(req,res,next){
    const replyInfo= req.body
    // replyInfo.content=encodeURIComponent(JSON.stringify(replyInfo.content))

    db.query(reply.add(replyInfo),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:"添加回复失败"}})
        
        res.send({
            status:200,
            data:{
                msg:'添加成功',
                id:result.insertId
            }
        })
    })
})


//更新reply
//输入所有信息
//需要token
router.post('/update',function(req,res,next){
    const replyInfo= req.body
    // replyInfo.content=encodeURIComponent(JSON.stringify(replyInfo.content))

    db.query(reply.update(replyInfo),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:"更新回复失败"}})
        
        res.send({
            status:200,
            data:{
                msg:'更新成功'
            }
        })
    })
})

//删除reply
//输入id
//需要token
router.post('/delete',function(req,res,next){
    const id= req.body.id

    //删除子回复以及子回复的子回复
    //递归删除
    //首先已经有id，通过id获取子回复，再通过子回复的id去查找下一级子回复

    function getAndDelete(id){
        console.log('当前id:'+id);
        db.query(reply.getSubReply(id),function(err,result){
            if(err)return res.send(err)

            if(result.length==0){
                //说明再该回复下没有子回复，不需要再执行 
                //直接删除
                deleteReply(id)

            }else{
                //把result中的id取出,再次执行该函数
                result.forEach((i,v)=>{
                    getAndDelete(i.id)
                })
                deleteReply(id)


            }
        })
    }
    function deleteReply(id){
        //删除已查询的分支
        db.query(reply.delete(id),function(err,result){
            if(err)return res.send(err)
            if(result.affectedRows==0) console.log({status:400,data:{msg:"删除回复失败"}})
            
            console.log(`id为${id}的回复已删除`);
        })
    }

    getAndDelete(id)
    res.send({
        status:200,
        data:{
            msg:'删除成功'
        }
    })

})


//获取 回复和父回复
//输入id
//需要token
router.get('/get',function(req,res,next){
    const id=req.query.id

    db.query(reply.get(id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0条回复"}})

        let replyResult=result[0]

        if(replyResult.rid){
            //获取当前回复的父回复
            //replyResult.rid=rid
            db.query(reply.getByRid(replyResult.rid),function(err,result){
                if(err)return res.send(err)

                if(result.length==0)return res.send({status:400,data:{msg:"未查询到父回复"}})

                let fatherReply=result[0]
                //fatherUser
                db.query(user.searchId(fatherReply.uid),function(err,result){
                    if(err)return res.send(err)

                    if(result.length==0)return res.send({status:400,data:{msg:'信息错误'}})
            
                    let fatherUser={
                        id:result[0].id,
                        name:result[0].name,
                        mobile:result[0].mobile,
                        birthday:result[0].birthday,
                        sex:result[0].sex,
                        department:result[0].department,
                        imgUrl:result[0].imgUrl,
                        isAdmin:result[0].isAdmin
                    }
                    //user
                    db.query(user.searchId(replyResult.uid),function(err,result){
                        if(err)return res.send(err)

                        if(result.length==0)return res.send({status:400,data:{msg:'信息错误'}})
                
                        let user={
                            id:result[0].id,
                            name:result[0].name,
                            mobile:result[0].mobile,
                            birthday:result[0].birthday,
                            sex:result[0].sex,
                            department:result[0].department,
                            imgUrl:result[0].imgUrl,
                            isAdmin:result[0].isAdmin
                        }

                        replyResult.fatherReply=fatherReply
                        replyResult.fatherUser=fatherUser
                        replyResult.user=user
                        
                        res.send({
                            status:200,
                            data:{
                                msg:'查询成功',
                                data:replyResult,
                            }
                        })
                    })

                })
                
            })
        }else{
            db.query(user.searchId(replyResult.uid),function(err,result){
                if(err)return res.send(err)

                if(result.length==0)return res.send({status:400,data:{msg:'信息错误'}})
        
                let user={
                    id:result[0].id,
                    name:result[0].name,
                    mobile:result[0].mobile,
                    birthday:result[0].birthday,
                    sex:result[0].sex,
                    department:result[0].department,
                    imgUrl:result[0].imgUrl,
                    isAdmin:result[0].isAdmin
                }
                replyResult.user=user

                res.send({
                    status:200,
                    data:{
                        msg:'查找成功',
                        data:replyResult,
                    }
                })
            })
            
        }

    })
})

//获取所有 reply
//需要token
router.get('/getAll',function(req,res,next){

    db.query(reply.getAll(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0条回复"}})
        
        res.send({
            status:200,
            data:{
                msg:'查找成功',
                data:result
            }
        })
    })
})





module.exports = router;