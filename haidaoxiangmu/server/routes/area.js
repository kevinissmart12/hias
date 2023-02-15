var express = require('express');
var router = express.Router();
//数据库
var db = require('../db/index')
//area sql模块
var area = require('../db/area/area')


router.get('/getAllTown',function(req,res,next){
    db.query(area.getAllTown(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'没有查询到镇'}})

        res.send({
            status:200,
            data:{
                msg:'查询成功',
                data:result
            }
        })
    })
})

router.get('/getAllVillage',function(req,res,next){
    db.query(area.getAllVillage(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'没有查询到村'}})

        res.send({
            status:200,
            data:{
                msg:'查询成功',
                data:result
            }
        })
    })
})


router.post('/getTown',function(req,res,next){
    const option=req.body

    db.query(area.searchTown(option),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'没有查询到镇'}})

        res.send({
            status:200,
            data:{
                msg:'查询成功',
                data:result
            }
        })
    })
})

router.post('/getVillage',function(req,res,next){
    const option=req.body

    db.query(area.searchVillage(option),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'没有查询到村'}})
        
        res.send({
            status:200,
            data:{
                msg:'查询成功',
                data:result
            }
        })
    })
})


module.exports = router;