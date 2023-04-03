export default {
    namespaced:true,
    state:{
        tableData:[]
    },
    mutations:{
        setTableData(state,data){

            let arr=data.filter(item=>item.deleteStatus!=1)

            arr.forEach((i,v)=>{
                if(i.checkStatus==0){
                    i.checkStatus='审核中'
                }else if(i.checkStatus==1){
                    i.checkStatus='已审核'
                }else if(i.checkStatus==2){
                    i.checkStatus='未通过'
                }
                
            })

            state.tableData=arr
        },
        //把特定的一行提到第一行
        changeToFirst(state,id){
            // setTimeout(()=>{
                let obj=state.tableData.filter(item=>item.id==id)
                let arr=state.tableData.filter(item=>item.id!=id)
                arr.unshift(obj[0])
                state.tableData=arr
            // },100)
        },
        deleteProduct(state,id){
            state.tableData=state.tableData.filter(item=>item.id!=id)
        },
        
    }

}