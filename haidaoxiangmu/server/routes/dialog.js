var express = require('express');
var router = express.Router();
//数据库
var db = require('../db/index')
//dialog sql模块
var dialog = require('../db/dialog/dialog')
//ponds sql模块
var ponds = require('../db/aquaculture_ponds/aquaculture_ponds')
//owner sql
var owner = require('../db/owner/owner')
//products sql
var products = require('../db/aquaculture_products/aquaculture_products')

//输入front，end，获取之间的数据
router.post('/getAll',function(req,res,next){
    const dialogInfo=req.body

    db.query(dialog.getAll(dialogInfo),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'没有查询日志'}})
        let dialogResult=result

        db.query(dialog.getLength(),function(err,result){
            if(err)return res.send(err)
    
            if(result.length==0)return res.send({status:400,data:{msg:'没有查询日志'}})
    
            res.send({
                status:200,
                data:{
                    msg:'查询成功',
                    data:dialogResult,
                    length:result[0].length
                }
            })
        })
    })
})

router.get('/getLength',function(req,res,next){


})
//pass
router.post('/pass',function(req,res,next){
    const checkingData=req.body

    //先修改dialog表，再修改其他表
    db.query(dialog.update(checkingData),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败'}})
        
        //再修改其他表
        if(checkingData.op_obj==0){
            //池塘
            db.query(ponds.updateCheckStatus(checkingData.checkStatus,checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已通过'
                    }
                })
            })
        }else if(checkingData.op_obj==1){
            //拥有者
            db.query(owner.updateCheckStatus(checkingData.checkStatus,checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已通过'
                    }
                })
            })
        }else if(checkingData.op_obj==2){
            //水产品
            db.query(products.updateCheckStatus(checkingData.checkStatus,checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已通过'
                    }
                })
            })
        }
    })

})

//deny
router.post('/deny',function(req,res,next){
    const checkingData=req.body

    //先修改dialog表，再修改其他表
    db.query(dialog.update(checkingData),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败'}})
        
        //再修改其他表
        if(checkingData.op_obj==0){
            //池塘
            db.query(ponds.updateCheckStatus(checkingData.checkStatus,checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已拒绝'
                    }
                })
            })
        }else if(checkingData.op_obj==1){
            //拥有者
            db.query(owner.updateCheckStatus(checkingData.checkStatus,checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已拒绝'
                    }
                })
            })
        }else if(checkingData.op_obj==2){
            //水产品
            db.query(products.updateCheckStatus(checkingData.checkStatus,checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已拒绝'
                    }
                })
            })
        }
    })

})

router.post('/search',function(req,res,next){
    const dialogInfo=req.body
    console.log(dialogInfo);
    db.query(dialog.search(dialogInfo),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:200,data:{msg:"查询到0条数据",has:0}})
        
        let dialogResult= result
        db.query(dialog.searchLength(dialogInfo),function(err,result){
            if(err)return res.send(err)

            if(result.length==0)return res.send({status:200,data:{msg:"查询到0条数据"}})

            res.send({
                status:200,
                data:{
                    msg:'查找成功',
                    data:dialogResult,
                    has:dialogResult.length,
                    slength:result[0].slength
                }
            })
        })

    })
})



module.exports = router;