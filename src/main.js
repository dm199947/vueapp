import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'

Vue.use(Vant);
Vue.use(Lazyload);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
