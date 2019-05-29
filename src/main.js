import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/reset.css'
import "@/assets/styles/iconfont/iconfont.css"

import {mySelect,mySelectAll,mySubmit} from './system/http'
import {formatDateTime} from './system/utils'



Vue.prototype.mySubmit = mySubmit;
Vue.prototype.mySelect = mySelect;
Vue.prototype.mySelectAll = mySelectAll;
Vue.prototype.formatDateTime = formatDateTime;

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
