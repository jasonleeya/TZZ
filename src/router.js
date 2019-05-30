import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/login',
        name: 'Login',
        component: () => import( './views/Login'),
    }, {
        path: '/',
        component: () => import( './views/Index'),
        children: [
            {
                //因为某些设置首页路由只能为 "/"
                path: '',
                redirect: '/exam',
                component: () => import( './views/Home'),
                meta: {
                    cName: '首页'
                }
            }, {
                path: '/exam',
                name: 'ExamManage',
                component: () => import( './views/MockExamManage/ExamManage'),
                meta: {
                    cName: '考试管理'
                }
            }, {
                path: '/release',
                name: 'ReleaseExam',
                component: () => import( './views/MockExamManage/ReleaseExam'),
                meta: {
                    cName: '发布考试'
                }
            },  {
                path: '/joint',
                name: 'MarkingExamPaperJoint',
                component: () => import( './views/MockExamManage/MarkingExamPaper'),
                meta: {
                    cName: '联考阅卷'
                }
            }, {
                path: '/school',
                name: 'MarkingExamPaperSchool',
                component: () => import( './views/MockExamManage/MarkingExamPaper'),
                meta: {
                    cName: '校考阅卷'
                }
            }, {
                path: '/detail',
                name: 'RankDetail',
                component: () => import( './views/MockExamManage/RankDetail'),
                meta: {
                    cName: '排名详情'
                }
            },
            {
                path: '/rank',
                name: 'RankingSystem',
                component: () => import( './views/MockExamManage/RankingSystem'),
                meta: {
                    cName: '排名系统'
                }
            }, {
                path: '/community',
                name: 'CommunityManage',
                component: () => import( './views/CommunityManage/CommunityManage'),
                meta: {
                    cName: '社群管理'
                }
            }, {
                path: '/goods',
                name: 'GoodsManage',
                component: () => import( './views/MarketManage/GoodsManage'),
                meta: {
                    cName: '商品管理'
                }
            }, {
                path: '/order',
                name: 'OrderManage',
                component: () => import( './views/MarketManage/OrderManage'),
                meta: {
                    cName: '订单管理'
                }
            }, {
                path: '/evaluate',
                name: 'EvaluationManage',
                component: () => import( './views/MarketManage/EvaluationManage'),
                meta: {
                    cName: '评价管理'
                }
            }, {
                path: '/work',
                name: 'WorkManage',
                component: () => import( './views/WorkManage/WorkManage'),
                meta: {
                    cName: '作品管理'
                }
            }, {
                path: '/mockexam',
                name: 'MockExam',
                component: () => import( './views/FinanceManage/MockExam'),
                meta: {
                    cName: '模拟考'
                }
            }, {
                path: '/market',
                name: 'MarketFinance',
                component: () => import( './views/FinanceManage/MarketFinance'),
                meta: {
                    cName: '商城财务'
                }
            }, {
                path: '/banner',
                name: 'BannerManage',
                component: () => import( './views/BannerManage/BannerManage'),
                meta: {
                    cName: '轮播图管理'
                }
            },
            {
                path: '*',
                redirect: '/',
            },
        ]
    }
    ]
})
