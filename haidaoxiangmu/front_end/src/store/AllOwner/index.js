export default {
    namespaced:true,
    state:{
        tableData:[],
        countyOption:[
            {
                value: 1,
                label: '定海区'
            }, 
            {
                value: 2,
                label: '普陀区'
            }, 
            {
                value: 3,
                label: '岱山县'
            }, 
            {
                value: 4,
                label: '嵊泗县'
            }, 
        ],
        townData:[],
        villageData:[],
    },
    mutations:{
        setTableData(state,data){
            let arr=data.filter(item=>item.deleteStatus!=1)
            

            setTimeout(()=>{
                arr.forEach((i,v)=>{
                    if(i.checkStatus==0){
                        i.checkStatus='审核中'
                    }else if(i.checkStatus==1){
                        i.checkStatus='已审核'
                    }else if(i.checkStatus==2){
                        i.checkStatus='未通过'
                    }
                    //替换county
                    state.countyOption.forEach((ci,cv)=>{
                        if(i.county==ci.value){
                            i.county=parseInt(i.county)
                            //新增一个值，表示county内容，
                            i.countyContent=ci.label
                        }
                    })
                    
                    //替换镇
                    state.townData.forEach((ti,tv)=>{
                        if(i.town==ti.id){
                            i.town=parseInt(i.town)
                            i.townContent=ti.town
                        }
                    })
                    // //替换村
                    state.villageData.forEach((vi,vv)=>{
                        if(i.village==vi.id){
                            i.village=parseInt(i.village)
                            i.villageContent=vi.village
                        }
                    })
                })
            },500)


            state.tableData=arr
        },
        deleteItem(state,id){
            state.tableData=state.tableData.filter(item=>item.id!=id)
        },
        addItem(state,data){
            data.checkStatus='已审核'
            //替换county
            state.countyOption.forEach((ci,cv)=>{
                if(data.county==ci.value){
                    data.county=parseInt(data.county)
                    //新增一个值，表示county内容，
                    data.countyContent=ci.label
                }
            })
            
            //替换镇
            state.townData.forEach((ti,tv)=>{
                if(data.town==ti.id){
                    data.town=parseInt(data.town)
                    data.townContent=ti.town
                }
            })
            // //替换村
            state.villageData.forEach((vi,vv)=>{
                if(data.village==vi.id){
                    data.village=parseInt(data.village)
                    data.villageContent=vi.village
                }
            })
            state.tableData.push(data)
        },
        updateItem(state,data){
                state.tableData=state.tableData.filter(item=>item.id!=data.id)
                //替换county
                state.countyOption.forEach((ci,cv)=>{
                    if(data.county==ci.value){
                        data.county=parseInt(data.county)
                        //新增一个值，表示county内容，
                        data.countyContent=ci.label
                    }
                })
                //替换镇
                state.townData.forEach((ti,tv)=>{
                    if(data.town==ti.id){
                        data.town=parseInt(data.town)
                        data.townContent=ti.town
                    }
                })
                // //替换村
                state.villageData.forEach((vi,vv)=>{
                    if(data.village==vi.id){
                        data.village=parseInt(data.village)
                        data.villageContent=vi.village
                    }
                })
                setTimeout(()=>{
                    state.tableData.unshift(data)
                },100)
            
        },

        setTownData(state,data){
            state.townData=data
        },
        setVillageData(state,data){
            state.villageData=data
        },
        
    }

}