<template>
   <div class="marking-exam-paper">
      <div class="header">
         <div class="header-left">
            <ul class="choose-type">
               <li :class="{'active':examType.active===item.id}"
                   v-for="item in examType.list"
                   @click="chooseType(item.id)">{{item.name}}
               </li>
            </ul>

            <el-select size="small"
                       v-model="searchExamPaper.selected"
                       filterable
                       remote
                       reserve-keyword
                       @change="handleChooseExamPaper"
                       placeholder="请输入试卷关键词"
                       :remote-method="handleSearchExamPaper"
                       :loading="searchExamPaper.loading">
               <el-option v-for="item in searchExamPaper.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
               </el-option>
            </el-select>

         </div>

         <div class="header-right">
            <el-button @click="shareMark" type="primary" size="small">分享阅卷</el-button>
            <el-button @click="startMark" type="primary" size="small">开始阅卷</el-button>
         </div>

      </div>

      <el-row :gutter="10">
         <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4"
                 v-for="item in studentWorkList" :key="item.id">
            <student-work-item :id="item.id"
                               :imgUrl="item.img"
                               :userId="item.user_id"
                               :subjectId="item.subject_id"
                               @clickItemInfo="handleGetClickItemInfo">
            </student-work-item>
         </el-col>

      </el-row>


      <el-dialog :visible.sync="showDialog"
                 title="为此作品评分"
                 top="10px">
         <img class="dialog-img"
              :src="showImgUrl" alt="">
         <el-button @click="showDialog=false">确定评分</el-button>
         <emoji-rating @score="handleScore" :refresh="showDialog"></emoji-rating>
         <span class="score">{{score+'分'}}</span>
         <el-input v-model="shortComment" class="textarea" type='textarea' :rows="2" placeholder="请输入短评">
         </el-input>
      </el-dialog>

      <div class="right-side">
         <div class="score-rank" v-for="item in scoreList" :key="item.limit">
            <span class="limit">{{item.limit}}</span>
            <div class="count">{{item.count}}人</div>
            <el-slider disabled v-model="item.percent"></el-slider>
            <span class="percent">{{item.percent}}%</span>
         </div>
      </div>
   </div>
</template>

<script>
    import StudentWorkItem from '@/components/StudentWorkItem'
    import EmojiRating from '@/components/EmojiRating'

    export default {
        name: "MarkingExamPaper",
        components: {
            StudentWorkItem,
            EmojiRating
        },
        data() {
            return {
                choosedArea: '重庆',
                searchExamPaper: {
                    loading: false,
                    options: [],
                    selected: ''
                },
                showDialog: false,
                showImgUrl: '',
                score: 60,
                shortComment: '',
                examType: {
                    active: 1,
                    list: [{
                        id: 1,
                        name: '色彩',
                    }, {
                        id: 2,
                        name: '素描',
                    }, {
                        id: 3,
                        name: '速写',
                    }]
                },
                studentWorkList: [
                    {
                        id: '1',
                        img: require('../../assets/img/pic1.jpg'),
                        subject_id: '11',
                        user_id: '111',
                    }, {
                        id: '2',
                        img: require('../../assets/img/pic2.jpg'),
                        subject_id: '11',
                        user_id: '222',
                    }, {
                        id: '3',
                        img: require('../../assets/img/pic3.jpg'),
                        subject_id: '11',
                        user_id: '333',
                    }, {
                        id: '4',
                        img: require('../../assets/img/pic1.jpg'),
                        subject_id: '11',
                        user_id: '444',
                    }, {
                        id: '5',
                        img: require('../../assets/img/pic2.jpg'),
                        subject_id: '11',
                        user_id: '555',
                    }, {
                        id: '6',
                        img: require('../../assets/img/pic3.jpg'),
                        subject_id: '11',
                        user_id: '666',
                    }, {
                        id: '7',
                        img: require('../../assets/img/u=2922170376,2371336021&fm=27&gp=0.jpg'),
                        subject_id: '11',
                        user_id: '666',
                    },
                ],
                scoreList: [{
                    limit: '95分以上',
                    count: 1254,
                    percent: 20
                }, {
                    limit: '90~95分',
                    count: 1254,
                    percent: 20
                }, {
                    limit: '85~89分',
                    count: 1254,
                    percent: 20
                }, {
                    limit: '80~84分',
                    count: 1254,
                    percent: 20
                }, {
                    limit: '75~79分',
                    count: 1254,
                    percent: 20
                }, {
                    limit: '70~74分',
                    count: 1254,
                    percent: 20
                }, {
                    limit: '65~69分',
                    count: 1254,
                    percent: 20
                }, {
                    limit: '60~64分',
                    count: 1254,
                    percent: 20
                }, {
                    limit: '60分以下',
                    count: 1254,
                    percent: 20
                }]
            }
        },
        mounted() {
            /* this.mySelect('getWorkByExamSubject', {exam_id: '1', name: '色彩'}).then(data => {
                 this.studentWorkList = data;
             })*/
        },
        methods: {
            chooseType(type) {
                this.examType.active = type
            },
            chooseArea(area) {
                this.choosedArea = area
            },
            shareMark() {
            },
            startMark() {
            },
            handleSearchExamPaper() {

            },

            handleChooseExamPaper() {

            },
            handleGetClickItemInfo(info) {
                console.log(info);
                this.showImgUrl = info.imgUrl;
                this.showDialog = true
            },

            handleScore(score) {
                this.score = score
            }
        },
        watch: {
            showDialog() {
                if (this.showDialog === false) {
                    this.score = 60;

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

      }

   }

   .right-side {
      .el-slider {
        .el-slider__button {
           display: none;
        }
         .el-slider__runway ,.el-slider__bar{
            height: 10px;
         }
         .el-slider__runway.disabled .el-slider__bar {
            background-color: #409EFF;
         }
         .el-slider__button-wrapper {
            display: none!important;
         }
      }
   }
</style>

<style scoped lang="scss">
   @import "../../assets/styles/common.scss";


   .marking-exam-paper {
      position: relative;
      min-height: 700px;

      .header {
         position: relative;
         margin-bottom: 20px;

         .choose-type {
            margin-right: 20px;
            display: inline-block;
            border-bottom: 1px solid $lightGray;

            li {
               margin-bottom: -1px;
               display: inline-block;
               font-size: 14px;
               padding: 8px 10px;
            }

            .active {
               border-bottom: 3px solid $blue;
               background-color: rgba($lightBlue, 0.8);
               color: $deepBlue;
               font-size: 10px;
            }
         }

         .header-left {
            .el-input {
               width: 200px;
            }
         }

         .header-right {
            position: absolute;
            right: 0;
            top: 0;

         }
      }

      .el-row {
         margin-right: 200px !important;
      }

      .right-side {
         position: absolute;
         width: 200px;
         height: 500px;
         right: 0;
         top: 75px;

         .score-rank {
            height: 70px;
            position: relative;

            .el-slider {
               position: absolute;
               width: 100px;
               left: 55px;
               top: 13px;
            }

            .count {
               font-size: 12px;
               position: absolute;
               left: 10px;
               bottom: 30px;
            }

            .limit {
               font-size: 12px;
               font-weight: bold;
               position: absolute;
               left: 10px;
               top: 10px;
            }

            .percent {
               font-size: 15px;
               position: absolute;
               right: 10px;
               bottom: 30px;
            }
         }

      }
   }

   .dialog-img {
      width: 700px;
      min-height: 400px;
   }


</style>
