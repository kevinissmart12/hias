var express = require('express');
var router = express.Router();
//数据库
var db = require('../db/index')
//owner sql模块
var owner = require('../db/owner/owner')
//ponds sql模块
var ponds = require('../db/aquaculture_ponds/aquaculture_ponds')
//dialog 
var dialog =require('../db/dialog/dialog')
const fs=require('fs')
//multer 图片上传
var multer=require('multer')

//上传owner，返回相对地址
router.post('/upload', multer({dest:'./data/owner'}).single('file'), function (req, res, next) {

    fs.renameSync(req.file.path, `./data/owner/${req.body.name}`)

    res.send({
        status:200,
        data:{
            msg:'上传成功',
            imgUrl:`/owner/${req.body.name}`
        }
    })

})

//增加新的owner
//输入除了id以外的其他信息
//需要token
router.post('/add',function(req,res,next){
    const ownerInfo= req.body
    let userInfo=req.user
    //判断是否为管理员
    if(userInfo.isAdmin==1){
        ownerInfo.checkStatus=1
    }else{
        ownerInfo.checkStatus=0
    }

    if(userInfo.isAdmin==1){
        db.query(owner.add(ownerInfo),function(err,result){
            if(err)return res.send(err)
    
            if(result.affectedRows==0)return res.send({status:400,data:{msg:"添加拥有者失败"}})
            let ownerResult=result
            ownerInfo.id=ownerResult.insertId
    
            //对dialog数据库操作
            //添加/修改/删除type分别对应0/1/2
            //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
            //checkStatus刚添加为0,但如果是管理员的话，为1
            //checkResult，当前为添加水产品操作，分别分为管理员添加和普通用户添加，
            //old_obj,当前为添加操作，为空
            //new_obj,为前端传递来的obj
            let dialogInfo={
                uid:userInfo.id,
                type:0,
                op_obj:1,
                checkStatus:userInfo.isAdmin==1?1:0,
                checkResult:userInfo.isAdmin==1?'管理员直接添加':'用户添加',
                time:new Date(),
                old_obj:'',
                new_obj:encodeURIComponent(JSON.stringify(ownerInfo))
            }
            db.query(dialog.add(dialogInfo),function(err,result){
                if(err)return res.send(err)
    
                if(result.affectedRows==0) console.log({status:400,data:{msg:"添加日志失败"}})
    
                res.send({
                    status:200,
                    data:{
                        msg:'添加成功'
                    }
                })
            })
    
        })
    }else{

            //对dialog数据库操作
            //添加/修改/删除type分别对应0/1/2
            //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
            //checkStatus刚添加为0,但如果是管理员的话，为1
            //checkResult，当前为添加水产品操作，分别分为管理员添加和普通用户添加，
            //old_obj,当前为添加操作，为空
            //new_obj,为前端传递来的obj
            let dialogInfo={
                uid:userInfo.id,
                type:0,
                op_obj:1,
                checkStatus:userInfo.isAdmin==1?1:0,
                checkResult:userInfo.isAdmin==1?'管理员直接添加':'用户添加',
                time:new Date(),
                old_obj:'',
                new_obj:encodeURIComponent(JSON.stringify(ownerInfo))
            }
            db.query(dialog.add(dialogInfo),function(err,result){
                if(err)return res.send(err)
    
                if(result.affectedRows==0) console.log({status:400,data:{msg:"添加日志失败"}})
    
                res.send({
                    status:200,
                    data:{
                        msg:'添加成功'
                    }
                })
            })
    
        
    }


})


//更新owner
//输入所有信息
//需要token
router.post('/update',function(req,res,next){
    const ownerInfo= req.body
    let userInfo=req.user
    let id = req.body.id
    //判断是否为管理员
    if(userInfo.isAdmin==1){
        ownerInfo.checkStatus=1
    }else{
        ownerInfo.checkStatus=0
    }
    db.query(owner.get(id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"更新拥有者信息失败"}})
        //旧的obj
        let old_obj=result[0]

        if(userInfo.isAdmin==1){
            db.query(owner.update(ownerInfo),function(err,result){
                if(err)return res.send(err)
    
                if(result.affectedRows==0)return res.send({status:400,data:{msg:"更新拥有者信息失败"}})
                //对dialog数据库操作
                //添加/修改/删除type分别对应0/1/2
                //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
                //checkStatus管理员1，用户0
                //checkResult，当前为添加水产品操作，分别分为管理员修改和普通用户修改，
                //old_obj,后端查询旧的obj
                //new_obj,前端传来的item
                let dialogInfo={
                    uid:userInfo.id,
                    type:1,
                    op_obj:1,
                    checkStatus:userInfo.isAdmin==1?1:0,
                    checkResult:userInfo.isAdmin==1?'管理员直接修改':'用户修改',
                    time:new Date(),
                    old_obj:encodeURIComponent(JSON.stringify(old_obj)),
                    new_obj:encodeURIComponent(JSON.stringify(ownerInfo)),
                }
                db.query(dialog.add(dialogInfo),function(err,result){
                    if(err)return res.send(err)
        
                    if(result.affectedRows==0)console.log({status:400,data:{msg:"添加日志失败"}})
        
                    res.send({
                        status:200,
                        data:{
                            msg:'修改成功'
                        }
                    })
                })
            })
        }else{
            db.query(owner.updateCheckStatus(0,id),function(err,result){
                if(err)return res.send(err)
    
                if(result.affectedRows==0)return res.send({status:400,data:{msg:"更新拥有者信息失败"}})
                //对dialog数据库操作
                //添加/修改/删除type分别对应0/1/2
                //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
                //checkStatus管理员1，用户0
                //checkResult，当前为添加水产品操作，分别分为管理员修改和普通用户修改，
                //old_obj,后端查询旧的obj
                //new_obj,前端传来的item
                let dialogInfo={
                    uid:userInfo.id,
                    type:1,
                    op_obj:1,
                    checkStatus:userInfo.isAdmin==1?1:0,
                    checkResult:userInfo.isAdmin==1?'管理员直接修改':'用户修改',
                    time:new Date(),
                    old_obj:encodeURIComponent(JSON.stringify(old_obj)),
                    new_obj:encodeURIComponent(JSON.stringify(ownerInfo)),
                }
                db.query(dialog.add(dialogInfo),function(err,result){
                    if(err)return res.send(err)
        
                    if(result.affectedRows==0)console.log({status:400,data:{msg:"添加日志失败"}})
        
                    res.send({
                        status:200,
                        data:{
                            msg:'修改成功'
                        }
                    })
                })
            })
        }

    })


})

//删除owner  //再去ponds表中找到ownerId相同的字段，并把ownerId设置为空
//输入id
//需要token
router.post('/delete',function(req,res,next){
    const id= req.body.id
    let userInfo=req.user
    const ownerInfo=req.body
    if(userInfo.isAdmin==1){
        ownerInfo.checkStatus=1
    }else{
        ownerInfo.checkStatus=0
    }
    if(userInfo.isAdmin==1){
        db.query(owner.delete(id),function(err,result){
            if(err)return res.send(err)
    
            if(result.affectedRows==0)return res.send({status:400,data:{msg:"删除拥有者失败"}})
            //对dialog数据库操作
            //添加/修改/删除type分别对应0/1/2
            //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
            //checkStatus删除全部为通过1，
            //checkResult，当前为添加水产品操作，分别分为管理员添加和普通用户添加，
            //old_obj,前端传来的item
            //new_obj,当前为添加操作，为空
            let dialogInfo={
                uid:userInfo.id,
                type:2,
                op_obj:1,
                checkStatus:userInfo.isAdmin==1?1:0,
                checkResult:userInfo.isAdmin==1?'管理员直接删除':'用户请求删除',
                time:new Date(),
                old_obj:encodeURIComponent(JSON.stringify(ownerInfo)),
                new_obj:'',
            }
            db.query(dialog.add(dialogInfo),function(err,result){
                if(err)return res.send(err)
    
                if(result.affectedRows==0) console.log({status:400,data:{msg:"添加日志失败"}})
    
                db.query(ponds.getByOwnerId(id),function(err,result){
                    if(err)return res.send(err)
    
                    if(result.length==0){
                        res.send({
                            status:200,
                            data:{
                                msg:'删除成功,该拥有者没有池塘'
                            }
                        })
                    }else{
                        //update ponds
                        //获取池塘id
                        let arr=Array.from(result)
                        arr.forEach((i,v)=>{
                            //ownerId设置为空
                            db.query(ponds.updateOwnerId('null',i.id),function(err,result){
                                if(err)return res.send(err)
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'更新错误'}})
                            })
    
                        })
    
                        setTimeout(()=>{
                            res.send({
                                status:200,
                                data:{
                                    msg:`删除成功,该拥有者有${arr.length}个池塘`
                                }
                            })
                        },200)
    
                    }
                })
            })
    
    
    
        })
    }else{
        //对dialog数据库操作
        //添加/修改/删除type分别对应0/1/2
        //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
        //checkStatus删除全部为通过1，
        //checkResult，当前为添加水产品操作，分别分为管理员添加和普通用户添加，
        //old_obj,前端传来的item
        //new_obj,当前为添加操作，为空
        let dialogInfo={
            uid:userInfo.id,
            type:2,
            op_obj:1,
            checkStatus:userInfo.isAdmin==1?1:0,
            checkResult:userInfo.isAdmin==1?'管理员直接删除':'用户请求删除',
            time:new Date(),
            old_obj:encodeURIComponent(JSON.stringify(ownerInfo)),
            new_obj:'',
        }
        db.query(dialog.add(dialogInfo),function(err,result){
            if(err)return res.send(err)

            if(result.affectedRows==0) console.log({status:400,data:{msg:"添加日志失败"}})

            res.send({
                status:200,
                data:{
                    msg:'已请求删除操作'
                }
            })
        })
    }
    // db.query(owner.delete(id),function(err,result){
    //     if(err)return res.send(err)

    //     if(result.affectedRows==0)return res.send({status:400,data:{msg:"删除拥有者失败"}})
    //     //对dialog数据库操作
    //     //添加/修改/删除type分别对应0/1/2
    //     //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
    //     //checkStatus删除全部为通过1，
    //     //checkResult，当前为添加水产品操作，分别分为管理员添加和普通用户添加，
    //     //old_obj,前端传来的item
    //     //new_obj,当前为添加操作，为空
    //     let dialogInfo={
    //         uid:userInfo.id,
    //         type:2,
    //         op_obj:1,
    //         checkStatus:1,
    //         checkResult:userInfo.isAdmin==1?'管理员直接删除':'用户删除',
    //         time:new Date(),
    //         old_obj:encodeURIComponent(JSON.stringify(ownerInfo)),
    //         new_obj:'',
    //     }
    //     db.query(dialog.add(dialogInfo),function(err,result){
    //         if(err)return res.send(err)

    //         if(result.affectedRows==0) console.log({status:400,data:{msg:"添加日志失败"}})

    //         db.query(ponds.getByOwnerId(id),function(err,result){
    //             if(err)return res.send(err)

    //             if(result.length==0){
    //                 res.send({
    //                     status:200,
    //                     data:{
    //                         msg:'删除成功,该拥有者没有池塘'
    //                     }
    //                 })
    //             }else{
    //                 //update ponds
    //                 //获取池塘id
    //                 let arr=Array.from(result)
    //                 arr.forEach((i,v)=>{
    //                     //ownerId设置为空
    //                     db.query(ponds.updateOwnerId('null',i.id),function(err,result){
    //                         if(err)return res.send(err)
    //                         if(result.affectedRows==0)return res.send({status:400,data:{msg:'更新错误'}})
    //                     })

    //                 })

    //                 setTimeout(()=>{
    //                     res.send({
    //                         status:200,
    //                         data:{
    //                             msg:`删除成功,该拥有者有${arr.length}个池塘`
    //                         }
    //                     })
    //                 },200)

    //             }
    //         })
    //     })



    // })
})


//获取owner
//输入id
//需要token
router.get('/get',function(req,res,next){
    const id=req.query.id

    db.query(owner.get(id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个拥有者"}})
        
        res.send({
            status:200,
            data:{
                msg:'查找成功',
                data:result[0]
            }
        })
    })
})

//获取所有owner
//需要token
router.get('/getAll',function(req,res,next){

    db.query(owner.getAll(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个拥有者"}})
        
        res.send({
            status:200,
            data:{
                msg:'查找成功',
                data:result
            }
        })
    })
})
router.get('/getAllPass',function(req,res,next){

    db.query(owner.getAllPass(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个拥有者"}})
        
        res.send({
            status:200,
            data:{
                msg:'查找成功',
                data:result
            }
        })
    })
})

//模糊搜索
//条件有town,village,discriminator,name,checkStatus
//其中 除了name外，都是精准搜索
//需要token
router.post('/search',function(req,res,next){
    const ownerInfo=req.body

    db.query(owner.search(ownerInfo),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:200,data:{msg:"查询到0个匹配的拥有者",has:0}})
        
        res.send({
            status:200,
            data:{
                msg:'查找成功',
                data:result,
                has:result.length
            }
        })
    })
})

//随机采样
//获取n条
router.post('/randomSelect',function(req,res,next){
    const n=req.body.n

    db.query(owner.randomSelect(n),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个拥有者"}})

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