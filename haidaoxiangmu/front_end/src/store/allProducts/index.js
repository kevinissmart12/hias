export default {
    namespaced:true,
    state:{
        tableData:[]
    },
    mutations:{
        setTableData(state,data){

            data.forEach((i,v)=>{
                if(i.checkStatus==0){
                    i.checkStatus='审核中'
                }else if(i.checkStatus==1){
                    i.checkStatus='已通过'
                }else if(i.checkStatus==2){
                    i.checkStatus='未通过'
                }
                
            })

            state.tableData=data
        },
        
    }

}