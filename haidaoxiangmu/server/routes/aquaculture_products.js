var express = require('express');
var router = express.Router();
const fs=require('fs')
//multer 图片上传
var multer=require('multer')
//数据库
var db = require('../db/index')
//products sql模块
var products = require('../db/aquaculture_products/aquaculture_products')
//ponds sql模块
var ponds = require('../db/aquaculture_ponds/aquaculture_ponds')
//dialog 
var dialog =require('../db/dialog/dialog')
//user 
var user = require('../db/user/user')

//上传水产图片，返回相对地址
router.post('/upload', multer({dest:'./data/products'}).single('file'), function (req, res, next) {
    //获取文件信息
    // let type=req.file.originalname.replace(/.+\./, ".")
    // req.file.filename=req.file.filename+type
    console.log(req.file);

    fs.renameSync(req.file.path, `./data/products/${req.body.name}`)
    // res.send(req.body);
    res.send({
        status:200,
        data:{
            msg:'上传成功',
            imgUrl:`/products/${req.body.name}`
        }
    })

})

//添加水产信息
//需要字段name,type,description,imgUrl,breedTech,diseases
//需要token
router.post('/add', function (req, res, next) {
    let userInfo=req.user
    const productsInfo=req.body
    //判断是否为管理员
    if(userInfo.isAdmin==1){
        productsInfo.checkStatus=1
    }else{
        productsInfo.checkStatus=0
    }
    //添加数据库字段

    if(userInfo.isAdmin==1){
        db.query(products.add(productsInfo),function(err,result){
            if(err)return res.send(err)
    
            if(result.affectedRows==0)return res.send({status:400,data:{msg:"添加水产失败"}})
    
            let productsResult=result
            productsInfo.id=productsResult.insertId
    
            
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
                op_obj:2,
                checkStatus:userInfo.isAdmin==1?1:0,
                checkResult:userInfo.isAdmin==1?'管理员直接添加':'用户添加',
                time:new Date(),
                old_obj:'',
                new_obj:encodeURIComponent(JSON.stringify(productsInfo))
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
                op_obj:2,
                checkStatus:userInfo.isAdmin==1?1:0,
                checkResult:userInfo.isAdmin==1?'管理员直接添加':'用户添加',
                time:new Date(),
                old_obj:'',
                new_obj:encodeURIComponent(JSON.stringify(productsInfo))
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


//获取水产信息
//需要字段id
//需要token
router.get('/get', function (req, res, next) {
    const id=req.query.id

    db.query(products.get(id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'查询到0个水产'}})

        res.send({
            status:200,
            data:{
                msg:'查询成功',
                data:result[0]
            }
        })
    })
})


//获取水产信息
//需要字段id
//需要token
router.get('/getAll', function (req, res, next) {

    db.query(products.getAll(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'查询到0个水产'}})

        res.send({
            status:200,
            data:{
                msg:'查询成功',
                data:result
            }
        })
    })
})
router.get('/getAllPass', function (req, res, next) {

    db.query(products.getAllPass(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'查询到0个水产'}})

        res.send({
            status:200,
            data:{
                msg:'查询成功',
                data:result
            }
        })
    })
})


//修改水产信息
//需要字段id,name,type,description,imgUrl,breedTech,diseases
//需要token
router.post('/update',function(req,res,next){
    //前端传来的是新的obj
    const productsInfo=req.body
    let userInfo=req.user
    let id = req.body.id
    if(userInfo.isAdmin==1){
        productsInfo.checkStatus=1
    }else{
        productsInfo.checkStatus=0
    }
    //首先获取就product
    db.query(products.get(id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:"修改水产失败"}})

        //旧的obj
        let old_obj=result[0]
        //如果为管理员，直接修改，
        //如果未普通用户，要审核后才能修改
        if(userInfo.isAdmin==1){
            db.query(products.update(productsInfo),function(err,result){
                if(err)return res.send(err)
        
                if(result.affectedRows==0)return res.send({status:400,data:{msg:"修改水产失败"}})
                
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
                    op_obj:2,
                    checkStatus:userInfo.isAdmin==1?1:0,
                    checkResult:userInfo.isAdmin==1?'管理员直接修改':'用户修改',
                    time:new Date(),
                    old_obj:encodeURIComponent(JSON.stringify(old_obj)),
                    new_obj:encodeURIComponent(JSON.stringify(productsInfo)),
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
            //首先把当前的product的审核状态变为0
            db.query(products.updateCheckStatus(0,id),function(err,result){
                if(err)return res.send(err)
    
                if(result.affectedRows==0)console.log({status:400,data:{msg:"修改失败"}})
                    let dialogInfo={
                        uid:userInfo.id,
                        type:1,
                        op_obj:2,
                        checkStatus:userInfo.isAdmin==1?1:0,
                        checkResult:userInfo.isAdmin==1?'管理员直接修改':'用户修改',
                        time:new Date(),
                        old_obj:encodeURIComponent(JSON.stringify(old_obj)),
                        new_obj:encodeURIComponent(JSON.stringify(productsInfo)),
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


//删除某条水产品
//需要字段id
//需要token
router.post('/delete',function(req,res,next){
    const productInfo=req.body
    const id=req.body.id
    let userInfo=req.user

    db.query(products.delete(id),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:"删除水产失败"}})
        
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
            op_obj:2,
            checkStatus:1,
            checkResult:userInfo.isAdmin==1?'管理员直接删除':'用户删除',
            time:new Date(),
            old_obj:encodeURIComponent(JSON.stringify(productInfo)),
            new_obj:'',
        }
        db.query(dialog.add(dialogInfo),function(err,result){
            if(err)return res.send(err)

            if(result.affectedRows==0) console.log({status:400,data:{msg:"添加日志失败"}})

            db.query(ponds.getByProductId(id),function(err,result){
                if(err)return res.send(err)

                if(result.length==0){
                    res.send({
                        status:200,
                        data:{
                            msg:'删除成功,该水产没有投入过任何池塘'
                        }
                    })
                }else{
                    //update ponds
                    //获取池塘id
                    let arr=Array.from(result)
                    arr.forEach((i,v)=>{
                        //productId设置为空
                        db.query(ponds.updateProductId('null',i.id),function(err,result){
                            if(err)return res.send(err)
                            if(result.affectedRows==0)return res.send({status:400,data:{msg:'更新错误'}})
                        })

                    })

                    setTimeout(()=>{
                        res.send({
                            status:200,
                            data:{
                                msg:`删除成功,该水产投入过${arr.length}个池塘`
                            }
                        })
                    },200)

                }
            })
        })


    })

})



//模糊搜索
//条件有name 
//需要token
router.post('/search',function(req,res,next){
    const productInfo=req.body

    db.query(products.search(productInfo),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:200,data:{msg:"查询到0个匹配的product",has:0}})
        
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


module.exports = router;
