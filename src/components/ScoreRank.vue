<template>
   <div>
      <div class="score-rank" v-for="item in scoreList" :key="item.limit">
         <span class="limit">{{item.limit}}</span>
         <div class="count">{{item.count}}人</div>
         <el-slider disabled v-model="item.percent"></el-slider>
         <span v-if="isShowEdit" class="iconfont edit iconbianji1"
               @click="handleEdit(item.limit,item.count,item.percent)"></span>
         <span class="percent">{{item.percent}}%</span>
      </div>
   </div>
</template>

<script>
    export default {
        name: "ScoreRank",
        props: {
            scoreList: {
                type: Array,
                default: [],
            },
            isShowEdit: {
                type: Boolean,
                default: true
            }
        }, methods: {
            handleEdit(limit, count, percent) {
                this.$router.push({
                    name: 'RankDetail', params: {
                        limit: limit,
                        count: count,
                        percent: percent
                    }
                })
            }
        },
    }
</script>
<style lang="scss">
   @import "../assets/styles/common";

   .score-rank {
      .el-slider {
         .el-slider__button {
            /*display: none;*/
         }

         .el-slider__runway, .el-slider__bar {
            height: 10px;
         }

         .el-slider__runway.disabled .el-slider__bar {
            background-color: $deepBlue;
         }

         .el-slider__button-wrapper {
            display: none !important;

         }
      }
   }
</style>
<style scoped lang="scss">
   @import "../assets/styles/common";

   .score-rank {
      width: 200px;
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
         color: $blue;
         font-size: 15px;
         position: absolute;
         right: 10px;
         bottom: 30px;
      }

      .edit {
         color: $blue;
         position: absolute;
         right: 10px;
         bottom: 50px;

         &:hover {
            color: $deepBlue;
         }

      }
   }
</style>
