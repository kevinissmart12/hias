var express = require('express');
var router = express.Router();
//bcryptjs加密
var bcrypt = require('bcryptjs')
//token
var jwt = require('jsonwebtoken')
//配置文件
var config = require('../config/config')
//数据库
var db = require('../db/index')
//user sql模块
var user = require('../db/user/user')


const fs=require('fs')
//multer 图片上传
var multer=require('multer')

//上传owner，返回相对地址
router.post('/upload', multer({dest:'./data/user'}).single('file'), function (req, res, next) {

    fs.renameSync(req.file.path, `./data/user/${req.body.name}`)

    res.send({
        status:200,
        data:{
            msg:'上传成功',
            imgUrl:`/user/${req.body.name}`
        }
    })

})



//注册用户register 
//id name password isAdmin 0/1
//无需token
router.post('/register', function (req, res, next) {

    const userInfo = req.body
    //加密处理
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)


        db.query(user.searchName(userInfo.name),function(err,result){
            if (err) return res.send(err)

            if (result.length != 0) return res.send({ status: 400, data: { msg: '名称与他人重复' } })
            //不存在重复姓名

            db.query(user.registerUser(userInfo), function (err, result) {
                if (err) return res.send(err)
    
                if (result.affectedRows !== 1) return res.send({ status: 402, data: { msg: 'Bad Option' } })
    
                res.send({
                    status: 200,
                    data: {
                        msg: '注册成功',
                    }
                })
            })

        })
        

})

//登录login
//name password 
//无需token
router.post('/login', function (req, res, next) {
    //req.body为从前端传递来的数据
    const userInfo = req.body
    //调用数据库，并用user对象下searchName方法，根据name查找字段
    db.query(user.searchName(userInfo.name), function (err, result) {
        //错误，返回error
        if (err) return res.send(err)
        //查找到0条数据
        if (result.length == 0) return res.send({ status: 400, data: { msg: '该用户没有注册' } })
        //判断密码是否相等
        let comparedResult = bcrypt.compareSync(userInfo.password, result[0].password)
        //相等时
        if (comparedResult) {
            //密码正确应当返回的值
            let results = {
                'id': result[0].id,
                'name': result[0].name,
                'mobile': result[0].mobile,
                'isAdmin':result[0].isAdmin,
            }
            //用results生成token
            let token = jwt.sign(results, config.secretKey, { expiresIn: config.time })
            //密码正确
            res.send({
                status: 200,
                data: {
                    msg: '登录成功',
                    token: 'Bearer ' + token
                }
            })
        } else {
            //密码错误
            res.send({
                status: 402,
                data: {
                    msg: '密码错误',
                }
            })
        }
    })
})

//重置密码reset password
//name oldPassword newPassword
//无需token
router.post('/resetPwd', function (req, res, next) {
    const userInfo = req.body

    db.query(user.searchName(userInfo.name),function(err,result){
        if (err) return res.send(err)

        if (result.length == 0) return res.send({ status: 400, data: { msg: '没有注册' } })
        
        if(userInfo.oldPassword===userInfo.newPassword){
            return res.send({
                status:400,
                data:{
                    msg:'新密码不能和旧密码相同'
                }
            })
        }

        //比较密码 password
        let comparedResult = bcrypt.compareSync(userInfo.oldPassword, result[0].password)

        if(comparedResult){

            //加密密码
            let password = bcrypt.hashSync(userInfo.newPassword, 10)

            //重置密码
            db.query(user.updateUserPassword(password,result[0].id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'Bad Request for update password'}})

                res.send({
                    status:204,
                    data:{
                        msg:'密码修改成功'
                    }
                })
            })

        }else{
            //密码错误
            res.send({
                status: 402,
                data: {
                    msg: '密码错误',
                }
            })
        }

    })

})


//更改用户其他信息
//key:value(键值对)   //或者一次性改变所有值
//如name:nameValue
//需要token
router.post('/changeDetails',function(req,res,next){
    const userInfo=req.body

    db.query(user.searchName(userInfo.name),function(err,result){
        if(err)return res.send(err)

        if(result.length==1&&result[0].id!=userInfo.id)return res.send({status:400,data:{msg:'该名称与他人重复'}})
        //不重复
        db.query(user.updateUserDetails(userInfo),function(err,result){
            if(err)return res.send(err)
    
            if(result.affectedRows==0)return res.send({status:400,data:{msg:'修改个人信息失败'}})
    
            db.query(user.searchId(userInfo.id),function(err,result){
                if(err)return res.send(err)
    
                if(result.length==0)return res.send({status:400,data:{msg:'Bad Request for User'}})
    
                //更新token的内容
                let results = {
                    'id': result[0].id,
                    'name': result[0].name,
                    'mobile': result[0].mobile,
                }
                //用results生成token
                let token = jwt.sign(results, config.secretKey, { expiresIn: config.time })
    
                //因为更改了用户内容，token必须修改，不然会出现数据不一致的问题
                res.send({
                    status:200,
                    data:{
                        msg:'修改成功',
                        token
                    }
                })
    
            })
    
        })
    })




})


//根据token获取当前用户信息
//需要token
router.get('/user',function(req,res,next){

    let userInfo=req.user

    db.query(user.searchId(userInfo.id),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'信息错误'}})

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

        res.send({
            status:200,
            data:{
                msg:'返回成功',
                data:data
            }
        })
    })


})

//需要token
router.get('/getAll',function(req,res,next){

    db.query(user.getAll(),function(err,result){
        if(err)return res.send(err)

        if(result.length==0)return res.send({status:400,data:{msg:'未能获取用户'}})
        result.forEach((i,v)=>{
            delete i.password
        })

        res.send({
            status:200,
            data:{
                msg:'获取用户成功',
                data:result
            }
        })
    })


})







module.exports = router;
