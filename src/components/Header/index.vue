<template>
   <div class="header">
      <div class="header-top">
         <el-tooltip :content="asideCollapse?'关闭':'展开'" :open-delay="800" :hide-after="0" placement="right" effect="light">
            <span @click="toggleSideNavCollapse" v-if="!asideCollapse" class="iconfont iconcaidanguan"></span>
            <span @click="toggleSideNavCollapse" v-else="asideCollapse" class="iconfont iconcaidankai"></span>
         </el-tooltip>


         <div class="header-top-options">
            <el-dropdown trigger="click" class="greeting">
               <el-button size="mini" plain>
                  你好，JasonLee<i class="el-icon-arrow-down el-icon--right"></i>
               </el-button>
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
               </el-dropdown-menu>
            </el-dropdown>
         </div>
      </div>


      <bookmark></bookmark>
   </div>
</template>

<script>
    import Bookmark from './Bookmark'

    export default {
        name: "index",
        components: {
            Bookmark
        },
        data() {
            return {
                asideCollapse: false,
            }
        },

        methods: {
            toggleSideNavCollapse() {
                this.$store.dispatch('toggleSideNavCollapse')
            },
            toggleTheme(theme) {
                document.body.setAttribute('theme', theme)
                localStorage.setItem('theme', theme);
            }
        },
        watch: {
            '$store.state.isSideNavCollapse'() {
                this.asideCollapse = this.$store.state.isSideNavCollapse
            }
        }
    }
</script>

<style scoped>
   .header {
      height: 100%;
   }


   .iconcaidanguan, .iconcaidankai {
      margin-left: 20px;
      font-size: 20px;
   }

   .header-top {
      height: 50px;
      line-height: 55px;
      position: relative;
      top: 0;
   }

   .header-top-options {
      position: absolute;
      right: 0;
      top: 0;

   }

   .el-dropdown {
      height: 35px;
   }

   .greeting {
      margin-right: 20px;
      float: right;
   }
   .greeting .el-button:hover {
      background-color:rgba(255,255,255,0.2) !important;
   }

   .theme {
      float: right;
      margin-right: 20px;
   }
</style>
