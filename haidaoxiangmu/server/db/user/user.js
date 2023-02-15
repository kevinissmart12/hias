const User={

    //sql方法
    //搜索所有用户
    searchUser(){
        const sql=`select * from user`
        return sql
    },

    //register注册用户
    //id name password isAdmin0/1
    registerUser(option){
        const sql=`insert into user(name,password,isAdmin)values('${option.name}','${option.password}','${option.isAdmin}')`
        return sql
    },
    //搜索user表
    //查询是否有匹配的id
    searchId(id){
        const sql=`select * from user where id='${id}'`
        return sql
    },
    //搜索user表
    //查询是否有匹配的手机号
    searchMobile(mobile){
        const sql=`select * from user where mobile='${mobile}'`
        return sql
    },

    //搜索user表
    //查询是否有匹配的名字
    searchName(name){
        const sql=`select * from user where name='${name}'`
        return sql
    },

    //根据id更新用户密码  
    updateUserPassword(password,id){
        const sql=`update user set password='${password}' where (id='${id}')`
        return sql
    },

    //update user deatils
    updateUserDetails(option){
        const sql=`update user set name='${option.name}', mobile='${option.mobile}',imgUrl='${option.imgUrl}',sex='${option.sex}',department='${option.department}',birthday='${option.birthday}' where (id='${option.id}')`
        return sql
    },


    //获取所有user
    getAll(){
        const sql=`select * from user `
        return sql
    }





}

exports=module.exports=User