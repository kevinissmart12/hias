const Area={

    //获取所有town
    getAllTown(){
        const sql=`select * from town`
        return sql
    },
    //village
    getAllVillage(){
        const sql=`select * from village`
        return sql
    },
    //搜索town
    //根据前端传来的countyId值来返回town
    //然后根据输入的值来再搜索
    searchTown(option){
        const sql=`select * from town where countyId='${option.countyId}'`
        return sql
    },
    searchVillage(option){
        const sql=`select * from village where Tid='${option.Tid}'`
        return sql
    },


}

exports=module.exports=Area
