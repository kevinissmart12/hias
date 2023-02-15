const Products={

    //增加新的回复
    //输入除了id以外的其他信息
    add(option){
        const sql=`insert into reply (content,time,uid,did,rid) values ('${option.content}','${option.time}','${option.uid}','${option.did}','${option.rid}')`
        return sql
    },

    //获取回复
    //需要字段id
    get(id){
        const sql=`select * from reply where id=('${id}')`
        return sql
    },
    //获取所有回复
    //无需字段
    getAll(){
        const sql=`select * from reply`
        return sql
    },

    //更新回复信息
    //需要字段content,time,uid,did,rid
    update(option){
        const sql=`update reply set content='${option.content}',time='${option.time}',uid='${option.uid}',did='${option.did}',rid='${option.rid}' where id=('${option.id}')`
        return sql
    },

    //删除某条回复
    //需要字段id
    delete(id){
        const sql=`delete from reply where (id='${id}')`
        return sql
    },
    //删除某讨论下的回复
    //需要字段did
    deleteByDid(did){
        const sql=`delete from reply where did='${did}'`
        return sql
    },

    //获取某讨论下的回复
    //需要字段did
    getByDid(did){
        const sql=`select * from reply where did='${did}'`
        return sql
    },


    //子回复获取父回复
    //需要字段rid，然后就能获取一条父回复
    getByRid(rid){
        const sql=`select * from reply where id='${rid}'`
        return sql
    },
    //父回复本身删除，子回复一同删除
    //删除父回复下的所有子回复
    //需要字段rid
    deleteByRid(rid){
        const sql=`delete from reply where rid='${rid}' `
        return sql
    },
    //通过回复的id去找出回复的子回复
    getSubReply(id){
        const sql=`select * from reply where rid='${id}'`
        return sql
    }
}

exports=module.exports=Products
