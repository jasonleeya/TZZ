<template>
   <div class="exam-manage">
      <div class="header">
         <div class="header-left">
            <el-dropdown @command="chooseType">
               <el-button plain size="small">{{choosedType===1?'联考':choosedType===2?'校考':'全部'}}<i class="el-icon-arrow-down el-icon--right"></i>
               </el-button>
               <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="">全部</el-dropdown-item>
                  <el-dropdown-item command="1">联考</el-dropdown-item>
                  <el-dropdown-item command="2">校考</el-dropdown-item>
               </el-dropdown-menu>
            </el-dropdown>

                     <!--城市选择-->
            <el-select size="small"
                       v-model="citySelect.selected"
                       filterable
                       remote
                       reserve-keyword
                       @change="handleSearchByCity"
                       placeholder="请输入城市关键词"
                       :remote-method="handleSelectCities"
                       :loading="citySelect.loading">
               <el-option v-for="item in citySelect.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
               </el-option>
            </el-select>

         </div>

         <div class="header-right">
            <el-button @click="releaseExam" type="primary" size="small">发布考试</el-button>
         </div>
      </div>

      <el-table :data="tableData"
                :header-cell-style="{background:'#F2F9FF'}"
                :cell-style="{background:'#fff'}"
                size="mini"
                border
                style="width: 100%">
         <el-table-column
                 align="center"
                 v-for="item in tableHead"
                 :prop="item.prop"
                 :label="item.lable"
                 :width="item.width">
         </el-table-column>
         <el-table-column
                 align="center"
                 fixed="right"
                 label="操作"
                 width="100">
            <template slot-scope="scope">
               <el-button @click="seeDetail(scope.row)" type="text" size="small">查看详情</el-button>
            </template>
         </el-table-column>
      </el-table>

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
    export default {
        name: "ExamManage",
        data() {
            return {
                choosedType: '',
                choosedArea: '重庆',
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },

                tableHead: [{
                    prop: 'id',
                    lable: '编号'
                }, {
                    prop: 'tab',
                    lable: '类型'
                }, {
                    prop: 'region',
                    lable: '地区'
                }, {
                    prop: 'title',
                    lable: '考试标题',
                    width: '120'
                }, {
                    prop: 'projects',
                    lable: '科目价格',
                    width: '280'
                }, {
                    prop: 'exam_time',
                    lable: '提交时间'
                }],
                tableData: [],
                citySelect: {
                    loading: false,
                    options: [],
                    selected: ''
                }
            }
        },
        mounted() {
            this.getData()
        },
        filters: {},
        methods: {
            chooseType(type) {
                this.getData(type);

                this.choosedType = type;
            },

            chooseArea(area) {
                this.choosedArea = area
            },

            releaseExam() {
                this.$router.push({name: 'ReleaseExam'})
            },

            getData(type) {
                this.mySelectAll('listExam', {
                    tab: type,
                    page: this.page.currentPage,
                    page_size: this.page.pageSize
                }).then((res) => {
                    /*转换数据*/
                    res.data.forEach(item => {
                        item.projects = '';
                        item.tab === 1 ? item.tab = "联考" : item.tab = "校考";
                        item.subjects.forEach(sub => {
                            item.projects += sub.name + ':' + sub.price + '元; \xa0';
                        })
                    });
                    this.tableData = res.data;
                    this.page.total = res.Total
                })

            },
            seeDetail(row) {
                alert(row.id)
            },

            handlePageSizeChange(val) {
                this.page.pageSize = val;
                this.page.currentPage = 1;
                this.getData()
            },

            handleCurrentPageChange(val) {
                this.page.currentPage = val;
                this.getData()
            },
            handleSelectCities(query) {

                if (query !== '') {
                    this.citySelect.loading = true;
                    this.mySelect('getCities', {name: query}, false).then(cities => {
                        this.citySelect.loading = false;
                        this.citySelect.options = [];
                        cities.forEach(city => {
                            this.citySelect.options.push({
                                value: city.Cname,
                                label: city.Cname
                            })
                        })
                    })
                }
            },
            handleSearchByCity(city) {
                console.log(city)
            }

        },
    }
</script>

<style scoped lang="scss">
   .header {
      position: relative;
      margin-bottom: 20px;

      .el-button {
         margin-right: 10px;
      }

      .header-right {
         position: absolute;
         top: 0;
         right: 0;
      }
   }

   .el-pagination {
      margin-top: 20px;
      /*float: right;*/
   }

</style>
