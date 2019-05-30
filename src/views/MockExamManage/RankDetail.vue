<template>
   <div class="rank-detail">
      <div class="header">{{limit}}</div>
      <div class="student-work">
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
      </div>
   </div>
</template>

<script>
    import StudentWorkItem from '@/components/StudentWorkItem';
    export default {
        name: "RankDetail",
        components: {
            StudentWorkItem
        },
        data() {
            return{
                limit: '',
                studentWorkList:[ {
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
                }]
            }
        },
        mounted() {
            if (this.$route.params.limit) {
                this.limit=this.$route.params.limit;
                sessionStorage.setItem('limit',this.limit);
            }
            else  {
                this.limit = sessionStorage.getItem('limit');
            }
        },
        methods: {
            handleGetClickItemInfo() {

            }
        },
    }
</script>

<style scoped>

</style>
