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
                               :subjectId="item.subject_id">
            </student-work-item>
         </el-col>

      </el-row>

      <el-pagination
              @size-change="handlePageSizeChange"
              @current-change="handleCurrentPageChange"
              :current-page="page.currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total">
      </el-pagination>



      <div class="right-side">


         <score-rank :scoreList="scoreList"></score-rank>
      </div>

   </div>
</template>

<script>
    import StudentWorkItem from '@/components/StudentWorkItem'
    import ScoreRank from '@/components/ScoreRank'

    export default {
        name: "MarkingExamPaper",
        components: {
            StudentWorkItem,
            ScoreRank
        },
        data() {
            return {
                choosedArea: '重庆',
                searchExamPaper: {
                    loading: false,
                    options: [],
                    selected: ''
                },
                page: {
                    currentPage: 1,
                    pageSize: 12,
                    total: 0
                },
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
                    }, {
                        id: '8',
                        img: require('../../assets/img/u=2922170376,2371336021&fm=27&gp=0.jpg'),
                        subject_id: '11',
                        user_id: '666',
                    }, {
                        id: '9',
                        img: require('../../assets/img/u=2922170376,2371336021&fm=27&gp=0.jpg'),
                        subject_id: '11',
                        user_id: '666',
                    }, {
                        id: '10',
                        img: require('../../assets/img/u=2922170376,2371336021&fm=27&gp=0.jpg'),
                        subject_id: '11',
                        user_id: '666',
                    }, {
                        id: '11',
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
            this.page.total = this.studentWorkList.length
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

            handlePageSizeChange(val) {
                this.page.pageSize = val;
                this.page.currentPage = 1;
                // this.getData()
            },

            handleCurrentPageChange(val) {
                this.page.currentPage = val;
                // this.getData()
            },


        },

    }
</script>


<style scoped lang="scss">
   @import "../../assets/styles/common.scss";


   .marking-exam-paper {
      position: relative;
      min-height: 740px;
      padding-bottom: 40px !important;

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


      }

      .el-pagination {
         margin-top: 20px;
         position: absolute;
         bottom: 10px;
         right: 220px;

      }
   }


</style>
