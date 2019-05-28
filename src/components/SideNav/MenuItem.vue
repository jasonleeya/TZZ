<template>
   <el-menu-item :index="menu.path">
      <i class="side-nav-ico" :class="'iconfont '+menu.icon"></i>
      <span slot="title" v-if="menu.path" >
         {{menu.title}}
      </span>
      <span slot="title" v-else="!menu.path" >
         {{menu.title}}
      </span>
   </el-menu-item>
</template>

<script>
    export default {
        name: "MenuItem",
        props:{
            menu: {}
        }
    }
</script>

<style scoped>
.iconfont {
   margin-right: 10px;
}
</style>
