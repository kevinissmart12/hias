const Ponds={

    //增加新的池塘
    //输入除了id以外的其他信息
    add(option){
        const sql=`insert into aquaculture_ponds (number,lat,lng,area,estimateArea,pondsType,county,town,village,polygon,ownerId,productId,productOutput,comment,checkStatus,deleteStatus) values ('${option.number}',${option.lat},${option.lng},${option.area},${option.estimateArea},'${option.pondsType}','${option.county}','${option.town}','${option.village}','${option.polygon}','${option.ownerId}','${option.productId}','${option.productOutput}','${option.comment}','${option.checkStatus}','0')`
        return sql
    },

    //获取池塘
    //需要字段id
    get(id){
        const sql=`select * from aquaculture_ponds where id=('${id}')`
        return sql
    },
    //获取所有池塘
    //无需字段
    //checkstatus=1
    getAllPass(){
        const sql=`select * from aquaculture_ponds where checkStatus = 1`
        return sql
    },
    //无checkstatus
    getAll(){
        const sql=`select * from aquaculture_ponds`
        return sql
    },

    //更新池塘信息
    //需要字段id,number,lat,lng,area,estimateArea,breedMethod,breedType,county,town,village,polygon,ownerId,productId,comment,checkStatus
    update(option){
        const sql=`update aquaculture_ponds set number='${option.number}',lat=${option.lat},lng=${option.lng},area=${option.area}, estimateArea=${option.estimateArea},pondsType='${option.pondsType}',county='${option.county}',town='${option.town}',village='${option.village}',polygon='${option.polygon}',ownerId='${option.ownerId}',productId='${option.productId}',productOutput='${option.productOutput}',comment='${option.comment}',checkStatus='${option.checkStatus}',deleteStatus='0' where id=('${option.id}')`
        return sql
    },


    //删除某池塘
    //需要字段id
    delete(id){
        const sql=`update aquaculture_ponds set deleteStatus='1' where id=('${id}')`

        return sql
    },
    updateDeleteStatus(id){
        const sql=`update aquaculture_ponds set deleteStatus='0' where id=('${id}')`

        return sql
    },

    //通过ownerId获取池塘
    getByOwnerId(ownerId){
        const sql=`select * from aquaculture_ponds where ownerId=('${ownerId}')`
        return sql
    },
    //更新ownerId 添加&更改&删除
    updateOwnerId(ownerId,id){
        const sql=`update aquaculture_ponds set ownerId='${ownerId}' where id=('${id}')`
        return sql
    },
    //通过productId获取池塘
    getByProductId(productId){
        const sql=`select * from aquaculture_ponds where productId=('${productId}')`
        return sql
    },
    //更新productId 添加&更改&删除
    updateProductId(productId,id){
        const sql=`update aquaculture_ponds set productId='${productId}' where id=('${id}')`
        return sql
    },

    //更新checkStatus
    updateCheckStatus(n,id){
        const sql=`update aquaculture_ponds set checkStatus='${n}' where id=('${id}')`
        return sql
    },


    search(option){
        const sql1=`select * from aquaculture_ponds where `
        const sql2=` and county like '%${option.county}%' and town like '%${option.town}%' and village like '%${option.village}%' and checkStatus like '%${option.checkStatus}%' and deleteStatus like '%${option.deleteStatus}%'`
        let sql3=``
        if(option.ownerId==''&&option.productId==''){
            sql3=`ownerId like '%${option.ownerId}%' and productId like '%${option.productId}%'`
        }else if(option.ownerId!=''&&option.productId==''){
            sql3=`ownerId = '${option.ownerId}' and productId like '%${option.productId}%'`
        }else if(option.ownerId==''&&option.productId!=''){
            sql3=`ownerId like '%${option.ownerId}%' and productId = '${option.productId}'`
        }else if(option.ownerId!=''&&option.productId!=''){
            sql3=`ownerId = '${option.ownerId}' and productId = '${option.productId}'`
        }
        const sql=sql1+sql3+sql2
        // const sql=`select * from aquaculture_ponds where ownerId = '${option.ownerId}' and productId = '${option.productId}' and county like '%${option.county}%' and town like '%${option.town}%' and village like '%${option.village}%' and checkStatus like '%${option.checkStatus}%' and deleteStatus like '%${option.deleteStatus}%'`
        return sql
    },



}

exports=module.exports=Ponds
