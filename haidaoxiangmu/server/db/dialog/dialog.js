const Dialog={
    //type=>0/1/2
    //op_obj=>0/1/2,还可以增加更多的字段
    //checkStatus,从其它表获取
    //old_obj,new_obj,
    add(option){
        const sql=`insert into dialog (uid,type,op_obj,checkStatus,checkResult,time,old_obj,new_obj) values ('${option.uid}','${option.type}','${option.op_obj}','${option.checkStatus}','${option.checkResult}','${option.time}','${option.old_obj}','${option.new_obj}')`
        return sql
    },
    //主要是更新checkStatus，表示通过或未通过
    update(option){
        const sql=`update dialog set checkStatus='${option.checkStatus}' where id=('${option.id}')`
        return sql
    },

    updateNewObj(new_obj,id){
        const sql=`update dialog set new_obj='${new_obj}' where id=('${id}')`
        return sql
    },
    //需要字段id
    //一般是不会用到的
    delete(id){
        const sql=`delete from dialog where (id='${id}')`
        return sql
    },
    //获取所有
    //无需字段
    getAll(option){
        const sql=`select * from dialog limit ${option.front},${option.end-option.front}`
        return sql
    },
    getLength(){
        const sql=`select count(*) as length from dialog`
        return sql
    },
    get(id){
        const sql=`select * from dialog where id='${id}'`
        return sql
    },


    search(option){
        let sql=``
        if(option.uid==''){
            sql=`select * from dialog where  uid like '%${option.uid}%' and  type like '%${option.type}%' and op_obj like '%${option.op_obj}%' limit ${option.front},${option.end-option.front}`
        }else{
            sql=`select * from dialog where  uid = '${option.uid}' and  type like '%${option.type}%' and op_obj like '%${option.op_obj}%' limit ${option.front},${option.end-option.front}`
        }
        return sql
    },
    searchLength(option){
        let sql=``
        if(option.uid==''){
            sql=`select count(*) as slength from dialog where uid like '%${option.uid}%' and type like '%${option.type}%' and op_obj like '%${option.op_obj}%'`
            
        }else{
            sql=`select count(*) as slength from dialog where uid = '${option.uid}' and type like '%${option.type}%' and op_obj like '%${option.op_obj}%'`
        }
        return sql
    },

}

exports=module.exports=Dialog