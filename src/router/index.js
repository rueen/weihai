import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import contrast from '@/views/contrast'
import analysis from '@/views/analysis'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/contrast',
      name: 'contrast',
      component: contrast
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: analysis
    }
  ]
})
