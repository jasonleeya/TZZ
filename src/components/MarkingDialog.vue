<template>
   <el-dialog :visible.sync="isShowDialog"
              title="为此作品评分"
              top="10px">
      <img class="dialog-img"
           :src="showImgUrl" alt="">
      <el-button @click="isShowDialog=false">确定评分</el-button>
      <emoji-rating @score="handleScore" :refresh="isShowDialog"></emoji-rating>
      <span class="score">{{score+'分'}}</span>
      <el-input v-model="shortComment" class="textarea" type='textarea' :rows="2" placeholder="请输入短评">
      </el-input>
   </el-dialog>
</template>

<script>
    import EmojiRating from '@/components/EmojiRating'

    export default {
        name: "MarkingDialog",
        components: {
            EmojiRating
        },
        data() {
            return {
                score: {
                    type: Number,
                    default: 60
                },
                shortComment: '',
                isShowDialog:false
            }
        },
        props: {
            showDialog: {
                type: Boolean,
                default: false
            },
            showImgUrl: '',

        },
        mounted() {
            this.isShowDialog=this.showDialog
        },

        methods: {
            handleScore(score) {
                this.score = score
            },

        },
        watch:{
            showDialog:{
                handler() {
                    this.isShowDialog=this.showDialog
                },
                deep: true,
                immediate: true
            },
            isShowDialog() {
                if (this.isShowDialog === false) {
                    this.$emit('closeDialog');
                }

            }
        }
    }
</script>

<style lang="scss">
   .el-dialog {
      width: 1100px;

      .el-dialog__body {
         position: relative;

         .el-button {
            position: absolute;
            right: 150px;
            top: 300px;
         }

         .emoji-rating {
            position: absolute;
            right: 40px;
            top: 30px;
         }

         .score {
            position: absolute;
            right: 140px;
            top: 100px;
            font-size: 50px;
            color: red;
         }

         .textarea {
            position: absolute;
            right: 40px;
            width: 300px !important;
            top: 200px;

            .el-textarea__inner {
               width: 300px !important;
            }
         }
         .dialog-img {
            width: 700px;
            min-height: 400px;
         }


      }

   }
</style>
