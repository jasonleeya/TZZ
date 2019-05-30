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
      <el-dialog title="分享试卷" class="shear-dialog" :visible.sync="isShowShearDialog">
         <el-input v-model="shareLinkDeepCopy"></el-input>
         <el-button ref="copy" type="primary" @click="handleCopyLink">复制链接</el-button>
         <el-radio-group v-model="sharingMethod">
            <el-radio :label="1">私有</el-radio>
            <el-radio :label="2">密码访问</el-radio>
         </el-radio-group>
         <div class="description">
            <span>仅知道链接的人可以访问</span>
            <span>仅知道密码的人可以访问</span>
         </div>
      </el-dialog>


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
                isShowShearDialog: false,
                shareLink: 'https://www.baidu.com/public',
                //深度拷贝
                shareLinkDeepCopy: '',
                sharingMethod: 1,
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
            this.shareLinkDeepCopy=JSON.parse(JSON.stringify(this.shareLink))
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
                this.isShowShearDialog = true
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
            handleCopyLink() {
                //复制链接到粘贴板
                document.querySelector(".shear-dialog .el-input__inner").select()
                document.execCommand("Copy");
                const h = this.$createElement;
                this.$message({
                    type: 'success',
                    message: h('p', null, [
                        h('i', { style: 'color: blue;font-size:16px;' }, this.shareLink),
                        h('span', { style: 'font-size:16px;' }, '已经复制到粘贴板，赶紧去分享吧 '),
                    ])
                });
            }


        },
        watch:{
            shareLinkDeepCopy(n) {
                this.shareLinkDeepCopy=JSON.parse(JSON.stringify(this.shareLink))
            },

            sharingMethod(n) {
                if (n === 1) {
                    this.shareLink = 'https://www.baidu.com/public';
                    this.shareLinkDeepCopy=JSON.parse(JSON.stringify(this.shareLink))
                } else {
                    this.shareLink = 'https://www.baidu.com/private';
                    this.shareLinkDeepCopy=JSON.parse(JSON.stringify(this.shareLink))
                }
            }
        }

    }
</script>

<style lang="scss">
   .marking-exam-paper {
      .shear-dialog {
         .el-dialog {
            width: 550px;
            border-radius: 10px;

            .el-dialog__header {
               border-bottom: 1px solid #cacaca;
               margin: 0 20px;
            }

            .el-input {
               width: 75%;
            }

            .el-button {
               width: 22%;
               margin-left: 3%;
            }

            .el-radio-group {
               margin-top: 20px;

               .el-radio:nth-child(2) {
                  margin-left: 200px;
               }
            }

            .description span {
               display: inline-block;
               font-size: 12px;
               &:first-child {
                  margin-left: 23px;
               }
               &:last-child{
                  margin-left: 150px;
               }
            }
         }
      }
   }
</style>
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
         /*right: 220px;*/

      }
   }


</style>
