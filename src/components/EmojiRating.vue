<template>
   <div class="emoji-rating">
      <el-slider v-model="value"></el-slider>
   </div>
</template>

<script>
    export default {
        name: "EmojiRating",
        data() {
            return {
                value: 0,
                emoji: ["😡", "😠", "😦", "☹️", "🙁", "😐", "🙂", "😊", "😄", "😃", "😍"],
                scale: 0
            }
        },
        props: {
            refresh: Boolean,
            score:{
                type:[String,Number],
                default:60
            }
        },
        mounted() {
            this.value=parseInt(this.score);
            this.attachEmoji()
        },

        methods: {
            attachEmoji() {
                if (this.value === 100) {
                    this.scale = 10
                } else if (this.value >= 90 && this.value < 100) {
                    this.scale = 9
                } else if (this.value >= 80 && this.value < 90) {
                    this.scale = 8
                } else if (this.value >= 70 && this.value < 80) {
                    this.scale = 7
                } else if (this.value >= 60 && this.value < 70) {
                    this.scale = 6
                } else if (this.value >= 50 && this.value < 60) {
                    this.scale = 5
                } else if (this.value >= 40 && this.value < 50) {
                    this.scale = 4
                } else if (this.value >= 30 && this.value < 40) {
                    this.scale = 3
                } else if (this.value >= 20 && this.value < 30) {
                    this.scale = 2
                } else if (this.value >= 10 && this.value < 20) {
                    this.scale = 1;
                } else {
                    this.scale = 0
                }
                // document.querySelectorAll('.emoji-rating .el-slider__button').innerHTML = this.emoji[this.scale]
                document.querySelectorAll('.emoji-rating .el-slider__button').forEach((item) => {
                    item.innerHTML=this.emoji[this.scale]
                });
            }
        },
        watch: {
            value(n,o) {
                this.$emit('score',n);
               this.attachEmoji()
            },
            //进入页面重新刷新emoji
            refresh:{
                handler(newVal) {
                    if (this.refresh) {
                        this.attachEmoji()
                    }
                }, deep: true,
                immediate: true
            }

        }
    }
</script>
<style lang="scss">
   .emoji-rating {
   .el-slider__button {
      font-size: 25px;
      border: none;
      padding-bottom: 45px;
      background-color: transparent;
      width: 40px;
      height: 40px;
   }
   .el-slider__bar {
      background-color: transparent;
      background-image: linear-gradient(to right,#f00, #ffea00);
   }
   }

</style>
<style scoped>
   .el-slider {
      width: 300px;
   }

   span {
      float: right;
   }

</style>
