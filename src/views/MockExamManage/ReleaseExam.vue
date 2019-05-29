<template>
   <div class="release-exam">
      <el-form label-position="left" size="small" :inline="true">

         <el-form-item label="选择类型：">
            <el-select v-model="form.tab" placeholder="校考">
               <el-option label="联考" value="1"></el-option>
               <el-option label="校考" value="2"></el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="选择地区：" v-if="form.tab==='1'">
            <!--   <el-select v-model="form.region" placeholder="重庆">
                  <el-option label="重庆" value="重庆"></el-option>
                  <el-option label="四川" value="四川"></el-option>
               </el-select>-->

            <el-select v-model="form.region"
                       multiple
                       filterable
                       remote
                       reserve-keyword
                       placeholder="请输入城市关键词"
                       :remote-method="handleSelectCities"
                       :loading="citySelect.loading">
               <el-option v-for="item in citySelect.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
               </el-option>

            </el-select>


         </el-form-item>
         <el-form-item label="选择学校：">
            <el-select v-model="form.school" placeholder="">
               <el-option label="四川美术学院" value="四川美术学院"></el-option>
               <el-option label="重庆大学" value="重庆大学"></el-option>
            </el-select>
         </el-form-item>
         <br>
         <el-form-item label="考试标题：">
            <el-input v-model="form.title"></el-input>
         </el-form-item>

         <br>
         <div class="exam-content">
            <el-form-item label="考试内容：">
               <br>
               <el-form-item>
                  <el-form-item label="色彩内容：">
                     <el-input v-model="form.color_content"></el-input>
                  </el-form-item>
                  <br>

                  <el-form-item label="色彩图片：">
                     <el-upload class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleColorImgSuccess"
                                :before-upload="beforeAvatarUpload">
                        <img v-if="form.color_img" :src="form.color_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>

                  </el-form-item>
                  <br>

                  <el-form-item label="色彩价格：">
                     <el-input v-model="form.color_price"></el-input>
                  </el-form-item>
                  <br>

               </el-form-item>


               <el-form-item>
                  <el-form-item label="素描内容：">
                     <el-input v-model="form.sketch_content"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="素描图片：">
                     <el-upload class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleSketchImgSuccess"
                                :before-upload="beforeAvatarUpload">
                        <img v-if="form.sketch_img" :src="form.sketch_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>
                  </el-form-item>
                  <br>
                  <el-form-item label="素描价格：">
                     <el-input v-model="form.sketch_price"></el-input>
                  </el-form-item>
                  <br>

               </el-form-item>

               <el-form-item>
                  <el-form-item label="速写内容：">
                     <el-input v-model="form.draw_content"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="速写图片：">
                     <el-upload class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleQuickSketchImgSuccess"
                                :before-upload="beforeAvatarUpload">
                        <img v-if="form.draw_img" :src="form.draw_img" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>
                  </el-form-item>
                  <br>
                  <el-form-item label="速写价格：">
                     <el-input v-model="form.draw_price"></el-input>
                  </el-form-item>
                  <br>

               </el-form-item>

            </el-form-item>
         </div>

         <el-form-item label="考试说明：">
            <el-input class="text-area"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入考试说明"
                      v-model="form.intro"></el-input>
         </el-form-item>
         <br>
         <el-form-item label="阅卷说明：">
            <el-input class="text-area" type="textarea"
                      :rows="2"
                      placeholder="请输入阅卷说明"
                      v-model="form.review"></el-input>
         </el-form-item>
         <br>
         <el-form-item label="提交时间">
            <el-date-picker
                    v-model="form.exam_time"
                    type="datetime"
                    placeholder="选择日期时间">
            </el-date-picker>
         </el-form-item>
         <br>
         <el-button size="small">取 消</el-button>
         <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
      </el-form>

   </div>
</template>

<script>
    export default {
        name: "ReleaseExam",
        data() {
            return {
                form: {
                    tab: '',
                    region: '',
                    title: '',
                    school: '',
                    color_content: '',
                    color_img: '',
                    color_price: '',
                    sketch_content: '',
                    sketch_img: '',
                    sketch_price: '',
                    draw_content: '',
                    draw_img: '',
                    draw_price: '',
                    intro: '',
                    review: '',
                    exam_time: ''
                },
                citySelect: {
                    loading: false,
                    options: []
                }
            }
        },
        methods: {
            handleColorImgSuccess(res, file) {
                this.form.color_img = URL.createObjectURL(file.raw);
            },
            handleSketchImgSuccess(res, file) {
                this.form.sketch_img = URL.createObjectURL(file.raw);
            },
            handleQuickSketchImgSuccess(res, file) {
                this.form.draw_img = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 10MB!');
                }
                return isJPG && isLt2M;
            },
            handleSubmit() {
                this.form.exam_time = this.formatDateTime(this.form.exam_time)

                this.mySubmit('addExam', this.form).then(state => {
                    if (state === 200) {
                        this.$router.push({name: 'ExamManage'})
                    }

                })
            },
            handleSelectCities(query) {

                if (query !== '') {
                    this.citySelect.loading = true


                    this.mySelect('getCities', {name: query}, false).then(cities => {
                        this.citySelect.loading = false
                        this.citySelect.options = []
                        cities.forEach(city => {
                            this.citySelect.options.push({
                                value: city.Cname,
                                label: city.Cname
                            })
                        })
                    })
                }
            }
        }
        ,
    }
</script>
<style>
   .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
   }

   .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
   }

   .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
   }

   .avatar {
      width: 100px;
      height: 100px;
      display: block;
   }
</style>
<style scoped lang="scss">
   .el-form {
      .el-form-item {
         margin-right: 20px;

         .el-select, .el-input {
            width: 200px;
         }

         .text-area {
            width: 600px;
         }
      }

      .exam-content {
         .el-input {
            margin-right: -20px !important;
         }
      }

      .time-picker {
         margin-left: 15px;
      }

      .el-button {
         width: 200px;

      }
   }
</style>
