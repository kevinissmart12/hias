import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../view/Index.vue'
import Login from '../view/Login.vue'
import Register from '../view/Register.vue'
import Products from '../view/Products.vue'
import Owner from '../view/Owner.vue'
import Account from '../view/Account.vue'
import Discussion from '../view/Discussion.vue'
import Ponds from '../view/Ponds.vue'
import Dialog from '../view/Dialog.vue'

import Statistic from '../view/Statistic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/owner',
    name: 'Owner',
    component: Owner,
    children:[
      {
        path:'all',
        component:resolve=>require(['../components/owner/AllOwner.vue'],resolve)
      },
      {
        path:'add',
        component:resolve=>require(['../components/owner/AddOwner.vue'],resolve)
      },

    ]
    
  },
  {
    path: '/ponds',
    name: 'Ponds',
    component: Ponds,
    children:[
      {
        path:'all',
        component:resolve=>require(['../components/ponds/AllPonds/AllPonds.vue'],resolve)
      },
      {
        path:'add',
        component:resolve=>require(['../components/ponds/AddPonds/AddPonds.vue'],resolve)
      }
    ]
    
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/discussion',
    name: 'Discussion',
    component: Discussion
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    children:[
      {
        path:'all',
        component:resolve=>require(['../components/products/AllProducts.vue'],resolve)
      },
      {
        path:'add',
        component:resolve=>require(['../components/products/AddProducts.vue'],resolve)
      }
    ]
  },
  {
    path: '/dialog',
    name: 'Dialog',
    component: Dialog
  },
  {
    path: '/statistic',
    name: 'Statistic',
    component: Statistic,
    children:[
      {
        path:'pondsType',
        component:resolve=>require(['../components/statistic/PondsType.vue'],resolve)
      },
      {
        path:'productsAO',
        component:resolve=>require(['../components/statistic/Products_Area_Output.vue'],resolve)
      },      
      {
        path:'townStatus',
        component:resolve=>require(['../components/statistic/TownStatus.vue'],resolve)
      },      
      {
        path:'randomOwner',
        component:resolve=>require(['../components/statistic/RandomOwner.vue'],resolve)
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
