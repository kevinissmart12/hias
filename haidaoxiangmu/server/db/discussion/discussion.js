const Products={

    //增加新的讨论
    //输入 id title,content,time,uid
    add(option){
        const sql=`insert into discussion (title,content,time,uid) values ('${option.title}','${option.content}','${option.time}','${option.uid}')`
        return sql
    },

    //获取讨论
    //需要字段id
    get(id){
        const sql=`select * from discussion where id=('${id}')`
        return sql
    },
    //获取所有讨论
    //无需字段
    getAll(){
        const sql=`select * from discussion`
        return sql
    },

    //更新讨论
    //需要字段 title,content,time,uid
    update(option){
        const sql=`update discussion set title='${option.title}',content='${option.content}',time='${option.time}',uid='${option.uid}' where id=('${option.id}')`
        return sql
    },

    //删除某讨论
    //需要字段id
    delete(id){
        const sql=`delete from discussion where (id='${id}')`
        return sql
    }


}

exports=module.exports=Products
