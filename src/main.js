/**
 * 入口js
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'

import './mock/mockServer' // 加载mockServer

// 注册全局组件标签
// Vue.component(Button.name, Button)
Vue.component(Button.name, Button) // <mt-button></mt-button>

new Vue({
  // el: '#app',
  // render: h => (App)
  router, // 使用vue-router
  store, // 使用vuex
  el: '#app',
  components: { App },
  template: '<App/>'
})
