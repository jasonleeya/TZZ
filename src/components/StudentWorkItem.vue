<template>
   <div class="student-work-item" @click="viewImage(imgUrl)">
      <img :src="imgUrl" alt="">
   </div>
</template>

<script>
    export default {
        name: "StudentWorkItem",
        methods: {
            viewImage(url) {
                this.$emit('clickItemInfo', {
                    imgUrl: this.imgUrl,
                    userId: this.userId,
                    subjectId: this.subjectId
                })
            }
        },
        props: {
            id: '',
            imgUrl: '',
            userId: '',
            subjectId: ''
        }
    }
</script>
<style lang="scss">
</style>
<style scoped lang="scss">
   .student-work-item {
      height: 200px;
      width: 100%;
      margin-bottom: 10px;

      img {
         display: block;
         border-radius: 5px;
         width: 100%;
         height: 100%;
      }
   }
</style>
