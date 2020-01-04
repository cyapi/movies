// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import App from './App'
import 'mint-ui/lib/style.css'
import router from './router'
Vue.use(MintUI)

import axios from "axios"
axios.defaults.baseURL="http://127.0.0.1:3002"
Vue.prototype.$http=axios
Vue.prototype.pic="http://127.0.0.1:3002/"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
