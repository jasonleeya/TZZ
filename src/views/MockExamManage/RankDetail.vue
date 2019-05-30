<template>
   <div class="rank-detail">
      <score-rank :isShowEdit="false" :scoreList="scoreList"></score-rank>

      <div class="student-work">
         <el-row :gutter="10">
            <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="4"
                    v-for="item in studentWorkList" :key="item.id">
               <student-work-item :id="item.id"
                                  :imgUrl="item.img"
                                  :score="item.score"
                                  :userId="item.user_id"
                                  :subjectId="item.subject_id"
                                  :shortComment="item.shortComment">
               </student-work-item>
            </el-col>

         </el-row>
      </div>

      <el-pagination
              @size-change="handlePageSizeChange"
              @current-change="handleCurrentPageChange"
              :current-page="page.currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total">
      </el-pagination>

   </div>
</template>

<script>
    import StudentWorkItem from '@/components/StudentWorkItem';
    import ScoreRank from '@/components/ScoreRank';

    export default {
        name: "RankDetail",
        components: {
            StudentWorkItem,
            ScoreRank
        },
        data() {
            return {
                limit: '',
                scoreList: [],
                page: {
                    currentPage: 1,
                    pageSize: 12,
                    total: 0
                },
                studentWorkList: [{
                    id: '1',
                    img: require('../../assets/img/pic1.jpg'),
                    subject_id: '11',
                    user_id: '11111111',
                    score: '99',
                    shortComment: '111'
                }, {
                    id: '2',
                    img: require('../../assets/img/pic2.jpg'),
                    subject_id: '11',
                    user_id: '222',
                    score: '98',
                    shortComment: '2222222'
                }, {
                    id: '3',
                    img: require('../../assets/img/pic3.jpg'),
                    subject_id: '11',
                    user_id: '333',
                    score: '97',
                    shortComment: '3333333'
                }, {
                    id: '4',
                    img: require('../../assets/img/pic3.jpg'),
                    subject_id: '11',
                    user_id: '333',
                    score: '97',
                    shortComment: '3333333'
                }, {
                    id: '5',
                    img: require('../../assets/img/pic3.jpg'),
                    subject_id: '11',
                    user_id: '333',
                    score: '97',
                    shortComment: '3333333'
                }, {
                    id: '6',
                    img: require('../../assets/img/pic3.jpg'),
                    subject_id: '11',
                    user_id: '333',
                    score: '97',
                    shortComment: '3333333'
                }]
            }
        },
        mounted() {
            if (this.$route.params.limit) {
                let param = {
                    limit: this.$route.params.limit,
                    percent: this.$route.params.percent,
                    count: this.$route.params.count
                };
                this.scoreList = [];
                this.scoreList.push(param);
                sessionStorage.setItem('limit', JSON.stringify(param));

            } else {
                this.scoreList = [];
                this.scoreList.push({
                    limit: JSON.parse(sessionStorage.getItem('limit')).limit,
                    percent:JSON.parse(sessionStorage.getItem('limit')).percent,
                    count: JSON.parse(sessionStorage.getItem('limit')).count
                })
            }
        },
        methods: {

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

<style scoped>

</style>
