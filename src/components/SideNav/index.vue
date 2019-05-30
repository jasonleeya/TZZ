<template>
   <div class="side-nav">
      <div class="logo">
         <div class="logo-text" v-if="!asideCollapse">天之哲</div>
      </div>
      <el-menu class="side-nav-menu"
               :collapse="asideCollapse"
               :unique-opened="true"
               :router="true"
               ref="menu">
         <template v-for="menu in list">
            <menu-item v-if="menu.children === undefined" :menu="menu" :key="menu.id"/>
            <menu-sub :asideCollapse="asideCollapse" v-else :menu="menu" :key="menu.id"/>
         </template>
      </el-menu>
   </div>

</template>

<script>
    import MenuItem from './MenuItem'
    import MenuSub from './MenuSub'

    export default {
        name: "index",
        components: {
            MenuItem,
            MenuSub
        },
        data() {
            return {
                asideCollapse: false,
                list: [
                    {
                        title: '模拟考管理',
                        id: 'f1',
                        icon: 'iconkaoshiguanli',
                        children: [
                            {
                                title: '考试管理',
                                id: 's1',
                                path: '/exam'
                            }, {
                                title: '阅卷系统',
                                id: 's2',
                                children: [
                                    {
                                        title: '联考阅卷',
                                        id: 't1',
                                        path: '/joint'
                                    }, {
                                        title: '校考阅卷',
                                        id: 't2',
                                        path: '/school'
                                    },
                                ]
                            },
                            {
                                title:"排名系统",
                                id:'s9',
                                path:'/rank'
                            }
                        ]
                    },
                    {
                        title: '社群管理',
                        id: 'f2',
                        icon: 'iconshequ',
                        path: '/community'
                    },
                    {
                        title: '商品管理',
                        id: 'f3',
                        icon: 'iconshangpinguanli',
                        children: [
                            {
                                title: '商品管理',
                                id: 's3',
                                path: '/goods'
                            }, {
                                title: '订单管理',
                                id: 's4',
                                path: '/order'
                            }, {
                                title: '评价管理',
                                id: 's5',
                                path: '/evaluate'
                            }
                        ]
                    },
                    {
                        title: '作品管理',
                        id: 'f4',
                        icon: 'iconzuopin',
                        path: '/work'
                    },
                    {
                        title: '财务管理',
                        id: 'f5',
                        icon: 'iconcaiwuguanli',
                        children: [
                            {
                                title: '模拟考',
                                id: 's6',
                                path: '/mockexam'
                            }, {
                                title: '商城财务',
                                id: 's7',
                                path: '/market'
                            }
                        ]
                    },
                    {
                        title: '轮播图管理',
                        id: 'f6',
                        icon: 'iconlunbotuzujian',
                        path: '/banner'
                    },
                ]
            }
        },
        watch: {
            '$store.state.isSideNavCollapse'() {
                this.asideCollapse = this.$store.state.isSideNavCollapse;

                let elments = document.querySelectorAll('.aside .el-submenu__title  span, .aside .el-menu-item  span,.el-icon-arrow-down:before');
                if (this.asideCollapse) {
                    elments.forEach(function (el) {
                        el.style.opacity = '0'
                    });
                } else {
                    elments.forEach(function (el) {
                        el.style.opacity = '1'
                    });
                }
            }
        }
    }
</script>
<style>
</style>
<style scoped>
   .side-nav {
      height: 100%;
   }

   .el-menu {
      border-right: 0 solid transparent;
   }

   .logo {
      /*height: 47px;*/
      text-align: center;
      width: 100%;
      padding-top: 10px;
   }

   .logo-img {
      width: 30px;
   }

   .logo-text {
      font-size: 24px;
      height: 47px;
      line-height: 47px;
   }

</style>
