const Products={

    //增加新的水产产品
    //输入除了id以外的其他信息
    add(option){
        const sql=`insert into aquaculture_products (name,type,description,imgUrl,breedMethod,breedTech,diseases,checkStatus,deleteStatus) values ('${option.name}','${option.type}','${option.description}','${option.imgUrl}','${option.breedMethod}','${option.breedTech}','${option.diseases}','${option.checkStatus}','0')`
        return sql
    },

    //获取水产信息
    //需要字段id
    get(id){
        const sql=`select * from aquaculture_products where id=('${id}')`
        return sql
    },
    //获取所有水产信息
    //无需字段
    getAll(){
        const sql=`select * from aquaculture_products`
        return sql
    },
    getAllPass(){
        const sql=`select * from aquaculture_products where checkStatus = 1`
        return sql
    },
    //更新水产信息
    //需要字段id,name,type,description,imgUrl,breedTech,diseases
    update(option){
        const sql=`update aquaculture_products set name='${option.name}',type='${option.type}',description='${option.description}',imgUrl='${option.imgUrl}',breedMethod='${option.breedMethod}', breedTech='${option.breedTech}',diseases='${option.diseases}',checkStatus='${option.checkStatus}',deleteStatus='0' where id=('${option.id}')`
        return sql
    },

    //删除某条水产品
    //需要字段id
    delete(id){
        // const sql=`delete from aquaculture_products where (id='${id}')`
        const sql=`update aquaculture_products set deleteStatus='1' where id=('${id}')`

        return sql
    },

    //更新checkStatus
    updateCheckStatus(n,id){
        const sql=`update aquaculture_products set checkStatus='${n}' where id=('${id}')`
        return sql
    },
    updateDeleteStatus(id){
        const sql=`update aquaculture_products set deleteStatus='0' where id=('${id}')`

        return sql
    },

    //根据product的名字搜索
    search(option){
        const sql=`select * from aquaculture_products where name like '%${option.name}%' and checkStatus like 1`
        return sql
    }


}

exports=module.exports=Products
