import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path:'/login',
      name:'Login',
      component: () => import( './views/Login'),
  },{
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: () => import( './views/Index'),
      children:[
          {
              //因为某些设置首页路由只能为 "/"
              path: '',
              component: () => import( './views/Home'),
              meta:{
                  cName:'首页'
              }
          }, {

              path: '/exam',
              component: () => import( './views/ExamManage'),
              meta:{
                  cName:'考试管理'
              }
          }, {
              path: '/score',
              component: () => import( './views/ScoreSystem'),
              meta:{
                  cName:'打分系统'
              }
          }, {
              path: '/community',
              component: () => import( './views/CommunityManage'),
              meta:{
                  cName:'社群管理'
              }
          }, {
              path: '/goods',
              component: () => import( './views/GoodsManage'),
              meta:{
                  cName:'商品管理'
              }
          },{
              path: '/order',
              component: () => import( './views/OrderManage'),
              meta:{
                  cName:'订单管理'
              }
          },{
              path: '/work',
              component: () => import( './views/WorkManage'),
              meta:{
                  cName:'作品管理'
              }
          },{
              path: '/mockexam',
              component: () => import( './views/MockExam'),
              meta:{
                  cName:'模拟考'
              }
          },{
              path: '/market',
              component: () => import( './views/MarketFinance'),
              meta:{
                  cName:'商城财务'
              }
          },{
              path: '/banner',
              component: () => import( './views/BannerManage'),
              meta:{
                  cName:'轮播图管理'
              }
          },
          {
              path:'*',
              redirect: '/',
          },
      ]
    }
  ]
})
