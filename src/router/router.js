import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'
import Users from '../components/users/Users.vue'
import Roles from '../components/roles/Roles.vue'
import Rights from '../components/rights/Rights.vue'
import Categories from '../components/categories/Categories.vue'
import Goods from '../components/goods/Goods.vue'
import GoodsAdd from '../components/goods-add/goodsAdd.vue'

Vue.use(VueRouter)
//实例化路由
const router = new VueRouter({
  //创建两个组件的路由
  routes: [
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        // 路有参数，可有可无
        { path: '/users/:page?', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Categories },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    },
    { path: '/', redirect: '/login' }
  ]
})

//回调函数里面的参数
router.beforeEach((to, from, next) => {
  console.log(to.path)
  if (to.path !== '/login') {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
