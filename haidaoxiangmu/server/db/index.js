//导入数据库
const mysql=require('mysql');

const db=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'healthy_island_aquaculture_system',
    port:'3306'
});


module.exports=db;