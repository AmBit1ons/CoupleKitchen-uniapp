
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import api from './api'
import share from "@/common/share.js"

Vue.mixin(share)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$api = api

const app = new Vue({
    ...App,
	share
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif