import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'

Vue.config.productionTip = false

import VueLazyLoad from 'vue-lazyload'
 Vue.use(VueLazyLoad,{
  loading: require('./imgs/default.jpg')
 })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
