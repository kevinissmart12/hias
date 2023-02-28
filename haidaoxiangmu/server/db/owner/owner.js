const Ponds={

    //增加新的池塘
    //输入name,mobile,birthday,sex,imgUrl,address,town,village,engagedTime,educationLevel,farmerTitle,departmentId,discriminator,companyName,establishedTime,fixedAssets,businessContents,isBaseOfEmployee,numberOfEmployee,featuredProducts,creditLevel,comment
    add(option){
        const sql=`insert into owner (name,mobile,birthday,sex,imgUrl,address,county,town,village,engagedTime,educationLevel,farmerTitle,departmentId,discriminator,companyName,establishedTime,fixedAssets,businessContents,isBaseOfEmployee,numberOfEmployee,featuredProducts,creditLevel,comment,checkStatus) values ('${option.name}','${option.mobile}','${option.birthday}','${option.sex}','${option.imgUrl}','${option.address}','${option.county}','${option.town}','${option.village}','${option.engagedTime}','${option.educationLevel}','${option.farmerTitle}','${option.departmentId}','${option.discriminator}','${option.companyName}','${option.establishedTime}','${option.fixedAssets}','${option.businessContents}','${option.isBaseOfEmployee}','${option.numberOfEmployee}','${option.featuredProducts}','${option.creditLevel}','${option.comment}','${option.checkStatus}')`
        return sql
    },

    //获取池塘
    //需要字段id
    get(id){
        const sql=`select * from owner where id=('${id}')`
        return sql
    },
    //获取所有池塘
    //无需字段
    getAllPass(){
        const sql=`select * from owner where checkStatus = 1`
        return sql
    },
    getAll(){
        const sql=`select * from owner`
        return sql
    },

    //更新池塘信息
    //需要字段id,name,mobile,birthday,sex,imgUrl,address,town,village,engagedTime,educationLevel,farmerTitle,departmentId,
    //discriminator,companyName,establishedTime,fixedAssets,businessContents,isBaseOfEmployee,numberOfEmployee,featuredProducts,
    //creditLevel,comment
    update(option){
        const sql=`update owner set name='${option.name}',mobile='${option.mobile}',birthday='${option.birthday}',sex='${option.sex}',imgUrl='${option.imgUrl}', address='${option.address}',county='${option.county}',town='${option.town}',village='${option.village}',engagedTime='${option.engagedTime}',educationLevel='${option.educationLevel}',farmerTitle='${option.farmerTitle}',departmentId='${option.departmentId}',discriminator='${option.discriminator}',companyName='${option.companyName}',establishedTime='${option.establishedTime}',fixedAssets='${option.fixedAssets}',businessContents='${option.businessContents}',isBaseOfEmployee='${option.isBaseOfEmployee}',numberOfEmployee='${option.numberOfEmployee}',featuredProducts='${option.featuredProducts}',creditLevel='${option.creditLevel}',comment='${option.comment}',checkStatus='${option.checkStatus}' where id=('${option.id}')`
        return sql
    },

    //删除某条水产品
    //需要字段id
    delete(id){
        const sql=`delete from owner where (id='${id}')`
        return sql
    },

    //更新checkStatus
    updateCheckStatus(n,id){
        const sql=`update owner set checkStatus='${n}' where id=('${id}')`
        return sql
    },
    //模糊搜索
    //条件有countytown,village,discriminator,name,checkStatus
    //其中 除了name外，都是精准搜索
    search(option){
        const sql=`select * from owner where name like '%${option.name}%' and county like '%${option.county}%' and town like '%${option.town}%' and village like '%${option.village}%' and discriminator like '%${option.discriminator}%' and creditLevel like '%${option.creditLevel}%' and checkStatus like '%${option.checkStatus}%' `
        return sql
    },


    randomSelect(n){
        const sql=`select * from owner ORDER BY RAND() limit ${n}`
        return sql
    },


}

exports=module.exports=Ponds
