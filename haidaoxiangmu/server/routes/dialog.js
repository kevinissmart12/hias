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
    //需要分为添加和更新操作
    //如果为添加，只需要修改两个表的checkStatus即可
    //如果为更新，既要修改两个表的checkStatus，还要把当前新数据读出来，并更新内容

    //对当前要处理的对象，先进行查找，如果未删除状态，则提示，当前对象已删除
    //如果当前对象未被审核，跳过以下判断
    if(checkingData.op_obj_id){
        if(checkingData.op_obj==0){
            db.query(ponds.get(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.length==0)return res.send({status:400,data:{msg:'未能查找到要修改的对象'}})

                if(result[0].deleteStatus==1){
                    //表明当前对象未删除状态
                    //不用再执行下面的拒绝操作
                    return res.send({
                        status:200,
                        data:{
                            msg:'当前对象已被删除',
                        },
                        deleteStatus:1

                    })
                }else{
                    passFn()
                }
            })
        }else if(checkingData.op_obj==1){
            db.query(owner.get(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.length==0)return res.send({status:400,data:{msg:'未能查找到要修改的对象'}})

                if(result[0].deleteStatus==1){
                    //表明当前对象未删除状态
                    //不用再执行下面的拒绝操作
                    return res.send({
                        status:200,
                        data:{
                            msg:'当前对象已被删除',
                        },
                        deleteStatus:1

                    })
                }else{
                    passFn()
                }
            })
        }else if(checkingData.op_obj==2){
            db.query(products.get(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.length==0)return res.send({status:400,data:{msg:'未能查找到要修改的对象'}})

                if(result[0].deleteStatus==1){
                    //表明当前对象未删除状态
                    //不用再执行下面的拒绝操作
                    return res.send({
                        status:200,
                        data:{
                            msg:'当前对象已被删除',
                        },
                        deleteStatus:1

                    })
                }else{
                    passFn()
                }
            })
        }
    }else{
        passFn()
    }

    function passFn(){
        if(checkingData.type=='添加'){
            //未审核就要插入数据
            //未通过的就要修改checkStatus
            if(checkingData.CS=='未审核'){

                db.query(dialog.update(checkingData),function(err,result){
                    if(err)return res.send(err)
            
                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败'}})
                    
                    //再修改其他表
                    if(checkingData.op_obj==0){
                        //池塘
                        db.query(dialog.get(checkingData.id),function(err,result){
                            if(err)return res.send(err)
                            
                            if(result.length==0)return res.send({status:400,data:{msg:'查找失败0'}})
                        
                            let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
        
                            db.query(ponds.add(newData),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'添加失败0'}})
                                
                                let tempId=result.insertId
                                newData.id=tempId
                                //加密
                                let encryptData=encodeURIComponent(JSON.stringify(newData))
                                db.query(ponds.updateCheckStatus(1,tempId),function(err,result){
                                    if(err)return res.send(err)
                    
                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败0'}})
                                    //更新dialog中的new_obj
                                    //为其新增id
                                    db.query(dialog.updateNewObj(encryptData,checkingData.id),function(err,result){
                                        if(err)return res.send(err)
                    
                                        if(result.affectedRows==0)return res.send({status:400,data:{msg:'新增id失败2'}})
                                        
                                        res.send({
                                            status:200,
                                                data:{
                                                    msg:'已通过',
                                                }
                                        })
                                    })
                                })
                            })
                        })
                        
                    }else if(checkingData.op_obj==1){
                        //拥有者
                        db.query(dialog.get(checkingData.id),function(err,result){
                            if(err)return res.send(err)
                            
                            if(result.length==0)return res.send({status:400,data:{msg:'查找失败1'}})
                        
                            let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
                            db.query(owner.add(newData),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'添加失败1'}})
                
                                let tempId=result.insertId
                                newData.id=tempId
                                //加密
                                let encryptData=encodeURIComponent(JSON.stringify(newData))
                                db.query(owner.updateCheckStatus(1,tempId),function(err,result){
                                    if(err)return res.send(err)
                    
                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败1'}})
                                    //更新dialog中的new_obj
                                    //为其新增id
                                    db.query(dialog.updateNewObj(encryptData,checkingData.id),function(err,result){
                                        if(err)return res.send(err)
                    
                                        if(result.affectedRows==0)return res.send({status:400,data:{msg:'新增id失败2'}})
                                        
                                        res.send({
                                            status:200,
                                                data:{
                                                    msg:'已通过',
                                                }
                                        })
                                    })
                                })
                            })
                        })
                    }else if(checkingData.op_obj==2){
                        //水产品
                        //从dialog中找出要修改的字段
                        db.query(dialog.get(checkingData.id),function(err,result){
                            if(err)return res.send(err)
                            
                            if(result.length==0)return res.send({status:400,data:{msg:'查找失败2'}})
                            //获取数据
                            let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
                            //插入数据
                            db.query(products.add(newData),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'添加失败2'}})
                                //获取插入的id
                                let tempId=result.insertId
                                
                                newData.id=tempId
                                //加密
                                let encryptData=encodeURIComponent(JSON.stringify(newData))
                                //更改checkStatus
                                db.query(products.updateCheckStatus(1,tempId),function(err,result){
                                    if(err)return res.send(err)
                    
                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败2'}})
                                    //更新dialog中的new_obj
                                    //为其新增id
                                    db.query(dialog.updateNewObj(encryptData,checkingData.id),function(err,result){
                                        if(err)return res.send(err)
                    
                                        if(result.affectedRows==0)return res.send({status:400,data:{msg:'新增id失败2'}})
                                        
                                        res.send({
                                            status:200,
                                                data:{
                                                    msg:'已通过',
                                                }
                                        })
                                    })
                                })
                            })
                        })
                    }
                })
            }
            if(checkingData.CS=='未通过'){
                db.query(dialog.update(checkingData),function(err,result){
                    if(err)return res.send(err)
                    
                    if(result.length==0)return res.send({status:400,data:{msg:'更新失败'}})
                    //再修改其他表
                    //先看要通过的对象有没有op_obj_id
                    //如果没有就要进行插入
                    
                    if(!checkingData.op_obj_id||checkingData.op_obj_id==65535){
                        if(checkingData.op_obj==0){
                            //池塘
                            //获取new_obj
                            db.query(dialog.get(checkingData.id),function(err,result){
                                if(err)return res.send(err)
                                
                                if(result.length==0)return res.send({status:400,data:{msg:'查找失败0'}})
                            
                                let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
            
                                db.query(ponds.add(newData),function(err,result){
                                    if(err)return res.send(err)
                    
                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'添加失败0'}})
                                    
                                    let tempId=result.insertId
                                    newData.id=tempId
                                    //加密
                                    let encryptData=encodeURIComponent(JSON.stringify(newData))
                                    db.query(ponds.updateCheckStatus(1,tempId),function(err,result){
                                        if(err)return res.send(err)
                        
                                        if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败0'}})
                                        //更新dialog中的new_obj
                                        //为其新增id
                                        db.query(dialog.updateNewObj(encryptData,checkingData.id),function(err,result){
                                            if(err)return res.send(err)
                        
                                            if(result.affectedRows==0)return res.send({status:400,data:{msg:'新增id失败2'}})
                                            
                                            res.send({
                                                status:200,
                                                    data:{
                                                        msg:'已通过',
                                                    }
                                            })
                                        })
                                    })
                                })
                            })
                        }else if(checkingData.op_obj==1){
                            //拥有者
                            db.query(dialog.get(checkingData.id),function(err,result){
                                if(err)return res.send(err)
                                
                                if(result.length==0)return res.send({status:400,data:{msg:'查找失败1'}})
                            
                                let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
                                db.query(owner.add(newData),function(err,result){
                                    if(err)return res.send(err)
                    
                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'添加失败1'}})
                    
                                    let tempId=result.insertId
                                    newData.id=tempId
                                    //加密
                                    let encryptData=encodeURIComponent(JSON.stringify(newData))
                                    db.query(owner.updateCheckStatus(1,tempId),function(err,result){
                                        if(err)return res.send(err)
                        
                                        if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败1'}})
                                        //更新dialog中的new_obj
                                        //为其新增id
                                        db.query(dialog.updateNewObj(encryptData,checkingData.id),function(err,result){
                                            if(err)return res.send(err)
                        
                                            if(result.affectedRows==0)return res.send({status:400,data:{msg:'新增id失败2'}})
                                            
                                            res.send({
                                                status:200,
                                                    data:{
                                                        msg:'已通过',
                                                    }
                                            })
                                        })
                                    })
                                })
                            })
                        }else if(checkingData.op_obj==2){
                            //水产品
                            db.query(dialog.get(checkingData.id),function(err,result){
                                if(err)return res.send(err)
                                
                                if(result.length==0)return res.send({status:400,data:{msg:'查找失败2'}})
                                //获取数据
                                let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
                                //插入数据
                                db.query(products.add(newData),function(err,result){
                                    if(err)return res.send(err)
                                    
                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'添加失败2'}})
                                    //获取插入的id
                                    let tempId=result.insertId
                                    
                                    newData.id=tempId
                                    //加密
                                    let encryptData=encodeURIComponent(JSON.stringify(newData))
                                    //更改checkStatus
                                    db.query(products.updateCheckStatus(1,tempId),function(err,result){
                                        if(err)return res.send(err)
                        
                                        if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败2'}})
                                        //更新dialog中的new_obj
                                        //为其新增id
                                        db.query(dialog.updateNewObj(encryptData,checkingData.id),function(err,result){
                                            if(err)return res.send(err)
                        
                                            if(result.affectedRows==0)return res.send({status:400,data:{msg:'新增id失败2'}})
                                            
                                            res.send({
                                                status:200,
                                                data:{
                                                    msg:'已通过',
                                                }
                                            })
                                        })
                                    })
                                })
                            })
                        }

                    }else{
                        if(checkingData.op_obj==0){
                            //池塘
                            db.query(ponds.updateCheckStatus(checkingData.checkStatus,checkingData.op_obj_id),function(err,result){
                                    if(err)return res.send(err)
        
                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败0'}})
        
                                    res.send({
                                        status:200,
                                            data:{
                                                msg:'已拒绝',
                                            }
                                    })
                            })
                        }else if(checkingData.op_obj==1){
                            //拥有者
                            db.query(owner.updateCheckStatus(checkingData.checkStatus,checkingData.op_obj_id),function(err,result){
                                    if(err)return res.send(err)
        
                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败1'}})
        
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
        
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败2'}})
        
                                res.send({
                                    status:200,
                                    data:{
                                        msg:'已拒绝'
                                    }
                                })
                            })
                        }
                    }

                })
            }
        
        }
        if(checkingData.type=='修改'){
            db.query(dialog.update(checkingData),function(err,result){
                if(err)return res.send(err)
        
                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败'}})
                
                //再修改其他表
                if(checkingData.op_obj==0){
                    //池塘
                    db.query(dialog.get(checkingData.id),function(err,result){
                        if(err)return res.send(err)
                        
                        if(result.length==0)return res.send({status:400,data:{msg:'查找失败0'}})
                    
                        let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
                        //去具体的表修改数据
                        db.query(ponds.update(newData),function(err,result){
                            if(err)return res.send(err)
                        
                            if(result.length==0)return res.send({status:400,data:{msg:'更新失败0'}})
                            
                            db.query(ponds.updateCheckStatus(1,checkingData.op_obj_id),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败0'}})
                                res.send({
                                    status:200,
                                        data:{
                                            msg:'已通过',
                                        }
                                })
                            })
                            
                        })
                            
                    })
                }else if(checkingData.op_obj==1){
                    //拥有者
                    db.query(dialog.get(checkingData.id),function(err,result){
                        if(err)return res.send(err)
                        
                        if(result.length==0)return res.send({status:400,data:{msg:'查找失败1'}})
                    
                        let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
                        //去具体的表修改数据
                        db.query(owner.update(newData),function(err,result){
                            if(err)return res.send(err)
                        
                            if(result.length==0)return res.send({status:400,data:{msg:'更新失败1'}})
                            
                            db.query(owner.updateCheckStatus(1,checkingData.op_obj_id),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败1'}})
                                res.send({
                                    status:200,
                                    data:{
                                        msg:'已通过',
                                    }
                                })
                            })
                            
                        })
                    })

                }else if(checkingData.op_obj==2){
                    //水产品
                    //接下来修改具体数据
                    db.query(dialog.get(checkingData.id),function(err,result){
                        if(err)return res.send(err)
                        
                        if(result.length==0)return res.send({status:400,data:{msg:'查找失败2'}})
                    
                        let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
                        //去具体的表修改数据
                        db.query(products.update(newData),function(err,result){
                            if(err)return res.send(err)
                        
                            if(result.length==0)return res.send({status:400,data:{msg:'更新失败2'}})
                            
                            db.query(products.updateCheckStatus(1,checkingData.op_obj_id),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败2'}})
                                res.send({
                                    status:200,
                                        data:{
                                            msg:'已通过',
                                        }
                                })
                            })
                            
                        })
                            
                    })

                }
            })
        }
    }




})

//deny
router.post('/deny',function(req,res,next){
    const checkingData=req.body

    //对当前要处理的对象，先进行查找，如果未删除状态，则提示，当前对象已删除
    //如果当前对象未被审核，跳过以下判断
    if(checkingData.op_obj_id){
        if(checkingData.op_obj==0){
            db.query(ponds.get(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.length==0)return res.send({status:400,data:{msg:'未能查找到要修改的对象'}})

                if(result[0].deleteStatus==1){
                    //表明当前对象未删除状态
                    //不用再执行下面的拒绝操作
                    return res.send({
                        status:200,
                        data:{
                            msg:'当前对象已被删除',
                        },
                        deleteStatus:1
                    })
                }else{
                    denyFn()
                }
            })
        }else if(checkingData.op_obj==1){
            
            db.query(owner.get(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.length==0)return res.send({status:400,data:{msg:'未能查找到要修改的对象'}})

                if(result[0].deleteStatus==1){
                    //表明当前对象未删除状态
                    //不用再执行下面的拒绝操作
                    return res.send({
                        status:200,
                        data:{
                            msg:'当前对象已被删除',
                        },
                        deleteStatus:1
                    })
                }else{
                    denyFn()
                }
            })
        }else if(checkingData.op_obj==2){
            db.query(products.get(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.length==0)return res.send({status:400,data:{msg:'未能查找到要修改的对象'}})

                if(result[0].deleteStatus==1){
                    //表明当前对象未删除状态
                    //不用再执行下面的拒绝操作
                    return res.send({
                        status:200,
                        data:{
                            msg:'当前对象已被删除',
                        },
                        deleteStatus:1
                    })
                }else{
                    denyFn()
                }
            })
        }
    }else{
        denyFn()
    }

    function denyFn(){
        
        if(checkingData.type=='添加'){
        
        
            //是否已近添加过新数据?
            if(checkingData.CS=='未审核'){
                
                db.query(dialog.update(checkingData),function(err,result){
                    if(err)return res.send(err)

                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败'}})

                    return res.send({
                        status:200,
                        data:{
                            msg:'已拒绝'
                        }
                    }) 
                })
            }
            else if(checkingData.CS='已通过'){
                
                db.query(dialog.get(checkingData.id),function(err,result){
                    if(err)return res.send(err)
                        
                    if(result.length==0)return res.send({status:400,data:{msg:'查找失败'}})

                    let newData=JSON.parse(decodeURIComponent(result[0].new_obj))
                    let id=newData.id

                    db.query(dialog.update(checkingData),function(err,result){
                        if(err)return res.send(err)
                        
                        if(result.length==0)return res.send({status:400,data:{msg:'更新失败'}})
                        //再修改其他表
                        if(checkingData.op_obj==0){
                            //池塘
                            db.query(ponds.updateCheckStatus(2,id),function(err,result){
                                    if(err)return res.send(err)

                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败0'}})

                                    res.send({
                                        status:200,
                                            data:{
                                                msg:'已拒绝',
                                            }
                                    })
                            })
                        }else if(checkingData.op_obj==1){
                            //拥有者
                            db.query(owner.updateCheckStatus(2,id),function(err,result){
                                    if(err)return res.send(err)

                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败1'}})

                                    res.send({
                                        status:200,
                                        data:{
                                            msg:'已拒绝'
                                        }
                                    })
                            })
                        }else if(checkingData.op_obj==2){
                            //水产品
                            db.query(products.updateCheckStatus(2,id),function(err,result){
                                    if(err)return res.send(err)

                                    if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败2'}})

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
                
            }
            

        }
        else if(checkingData.type=='修改'){
            //先修改dialog表，再修改其他表
            //改为未通过状态
            db.query(dialog.update(checkingData),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败'}})
                
                //再修改其他表
                if(checkingData.op_obj==0){
                    //池塘
                    //改为已审核状态 =>1
                    db.query(dialog.get(checkingData.id),function(err,result){
                        if(err)return res.send(err)
                        
                        if(result.length==0)return res.send({status:400,data:{msg:'查找失败0'}})
                    
                        let oldData=JSON.parse(decodeURIComponent(result[0].old_obj))
                        //去具体的表修改数据
                        db.query(ponds.update(oldData),function(err,result){
                            if(err)return res.send(err)
                        
                            if(result.length==0)return res.send({status:400,data:{msg:'更新失败0'}})
                            
                            db.query(ponds.updateCheckStatus(1,checkingData.op_obj_id),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'拒绝失败0'}})
                                res.send({
                                    status:200,
                                        data:{
                                            msg:'未通过',
                                        }
                                })
                            })
                            
                        })
                            
                    })
                }else if(checkingData.op_obj==1){
                    //拥有者
                    db.query(dialog.get(checkingData.id),function(err,result){
                        if(err)return res.send(err)
                        
                        if(result.length==0)return res.send({status:400,data:{msg:'查找失败1'}})
                    
                        let oldData=JSON.parse(decodeURIComponent(result[0].old_obj))
                        //去具体的表修改数据
                        db.query(owner.update(oldData),function(err,result){
                            if(err)return res.send(err)
                        
                            if(result.length==0)return res.send({status:400,data:{msg:'更新失败1'}})
                            
                            db.query(owner.updateCheckStatus(1,checkingData.op_obj_id),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败1'}})
                                res.send({
                                    status:200,
                                    data:{
                                        msg:'未通过',
                                    }
                                })
                            })
                            
                        })
                    })
                }else if(checkingData.op_obj==2){
                    //水产品
                    db.query(dialog.get(checkingData.id),function(err,result){
                        if(err)return res.send(err)
                        
                        if(result.length==0)return res.send({status:400,data:{msg:'查找失败2'}})
                        
                        let oldData=JSON.parse(decodeURIComponent(result[0].old_obj))
                        //去具体的表修改数据
                        db.query(products.update(oldData),function(err,result){
                            if(err)return res.send(err)
                        
                            if(result.length==0)return res.send({status:400,data:{msg:'更新失败2'}})
                            
                            db.query(products.updateCheckStatus(1,checkingData.op_obj_id),function(err,result){
                                if(err)return res.send(err)
                
                                if(result.affectedRows==0)return res.send({status:400,data:{msg:'通过失败2'}})
                                res.send({
                                    status:200,
                                        data:{
                                            msg:'未通过',
                                        }
                                })
                            })
                            
                        })
                            
                    })
                }
            })
        }
    }
    




})

router.post('/restore',function(req,res,next){
    const checkingData=req.body

    //先修改dialog表，再修改其他表
    db.query(dialog.delete(checkingData.id),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:'删除dialog失败'}})
        
        //再修改其他表
        if(checkingData.op_obj==0){
            //池塘
            db.query(ponds.updateDeleteStatus(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'还原失败0'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已还原'
                    }
                })
            })
        }else if(checkingData.op_obj==1){
            //拥有者
            db.query(owner.updateDeleteStatus(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'还原失败1'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已还原'
                    }
                })
            })
        }else if(checkingData.op_obj==2){
            //水产品
            db.query(products.updateDeleteStatus(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'还原失败2'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已还原'
                    }
                })
            })
        }
    })

})
router.post('/confirmDelete',function(req,res,next){
    const checkingData=req.body

    //先修改dialog表，令checkStatus为1，表示管理员通过此条删除请求
    db.query(dialog.update(checkingData),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:'修改checkStatus失败'}})
        
        //再修改其他表
        if(checkingData.op_obj==0){
            //池塘
            db.query(ponds.delete(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'删除失败0'}})

                res.send({
                    status:200,
                    data:{
                        msg:'已删除'
                    }
                })
            })
        }else if(checkingData.op_obj==1){
            //拥有者
            db.query(owner.delete(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'删除失败1'}})

                db.query(ponds.getByOwnerId(checkingData.op_obj_id),function(err,result){
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
        }else if(checkingData.op_obj==2){
            //水产品
            db.query(products.delete(checkingData.op_obj_id),function(err,result){
                if(err)return res.send(err)

                if(result.affectedRows==0)return res.send({status:400,data:{msg:'删除失败2'}})

                db.query(ponds.getByProductId(checkingData.op_obj_id),function(err,result){
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
        }
    })

})
router.post('/denyDelete',function(req,res,next){
    const checkingData=req.body

    //先修改dialog表，令checkStatus为1，表示管理员通过此条删除请求
    db.query(dialog.update(checkingData),function(err,result){
        if(err)return res.send(err)

        if(result.affectedRows==0)return res.send({status:400,data:{msg:'修改checkStatus失败'}})
        
        res.send({
            status:200,
            data:{
                msg:'已拒绝删除'
            }
        })
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