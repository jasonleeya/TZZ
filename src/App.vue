<template>
   <div id="app" v-loading.fullscreen.lock="Loading">
      <router-view/>
   </div>
</template>
<script>
    export default {
        name: 'App',
        computed: {
            Loading() {
                return this.$store.state.loading
            },
        },
    }
</script>
<style lang="scss">
   @import "assets/styles/theme/index.scss";
   @import "assets/styles/common.scss";
   html,body,#app {
      width: 100%;
      height: 100%;
   }
   #app{
      min-width: 1200px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
   }

</style>
