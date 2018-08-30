// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.filter('NumFormat', function(value) {
    if(value >= 100000000){
        return (value / 100000000).toFixed(2) + '万'
    } else if(value >= 10000){
        return (value / 10000).toFixed(2) + '万'
    } else {
        return value
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
