import time from '../../api/time'
export default {
    namespaced:true,
    state:{
        userData:[],
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
        productData:[],
        ownerData:[],
        //当前查看的字段
        checkingData:{},


        //需要渲染的
        tableData:[],
        currentPage:1,
        pageSize:10,

        //
        search:false,
        form:{}
    },
    mutations:{
        setSearch(state,data){
            state.search=data
        },
        setForm(state,data){
            state.form=data
        },

        setTableData(state,data){
            data.forEach((i,v)=>{
                i.time=time.time(i.time)
                //类型
                if(i.type==0){
                    i.type='添加'
                }else if(i.type==1){
                    i.type='修改'
                }else if(i.type==2){
                    i.type='删除'
                }
                //操作对象
                if(i.op_obj==0){
                    i.op_obj='池塘信息'
                }else if(i.op_obj==1){
                    i.op_obj='拥有者信息'
                }else if(i.op_obj==2){
                    i.op_obj='水产品信息'
                }

                if(i.checkStatus==0){
                    i.checkStatus='未审核'
                }else if(i.checkStatus==1){
                    i.checkStatus='已通过'
                }else if(i.checkStatus==2){
                    i.checkStatus='未通过'
                }

                state.userData.forEach((ui,uv)=>{
                    if(ui.id==i.uid){
                        i.uid=ui.name
                    }
                })
            })
            state.tableData=data
        },
        setCurrentPage(state,data){
            state.currentPage=data
        },
        setPageSize(state,data){
            state.pageSize=data
        },

        setUserData(state,data){
            state.userData=data
        },
        setProductData(state,data){
            state.productData=data
        },
        setOwnerData(state,data){
            state.ownerData=data
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
        setCheckingData(state,data){

            //对data做处理
            let obj={
                //改id用于修改dialog表的checkStatus
                id:data.id,
                //用于表示应该区哪个表，修改checkStatus
                op_obj:data.op_obj,
                //用于表示应该被修改的那个表的id
                op_obj_id:''
            }
            if(obj.op_obj=='池塘信息'){
                obj.op_obj=0
            }else if(obj.op_obj=='拥有者信息'){
                obj.op_obj=1
            }else if(obj.op_obj=='水产品信息'){
                obj.op_obj=2
            }
            let op_obj_id=''
            if(data.new_obj){
                op_obj_id=JSON.parse(decodeURIComponent(data.new_obj)).id
            }
            if(data.old_obj){
                op_obj_id=JSON.parse(decodeURIComponent(data.old_obj)).id
            }
            obj.op_obj_id=op_obj_id
            state.checkingData=obj
        }
        
    }

}