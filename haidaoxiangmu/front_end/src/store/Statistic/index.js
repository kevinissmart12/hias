import time from '../../api/time'
export default {
    namespaced:true,
    state:{
        //共有属性
        countyData:[
            {
                id: 1,
                county: '定海区'
            }, 
            {
                id: 2,
                county: '普陀区'
            }, 
            {
                id: 3,
                county: '岱山县'
            }, 
            {
                id: 4,
                county: '嵊泗县'
            }, 
        ],
        townData:[],
        villageData:[],
        //以下为randomOwner属性
        randomOwner:[],

        //以下为pondsType属性
        pondsType:[],

        //以下为productsAO属性
        productsAO:[],

        //以下为townStatus属性
        allProducts:[],
        townStatus:[],
        tableHead:'',

    },
    mutations:{
        //共有属性
        setTownData(state,data){
            if(data){
                localStorage.setItem('town',JSON.stringify(data))
                state.townData=data
            }else{
                state.townData=JSON.parse(localStorage.getItem('town'))
            }
        },
        setVillageData(state,data){
            if(data){
                localStorage.setItem('village',JSON.stringify(data))
                state.villageData=data
            }else{
                state.villageData=JSON.parse(localStorage.getItem('village'))
            }
        },


        setRandomOwner(state,data){
            setTimeout(()=>{
                data.forEach((i,v)=>{
                    if(i.checkStatus==0){
                        i.checkStatus='审核中'
                    }else if(i.checkStatus==1){
                        i.checkStatus='已通过'
                    }else if(i.checkStatus==2){
                        i.checkStatus='未通过'
                    }

                    //替换county
                    state.countyData.forEach((ci,cv)=>{
                        if(i.county==ci.id){
                            i.county=parseInt(i.county)
                            //新增一个值，表示county内容，
                            i.countyContent=ci.county
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
                state.randomOwner=data
            },100)

            
        },

        setPondsType(state,data){
            // data.forEach((i,v)=>{
            //     console.log(i.checkStatus);
            // })
            // data.forEach((i,v)=>{
            //     console.log(i.deleteStatus);
            // })
            let pondsTypeArr=[]

            setTimeout(()=>{
                data.forEach((i,v)=>{
                    if(i.checkStatus!=1)return
                    if(i.deleteStatus!=0)return
                    //新对象
                    let newPondItem={
                        county:i.county,
                        town:i.town,
                        village:i.village,
                        seaArea:0,
                        seaEstimateArea:0,
                        freshWaterArea:0,
                        freshWaterEstimateArea:0,
                        totalArea:parseFloat(i.area),
                        totalEstimateArea:parseFloat(i.estimateArea),
                    }
                    if(pondsTypeArr.length==0){
                        //为空，将第一条数据插入
                        if(i.pondsType=='0'){
                            //海水
                            newPondItem.seaArea=parseFloat(i.area)
                            newPondItem.seaEstimateArea=parseFloat(i.estimateArea)
                            newPondItem.freshWaterArea=0
                            newPondItem.freshWaterEstimateArea=0
                        }else if(i.pondsType=='1'){
                            //淡水
                            newPondItem.seaArea=0
                            newPondItem.seaEstimateArea=0
                            newPondItem.freshWaterArea=parseFloat(i.area)
                            newPondItem.freshWaterEstimateArea=parseFloat(i.estimateArea)
                        }
                        pondsTypeArr.push(newPondItem)
                    }else{
                        //不为空
                        //查看当前项的village值是否和pondsTypeArr中的某一项相等，
                        //相等后，要根据池塘类型分类相加
                        let ifEqual=false
                        pondsTypeArr.forEach((pi,pv)=>{
                            if(pi.village==i.village){
                                ifEqual=true
                                if(i.pondsType=='0'){
                                    pi.seaArea+=parseFloat(i.area)
                                    pi.seaEstimateArea+=parseFloat(i.estimateArea)
                                }else if(i.pondsType=='1'){
                                    pi.freshWaterArea+=parseFloat(i.area)
                                    pi.freshWaterEstimateArea+=parseFloat(i.estimateArea)
                                }
                                //总面积
                                pi.totalArea+=parseFloat(i.area)
                                pi.totalEstimateArea+=parseFloat(i.estimateArea)
                                return
                            }
                        })
                        if(!ifEqual){
                            //不存在相等的，插入新对象
                            if(i.pondsType=='0'){
                                //海水
                                newPondItem.seaArea=parseFloat(i.area)
                                newPondItem.seaEstimateArea=parseFloat(i.estimateArea)
                                newPondItem.freshWaterArea=0
                                newPondItem.freshWaterEstimateArea=0
                            }else if(i.pondsType=='1'){
                                //淡水
                                newPondItem.seaArea=0
                                newPondItem.seaEstimateArea=0
                                newPondItem.freshWaterArea=parseFloat(i.area)
                                newPondItem.freshWaterEstimateArea=parseFloat(i.estimateArea)
                            }
                            pondsTypeArr.push(newPondItem)
                        }
                    }
                })
                
                pondsTypeArr.forEach((i,v)=>{
                    //替换county
                    state.countyData.forEach((ci,cv)=>{
                        if(i.county==ci.id){
                            i.county=parseInt(i.county)
                            //新增一个值，表示county内容，
                            i.countyContent=ci.county
                        }
                    })
                    //替换镇
                    state.townData.forEach((ti,tv)=>{
                        if(i.town==ti.id){
                            i.town=parseInt(i.town)
                            i.townContent=ti.town
                        }
                    })
                    //替换村
                    state.villageData.forEach((vi,vv)=>{
                        if(i.village==vi.id){
                            i.village=parseInt(i.village)
                            i.villageContent=vi.village
                        }
                    })
                    if(i.freshWaterEstimateArea!=0){
                        i.freshWaterEstimateArea=i.freshWaterEstimateArea.toFixed(5)
                    }
                    if(i.seaEstimateArea!=0){
                        i.seaEstimateArea=i.seaEstimateArea.toFixed(5)
                    }
                    if(i.totalEstimateArea!=0){
                        i.totalEstimateArea=i.totalEstimateArea.toFixed(5)
                    }
                    
                    
                    
                })

                state.pondsType=pondsTypeArr
            },100)

        },

        setProductsAO(state,data){
            let productsAOArr=[]
            setTimeout(()=>{
                data.forEach((i,v)=>{
                    if(i.checkStatus!=1)return
                    if(i.deleteStatus!=0)return
                    
                    //新对象
                    if(!i.product)return
                    let newProductItem={
                        county:i.county,
                        town:i.town,
                        village:i.village,
                        productId:i.productId,
                        product:i.product.name,
                        area:parseFloat(i.area),
                        productOutput:parseFloat(i.productOutput),
                    }
                    if(productsAOArr.length==0){
                        productsAOArr.push(newProductItem)
                    }else{
                        let ifEqual=false
                        productsAOArr.forEach((pi,pv)=>{
                            //村id和产品id相等，才能相加
                            if(pi.village==i.village&&pi.productId==i.productId){
                                ifEqual=true
                                pi.area+=parseFloat(i.area)
                                pi.productOutput+=parseFloat(i.productOutput)
                                return
                            }
                        })
                        if(!ifEqual){
                            //不存在相等的，插入新对象
                            productsAOArr.push(newProductItem)
                        }
                    }
                })

                productsAOArr.forEach((i,v)=>{
                    //替换county
                    state.countyData.forEach((ci,cv)=>{
                        if(i.county==ci.id){
                            i.county=parseInt(i.county)
                            //新增一个值，表示county内容，
                            i.countyContent=ci.county
                        }
                    })
                    //替换镇
                    state.townData.forEach((ti,tv)=>{
                        if(i.town==ti.id){
                            i.town=parseInt(i.town)
                            i.townContent=ti.town
                        }
                    })
                    //替换村
                    state.villageData.forEach((vi,vv)=>{
                        if(i.village==vi.id){
                            i.village=parseInt(i.village)
                            i.villageContent=vi.village
                        }
                    })

                    //新增一条数据，用于图表建立
                    i.villageProduct=i.villageContent+' '+i.product
                })



                state.productsAO=productsAOArr
            },100)

            // state.productsAO=data
        },


        setAllProducts(state,data){
            state.allProducts=data
        },
        setTownStatus(state,data){
            // console.log(data);
            let newTownStatus=[]
            let total={
                id:0,
                name:'合计',
                area:0,
                productOutput:0
            }
            setTimeout(()=>{
                //生成新数组
                
                state.allProducts.forEach((pi,pv)=>{
                    if(pi.deleteStatus!=0)return
                    if(pi.checkStatus!=1)return

                    let newItem={
                        id:pi.id,
                        name:pi.name,
                        area:0,
                        productOutput:0
                    }
                    newTownStatus.push(newItem)
                })
                
                //新数组循环
                if(!data){

                }else{
                    data.forEach((i,v)=>{
                        if(i.checkStatus!=1)return
                        if(i.deleteStatus!=0)return
                        newTownStatus.forEach((ni,nv)=>{
                            //相等就相加
                            if(ni.id==i.productId){
                                ni.area+=parseFloat(i.area)
                                ni.productOutput+=parseFloat(i.productOutput)
                                
                            }
                            
                        })
                        //合计
                        total.area+=parseFloat(i.area)
                        total.productOutput+=parseFloat(i.productOutput)
                        
                    })
                    newTownStatus.forEach((ni,nv)=>{
                        if(ni.area!=0){
                            ni.area=ni.area.toFixed(5)
                        }
                        if(ni.productOutput!=0){
                            ni.productOutput=ni.productOutput.toFixed(5)
                        }
                        
                        
                    })
                    if(total.area!=0){
                        total.area=total.area.toFixed(5)
                    }
                    if(total.productOutput!=0){
                        total.productOutput=total.productOutput.toFixed(5)
                    }
                    newTownStatus.unshift(total)
                }
            
                state.townStatus=newTownStatus
            },100)
            
        },
        setTableHead(state,data){
            let tableHead=''
            state.countyData.forEach((ci,cv)=>{
                if(data.county==''){
                    return
                }else{
                    if(ci.id==data.county){
                        tableHead+=ci.county
                    }
                }
            })
            state.townData.forEach((ti,tv)=>{
                if(data.town==''){
                    return
                }else{
                    if(ti.id==data.town){
                        tableHead+=ti.town
                    }
                }
            })
            state.villageData.forEach((vi,vv)=>{
                if(data.village==''){
                    return
                }else{
                    if(vi.id==data.village){
                        tableHead+=vi.village
                    }
                }
            })
            state.tableHead=tableHead
        }

    }

}