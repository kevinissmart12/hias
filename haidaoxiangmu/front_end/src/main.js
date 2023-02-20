import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api/index'
import qs from 'qs'
//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@wangeditor/editor/dist/css/style.css'
//BaiduMap
import BaiduMap from 'vue-baidu-map'
Vue.use(ElementUI);
Vue.config.productionTip = false
//axios全局挂载
Vue.prototype.$axios=axios
//qs全局挂载
Vue.prototype.qs=qs
//turf
import * as turf from '@turf/turf'
Vue.prototype.turf=turf

Vue.use(BaiduMap, {
  ak: 'uP9c3GzUrEtytgWnH7WmM33TnRdYRKrE'
})
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

import {Editor,Toolbar} from '@wangeditor/editor-for-vue'
Vue.component('Editor', Editor)
Vue.component('Toolbar', Toolbar)




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
