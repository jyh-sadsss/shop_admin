// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router/router'

//在js文件里面引入组件库和样式，css文件可以直接在js文件中引入
import Element from 'element-ui'
import ElTreeGrid from 'element-tree-grid'

import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

//将axios添加到原型上就不需要再在各个页面引入axios了

// ElTreeGrid是个对象，将ElTreeGrid.name作为它的组件名暴露出来
Vue.component(ElTreeGrid.name, ElTreeGrid)
console.log(ElTreeGrid)
Vue.prototype.$axios = axios

Vue.use(Element)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
