export default {
    namespaced:true,
    state:{

        //searchowner是否展示值
        showListOwner:false,


        //showListProduct
        showListProduct:false,
    },
    mutations:{
        setShowListOwner(state,data){
            state.showListOwner=data
        },
        setShowListProduct(state,data){
            state.showListProduct=data
        },
    }

}