export default {
    namespaced:true,
    state:{
        //获取的所有池塘
        polygons:[],
        //owner list，渲染的是选择的表
        owners:[],
        //product
        products:[],

        //form表里的所有属性，对接前端,
        //当form表变化，就要把变化的新值添加到polygons中
        //以后点击这个新的多边形，就根据这个新值显示
        number:'',
        //owner
        ownerId:'',
        owner:'',
        //product
        productId:'',
        product:'',
        productOutput:'',
        //经纬度
        lng:'',
        lat:'',
        //面积
        estimateArea:'',
        area:'',
        pondsType:'',
        //位置
        county:'',
        town:'',
        village:'',
        polygon:[],
        comment:'',
        //以下两个属性是被动的，不是前端设置的
        checkStatus:0,
        id:'',
        

        //添加池塘和停止绘制
        addPond:false,
        //编辑池塘和停止编辑
        editPond:false,

        drawingPolygon:'',


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

        //地图中心点
        center:'舟山市',
        //当前是否为点击点出发的时间
        clickFn:false,
        //是否刷新
        f5:false,


        //以下为allPonds的参数
        allPonds:[],



    },
    mutations:{
        //对获取的池塘数据进行处理
        setPolygons(state,data){
            if(state.polygons.length==0){
                data.forEach((i,v)=>{
                    if(i.deleteStatus==1){
                        return
                    }
                    let object={
                        position:{
                            lat:i.lat,
                            lng:i.lng,
                        },
                        polygon:[],
                        owner:i.owner,
                        product:i.product,
                        productOutput:i.productOutput,
                        area:i.area,
                        estimateArea:i.estimateArea,
                        pondsType:i.pondsType,
                        county:parseInt(i.county),
                        town:parseInt(i.town),
                        village:parseInt(i.village),
                        comment:i.comment,
                        number:i.number,
                        editing:false,
                        id:i.id,
                        checkStatus:i.checkStatus,
                        deleteStatus:i.deleteStatus
                    }

                    //对i.polygon做变化
                    let tempP=i.polygon.split(';')
                    tempP.forEach(subi=>{
                        let lat=subi.split(',')[1]
                        let lng=subi.split(',')[0]
                        let temp_obj={
                            lat:lat,
                            lng:lng
                        }
                        object.polygon.push(temp_obj)
                    })

                    state.polygons.push(object)
                })
            }

        },
        clearPolygons(state){
            state.polygons=[]
        },
        //以下两个方法用于设置所有owners和products
        setOwners(state,data){
            state.owners=data
        },
        setProducts(state,data){
            state.products=data
        },

        //form重置
        clearForm(state){
            state.number=''
            state.owner=''
            state.ownerId=''
            state.product=''
            state.productId=''
            state.productOutput=''
            state.lng=''
            state.lat=''
            state.estimateArea=''
            state.area=''
            state.pondsType=''
            state.county=''
            state.town=''
            state.village=''
            state.polygon=[]
            state.comment=''
            state.checkStatus=0
            state.id=''
        },
        //新增一个池塘
        //如果已存在就更新
        //data为是否处于编辑状态
        newPolygon(state,data){
            if(state.id!=65535&&state.id!=''){
                return
            }
            //id设定为65535
            let object={
                position:{
                    lat:state.lat,
                    lng:state.lng,
                },
                polygon:state.polygon,
                owner:{
                    id:state.ownerId,
                    name:state.owner,
                },
                product:{
                    id:state.productId,
                    name:state.product,
                },
                area:state.area,
                estimateArea:state.estimateArea,
                county:state.county,
                town:state.town,
                village:state.village,
                comment:state.comment,
                number:state.number,
                
                editing:data,
                id:65535
            }
            //查看polygons的最后一个id是否为65535
            if(state.polygons[state.polygons.length-1].id==object.id){
                //更新
                // console.log('修改成功');
                state.polygons[state.polygons.length-1]=object
            }else{
                //新增
                // console.log('添加成功');
                state.polygons.push(object)
            }
        },
        //非新增的池塘信息修改
        oldPolygon(state){
            
            state.polygons.forEach((i,v)=>{
                
                if(i.id==state.id){
                    let object={

                        owner:{
                            id:state.ownerId,
                            name:state.owner,
                        },
                        product:{
                            id:state.productId,
                            name:state.product,
                        },
                        area:state.area,
                        county:state.county,
                        town:state.town,
                        village:state.village,
                        comment:state.comment,
                        number:state.number,
                        productOutput:i.productOutput,
                        pondsType:i.pondsType,
                        
                        id:state.id
                    }
                    i.owner={
                        id:state.ownerId,
                        name:state.owner,
                    }
                    i.product={
                        id:state.productId,
                        name:state.product,
                    }
                    i.area=state.area
                    i.county=state.county
                    i.town=state.town
                    i.village=state.village
                    i.comment=state.comment
                    i.number=state.number
                    i.pondsType=state.pondsType
                    i.productOutput=state.productOutput
                }
            })
        },


        //已经成功往数据库中添加了池塘
        //把polygons中的id为65535的池塘改为正常id
        changeNormalId(state,data){
            state.polygons.forEach((i,v)=>{
                if(i.id==65535){
                    i.id=data
                }
            })
        },


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


        //number
        setNumber(state,data){
            state.number=data
        },
        setOwner(state,data){
            state.owner=data
        },
        setOwnerId(state,data){
            state.ownerId=data
        },
        setProduct(state,data){
            state.product=data
        },
        setProductId(state,data){
            state.productId=data
        },
        setProductOutput(state,data){
            state.productOutput=data
        },
        setLng(state,data){
            state.lng=data
        },
        setLat(state,data){
            state.lat=data
        },
        setEstimateArea(state,data){
            state.estimateArea=data
        },        
        setArea(state,data){
            state.area=data
        },
        setPondsType(state,data){
            state.pondsType=data
        },
        setCounty(state,data){
            state.county=data
            // setTimeout(()=>{
            //     if(!state.clickFn){
            //         //设置中心点
            //         state.center='舟山市'
            //         state.countyOption.forEach((i,v)=>{
            //             if(i.value==data){
            //                 state.center+=i.label
            //             }
            //         })
            //     }
            // },200)


        },
        setTown(state,data){
            state.town=data
            // setTimeout(()=>{
            //     if(!state.clickFn){
            //         //设置中心点
            //         state.center='舟山市'
            //         state.countyOption.forEach((i,v)=>{
            //             if(i.value==state.county){
            //                 state.center+=i.label
            //             }
            //         })
            //         state.townData.forEach((i,v)=>{
            //             if(i.id==data){
            //                 state.center+=i.town
            //             }
            //         })
            //     }
            // },200)

        },
        setVillage(state,data){
            state.village=data
            // setTimeout(()=>{
            //     if(!state.clickFn){
            //         //设置中心点
            //         state.center='舟山市'
            //         state.countyOption.forEach((i,v)=>{
            //             if(i.value==state.county){
            //                 state.center+=i.label
            //             }
            //         })
            //         state.townData.forEach((i,v)=>{
            //             if(i.id==state.town){
            //                 state.center+=i.town
            //             }
            //         })
            //         state.villageData.forEach((i,v)=>{
            //             if(i.id==data){
            //                 state.center+=i.village
            //             }
            //         })
            //     }else{
            //         state.center={
            //             lng:state.lng,
            //             lat:state.lat
            //         }
            //     }
            // },200)

        },
        setCenter(state){
            setTimeout(()=>{
                    //设置中心点
                    // state.center='舟山市'
                    state.center={
                        lng:state.lng,
                        lat:state.lat
                    }
                    // state.countyOption.forEach((i,v)=>{
                    //     if(i.value==state.county){
                    //         state.center+=i.label
                    //     }
                    // })
                    // state.townData.forEach((i,v)=>{
                    //     if(i.id==state.town){
                    //         state.center+=i.town
                    //     }
                    // })
                    // state.villageData.forEach((i,v)=>{
                    //     if(i.id==state.village){
                    //         state.center+=i.village
                    //     }
                    // })
            },100)
        },

        setClickFn(state,data){
            state.clickFn=data
        },
        setPolygon(state,data){
            state.polygon=data
        },        
        setComment(state,data){
            state.comment=data
        },
        setCheckStatus(state,data){
            state.checkStatus=data
        },
        setId(state,data){
            state.id=data
        },
        
        //添加池塘和停止绘制
        setAddPond(state,data){
            state.addPond=data
        },
        //编辑池塘和停止编辑
        setEditPond(state,data){
            state.editPond=data
        },

        //以下两个函数，是用来设置当前选中的多边形是否可以编辑
        //设置为可以编辑
        setEditing(state,data){
            console.log(data);
            state.polygons.forEach((i,v)=>{
                if(data.id==i.id){
                    i.editing=data.editing
                }
            })
        },
        //全部设置为不可编辑
        setEditingFalse(state){
            state.polygons.forEach((i,v)=>{
                i.editing=false
            })
        },

        //更新polygons数组中的值，
        //同时还要更新form值
        editPolygon(state,data){
            state.polygons.forEach((i,v)=>{
                if(i.id==data.id){
                    i.position.lng=data.lng
                    i.position.lat=data.lat
                    i.estimateArea=data.estimateArea
                    i.polygon=data.paths
                    //更新form
                    state.lng=data.lng
                    state.lat=data.lat
                    state.estimateArea=data.estimateArea
                    state.polygon=data.paths
                }
            })
        },


        setDrawingPolygon(state,data){

            let str=''
            data.forEach((i,v)=>{
                str=str.concat(i.lng,',',i.lat,';')
            })
            str=str.slice(0, str.length - 1)
            
            state.drawingPolygon=str
        },
        ResetDrawingPolygon(state){
            //初始化
            let str=''
            if(state.drawingPolygon==''){
                //找到polygons中选中的池塘
                state.polygons.forEach((i,v)=>{
                    if(i.id==state.id){
                        i.polygon.forEach((subi,subv)=>{
                            str=str.concat(subi.lng,',',subi.lat,';')
                        })
                        str=str.slice(0, str.length - 1)
                        state.drawingPolygon=str
                        return
                    }
                })
            }
        },
        clearDrawinfPolygon(state){
            state.drawingPolygon=''
        },
        

        setF5(state){
            state.f5=true

        },
        setF5False(state){
            state.f5=false
        },

        //allponds
        setAllPonds(state,data){
            let arr=data.filter(item=>item.deleteStatus!=1)

            setTimeout(()=>{
                arr.forEach((i,v)=>{
                    if(i.productId==''){
                        i.product='Null'
                    }
                    if(i.ownerId==''){
                        i.owner='Null'
                    }
                    i.ownerId=i.owner.id
                    i.owner=i.owner.name
                    i.productId=i.product.id
                    i.product=i.product.name
                    
                    if(i.checkStatus==0){
                        i.checkStatus='审核中'
                    }else if(i.checkStatus==1){
                        i.checkStatus='已通过'
                    }else if(i.checkStatus==2){
                        i.checkStatus='未通过'
                    }

                    if(i.pondsType=='0'){
                        i.pondsType='海水养殖'
                    }else if(i.pondsType=='1'){
                        i.pondsType='淡水养殖'
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
                state.allPonds=arr
            },100)
            
        },
        clearAllPonds(state){
            state.allPonds=[]
        },
        //把特定的一行提到第一行
        changeToFirst(state,id){
            setTimeout(()=>{
                let obj=state.allPonds.filter(item=>item.id==id)
                let arr=state.allPonds.filter(item=>item.id!=id)
                arr.unshift(obj[0])
                state.allPonds=arr
            },100)
        },
        deletePonds(state,id){
            state.allPonds=state.allPonds.filter(item=>item.id!=id)
        },

    }

}