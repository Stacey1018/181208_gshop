/**
 * 入口js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
    // el: '#app',
    // render: h => (App)
    router,
    el: '#app',
    components: { App },
    template: '<App/>'
})