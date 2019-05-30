<template>
   <div class="student-work-item">
      <img :src="imgUrl" alt="" @click="isShowDialog=true">
      <div class="show-score" v-if="score !== ''">{{score}}分</div>
      <el-dialog :visible.sync="isShowDialog"
                 title="为此作品评分"
                 top="10px">
         <img class="dialog-img"
              :src="imgUrl" alt="">
         <el-button @click="handleSubmitMarking">确定评分</el-button>
         <emoji-rating @score="handleGetScore" :refresh="isShowDialog" :score="getScore"></emoji-rating>
         <span class="score">{{getScore+'分'}}</span>
         <el-input v-model="getShortComment" class="textarea" type='textarea' :rows="2" placeholder="请输入短评">
         </el-input>
      </el-dialog>

   </div>
</template>

<script>
    import EmojiRating from '@/components/EmojiRating'

    export default {
        name: "StudentWorkItem",
        components: {
            EmojiRating
        },
        props: {
            id: '',
            imgUrl: '',
            userId: '',
            subjectId: '',
            score: {
                type: String,
                default: ''
            },
            shortComment: {
                type: String,
                default: ''
            }

        },
        data() {
            return {
                isShowDialog: false,
                getScore: 60,
                getShortComment: ''
            }
        },
        mounted() {
            if (this.score !== '') {
                this.getScore = this.score;
                this.getShortComment = this.shortComment
            }
        },
        methods: {
            handleGetScore(score) {
                this.getScore = score
            },
            handleSubmitMarking() {
                this.isShowDialog = false;
                console.log({
                    userId: this.userId,
                    subjectId: this.subjectId,
                    score: this.getScore,
                    shortComment: this.getShortComment
                })
            }

        },

    }
</script>

<style lang="scss">
   .student-work-item {


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
   }
</style>

<style scoped lang="scss">
   @import "../assets/styles/common";

   .student-work-item {
      height: 200px;
      width: 100%;
      margin-bottom: 10px;
      position: relative;

      img {
         display: block;
         border-radius: 5px;
         width: 100%;
         height: 100%;
      }

      .show-score {
         position: absolute;
         bottom: 0;
         font-size: 16px;
         width: 100%;
         height: 20px;
         line-height: 20px;
         text-align: center;
         background-color: $lightGray;
      }
   }
</style>
