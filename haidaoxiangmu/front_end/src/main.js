import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api/index'
import qs from 'qs'
//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
