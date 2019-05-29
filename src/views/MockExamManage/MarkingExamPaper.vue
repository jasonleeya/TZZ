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

            <el-dropdown @command="chooseArea">
               <el-button plain size="small">
                  {{choosedArea}}<i class="el-icon-arrow-down el-icon--right"></i>
               </el-button>
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="重庆">重庆</el-dropdown-item>
                  <el-dropdown-item command="四川">四川</el-dropdown-item>
               </el-dropdown-menu>
            </el-dropdown>
         </div>

         <div class="header-right">
            <el-button @click="shareMark" type="primary" size="small">分享阅卷</el-button>
            <el-button @click="startMark" type="primary" size="small">开始阅卷</el-button>
         </div>

      </div>
   </div>
</template>

<script>
    export default {
        name: "MarkingExamPaper",
        data() {
            return {
                choosedArea: '重庆',
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
                }
            }
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

            }
        },
    }
</script>

<style scoped lang="scss">
   @import "../../assets/styles/common.scss";

   .header {
      position: relative;
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

      .header-right {
         position: absolute;
         right: 0;
         top: 0;
      }
   }


</style>
