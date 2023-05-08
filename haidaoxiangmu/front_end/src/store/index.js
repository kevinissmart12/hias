import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import allProducts from './allProducts/index.js'
import allOwner from './AllOwner/index'
import discussion from './Discussion/index'
import ponds from './Ponds/index'

import search from './Search/index'
import dialog from './Dialog/index'
import statistic from './Statistic/index'




export default new Vuex.Store({
  state:{
    //全局信息
    userinfo:{}
  },
  mutations:{
    setUserinfo(state,data){
      state.userinfo=data
    }
  },
  modules: {
    allProducts,
    allOwner,
    discussion,
    ponds,
    search,
    dialog,
    statistic
  }
})
