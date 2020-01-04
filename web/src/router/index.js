import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import reg from '@/pages/reg'
import login from '@/pages/login'
import user from '@/pages/user'
import order from '@/pages/order'
import detail from '@/pages/detail'
import index from '@/pages/index'
import cinema from '@/pages/cinema'
import seat from '@/pages/seat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
    ,
    {
      path: '/cinema',
      name: 'cinema',
      component: cinema
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/seat',
      name: 'seat',
      component: seat
    }
  ]
})
