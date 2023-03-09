var express = require('express');
var router = express.Router();
//数据库
var db = require('../db/index')
//ponds sql模块
var ponds = require('../db/aquaculture_ponds/aquaculture_ponds')
//owner sql
var owner = require('../db/owner/owner')
//products sql
var products = require('../db/aquaculture_products/aquaculture_products')
//dialog 
var dialog =require('../db/dialog/dialog')

//增加新的池塘
//输入除了id,ownerId以外的其他信息
//需要token
router.post('/add',function(req,res,next){
    let userInfo=req.user
    const pondsInfo= req.body
    //判断是否为管理员
    if(userInfo.isAdmin==1){
        pondsInfo.checkStatus=1
    }else{
        pondsInfo.checkStatus=0
    }

    if(userInfo.isAdmin==1){
        db.query(ponds.add(pondsInfo),function(err,result){
            if(err)return res.send(err)
    
            if(result.affectedRows==0)return res.send({status:400,data:{msg:"添加池塘失败"}})
            
            let pondsResult=result
            //对dialog数据库操作
            //添加/修改/删除type分别对应0/1/2
            //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
            //checkStatus刚添加为0,但如果是管理员的话，为1
            //checkResult，当前为添加池塘操作，分别分为管理员添加和普通用户添加，
            //old_obj,当前为添加操作，为空
            //new_obj,为前端传递来的obj
            
            //修改暂时id
            pondsInfo.id=pondsResult.insertId
    
            let dialogInfo={
                uid:userInfo.id,
                type:0,
                op_obj:0,
                checkStatus:userInfo.isAdmin==1?1:0,
                checkResult:userInfo.isAdmin==1?'管理员直接添加':'用户添加',
                time:new Date(),
                old_obj:'',
                new_obj:encodeURIComponent(JSON.stringify(pondsInfo))
            }
            db.query(dialog.add(dialogInfo),function(err,result){
                if(err)return res.send(err)
    
                if(result.affectedRows==0)console.log({status:400,data:{msg:"添加日志失败"}})
    
                res.send({
                    status:200,
                    data:{
                        msg:'添加成功',
                        id:pondsResult.insertId
                    }
                })
            })
    
        })
    }else{

            //对dialog数据库操作
            //添加/修改/删除type分别对应0/1/2
            //池塘/拥有者/水产品 三种操作对象分别对应0/1/2
            //checkStatus刚添加为0,但如果是管理员的话，为1
            //checkResult，当前为添加池塘操作，分别分为管理员添加和普通用户添加，
            //old_obj,当前为添加操作，为空
            //new_obj,为前端传递来的obj
            
            //修改暂时id
    
            let dialogInfo={
                uid:userInfo.id,
                type:0,
                op_obj:0,
                checkStatus:userInfo.isAdmin==1?1:0,
                checkResult:userInfo.isAdmin==1?'管理员直接添加':'用户添加',
                time:new Date(),
                old_obj:'',
                new_obj:encodeURIComponent(JSON.stringify(pondsInfo))
            }
            db.query(dialog.add(dialogInfo),function(err,result){
                if(err)return res.send(err)
    
                if(result.affectedRows==0)console.log({status:400,data:{msg:"添加日志失败"}})
    
                res.send({
                    status:200,
                    data:{
                        msg:'添加成功',
                    }
                })
            })
    }


})


//更新池塘
//输入所有信息
//需要token
router.post('/update',function(req,res,next){
    const pondsInfo= req.body
    let userInfo=req.user
    let id = req.body.id
    //判断是否为管理员
    if(userInfo.isAdmin==1){
        pondsInfo.checkStatus=1
    }else{
        pondsInfo.checkStatus=0
    }
    //先获取旧ponds
    db.query(ponds.get(id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"更新池塘失败"}})

        //旧的obj
        let old_obj=result[0]

        if(userInfo.isAdmin==1){
            
            db.query(ponds.update(pondsInfo),function(err,result){
                if(err)return res.send(err)
        
                if(result.affectedRows==0)return res.send({status:400,data:{msg:"更新池塘失败"}})
                
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
                    op_obj:0,
                    checkStatus:userInfo.isAdmin==1?1:0,
                    checkResult:userInfo.isAdmin==1?'管理员直接修改':'用户修改',
                    time:new Date(),
                    old_obj:encodeURIComponent(JSON.stringify(old_obj)),
                    new_obj:encodeURIComponent(JSON.stringify(pondsInfo)),
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
            
            db.query(ponds.updateCheckStatus(0,id),function(err,result){
                if(err)return res.send(err)
        
                if(result.affectedRows==0)return res.send({status:400,data:{msg:"更新池塘失败"}})
                
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
                    op_obj:0,
                    checkStatus:userInfo.isAdmin==1?1:0,
                    checkResult:userInfo.isAdmin==1?'管理员直接修改':'用户修改',
                    time:new Date(),
                    old_obj:encodeURIComponent(JSON.stringify(old_obj)),
                    new_obj:encodeURIComponent(JSON.stringify(pondsInfo)),
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

//删除池塘
//输入id
//需要token
router.post('/delete',function(req,res,next){
    const pondsInfo=req.body
    const id= req.body.id
    let userInfo=req.user
    db.query(ponds.delete(id),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:"删除池塘失败"}})
        
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
            op_obj:0,
            checkStatus:1,
            checkResult:userInfo.isAdmin==1?'管理员直接删除':'用户删除',
            time:new Date(),
            old_obj:encodeURIComponent(JSON.stringify(pondsInfo)),
            new_obj:'',
        }
        db.query(dialog.add(dialogInfo),function(err,result){
            if(err)return res.send(err)

            if(result.affectedRows==0)console.log({status:400,data:{msg:"添加日志失败"}})

            res.send({
                status:200,
                data:{
                    msg:'删除成功'
                }
            })
        })

    })
})


//获取池塘
//输入id
//需要token
router.get('/get',function(req,res,next){
    const id=req.query.id

    db.query(ponds.get(id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个池塘"}})
        
        const pondsResult=result[0]
        //获取池塘对应的水产
        db.query(products.get(pondsResult.productId),function(err,result){
            if(err)return res.send(err)

            let productResult={}
            if(result.length==0){
                productResult={msg:'该池塘没有选择水产',data:null}
            }else{
                productResult=result[0]
            }
            //获取池塘的拥有者
            db.query(owner.get(pondsResult.ownerId),function(err,result){
                if(err)return res.send(err)

                let ownerResult={}
                if(result.length==0){
                    ownerResult={msg:'该池塘没有拥有者',data:null}
                }else{
                    ownerResult=result[0]
                }
                
                res.send({
                    status:200,
                    data:{
                        msg:'查找成功',
                        data:pondsResult,
                        product:productResult,
                        owner:ownerResult
                    }
                })

            })

        })

    })
})

//获取所有池塘
//需要token
router.get('/getAll',function(req,res,next){

    db.query(ponds.getAll(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个池塘"}})
        
        let pondsData=result
        //对当前所有池塘进行遍历，查找其owner和product，
        //如果没有，则跳过
        let ownerData=''
        let productData=''
        pondsData.forEach((i,v)=>{
            if(i.ownerId){
                // i.ownerId
                db.query(owner.get(i.ownerId),function(err,result){
                    if(err)return res.send(err)

                    if(result.length==0)console.log({status:400,data:{msg:"查询到0个owner"}})

                    ownerData=result[0]
                    i.owner=ownerData
                })
            }
            if(i.productId){
                db.query(products.get(i.productId),function(err,result){
                    if(err)return res.send(err)

                    if(result.length==0)console.log({status:400,data:{msg:"查询到0个product"}})

                    productData=result[0]
                    i.product=productData
                })
            }
        })
        setTimeout(()=>{
            res.send({
                status:200,
                data:{
                    msg:'查找成功',
                    data:pondsData,
                }
            })
        },200)
        
    })
})

router.get('/getAllPass',function(req,res,next){

    db.query(ponds.getAllPass(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"查询到0个池塘"}})
        
        let pondsData=result
        //对当前所有池塘进行遍历，查找其owner和product，
        //如果没有，则跳过
        let ownerData=''
        let productData=''
        pondsData.forEach((i,v)=>{
            if(i.ownerId){
                // i.ownerId
                db.query(owner.get(i.ownerId),function(err,result){
                    if(err)return res.send(err)

                    if(result.length==0)console.log({status:400,data:{msg:"查询到0个owner"}})

                    ownerData=result[0]
                    i.owner=ownerData
                })
            }
            if(i.productId){
                db.query(products.get(i.productId),function(err,result){
                    if(err)return res.send(err)

                    if(result.length==0)console.log({status:400,data:{msg:"查询到0个product"}})

                    productData=result[0]
                    i.product=productData
                })
            }
        })
        setTimeout(()=>{
            res.send({
                status:200,
                data:{
                    msg:'查找成功',
                    data:pondsData,
                }
            })
        },200)
        
    })
})

router.post('/search',function(req,res,next){
    const pondsInfo=req.body

    //补全没有的字段
    let finalPondsInfo={
        ownerId:pondsInfo.ownerId?pondsInfo.ownerId:'',
        productId:pondsInfo.productId?pondsInfo.productId:'',
        county:pondsInfo.county?pondsInfo.county:'',
        town:pondsInfo.town?pondsInfo.town:'',
        village:pondsInfo.village?pondsInfo.village:'',
        checkStatus:pondsInfo.checkStatus?pondsInfo.checkStatus:'',
        deleteStatus:pondsInfo.deleteStatus?pondsInfo.deleteStatus:'',
    }

    db.query(ponds.search(finalPondsInfo),function(err,result){
        console.log(ponds.search(finalPondsInfo));
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:200,data:{msg:"查询到0个匹配的池塘",has:0}})
        let pondsData=result
        //对当前所有池塘进行遍历，查找其owner和product，
        //如果没有，则跳过
        let ownerData=''
        let productData=''
        pondsData.forEach((i,v)=>{
            if(i.ownerId){
                // i.ownerId
                db.query(owner.get(i.ownerId),function(err,result){
                    if(err)return res.send(err)

                    if(result.length==0)console.log({status:400,data:{msg:"查询到0个owner"}})

                    ownerData=result[0]
                    i.owner=ownerData
                })
            }
            if(i.productId){
                db.query(products.get(i.productId),function(err,result){
                    if(err)return res.send(err)

                    if(result.length==0)console.log({status:400,data:{msg:"查询到0个product"}})

                    productData=result[0]
                    i.product=productData
                })
            }
        })
        setTimeout(()=>{
            res.send({
                status:200,
                data:{
                    msg:'查找成功',
                    data:pondsData,
                    has:result.length

                }
            })
        },200)
    })
})



module.exports = router;