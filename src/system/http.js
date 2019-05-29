import axios from 'axios';
import urls from './url'
//查询
export function mySelect(url,data = {},shouldLoading=true){
  return new Promise((resolve,reject) => {
    let thi = this;
    // arguments[closeLoading] ? arguments[closeLoading] : true;
    if (shouldLoading) {
      // thi.$store.commit('fullScreenLoading',true);

    }
    console.log('查询接口：'+url);
    console.log(data);
    axios.post( '/api'+urls[url],data)
      .then(response => {
        console.log(response.data);
        let qcode = response.data.code;
        let qdata = response.data.data;
        if(qcode===200){
          resolve(qdata);
        }
        thi.$store.commit('fullScreenLoading',false)

      },err => {
        console.log(err);
        reject(err)
      })
  })
}

//查询（返回所有数据）
export function mySelectAll(url,data = {},shouldLoading=true){
  return new Promise((resolve,reject) => {
    let thi = this;
    // arguments[closeLoading] ? arguments[closeLoading] : true;
    if (shouldLoading) {
      // thi.$store.commit('fullScreenLoading',true);
    }


    console.log('查询All接口：'+url);
    console.log(data);
    axios.post( '/api'+urls[url],data)
      .then(response => {
        console.log(response.data);
        let qcode = response.data.code;
        let qmsg = response.data.msg;
        let qdata = response.data.data;
        let qtotal = response.data.Total;
        if(qcode===200){
          resolve(response.data);
        }else {
          thi.$message({
            message: qmsg,
            type: 'error',
            duration: 5000
          });
        }
        thi.$store.commit('fullScreenLoading',false)

      },err => {
        console.log(err);
        reject(err)
      })
  })
}

//提交
export function mySubmit(url,data={},shouldLoading=true) {
  return new Promise((resolve, reject) => {
    let thi = this;
    if (shouldLoading) {
      // thi.$store.commit('fullScreenLoading',true);
    }
    console.log('提交接口：'+url);
    console.log(data);
    axios.post('/api'+ urls[url],data
    ).then(function (response) {
      console.log(response.data);
      let qcode = response.data.code;
      let qmsg = response.data.msg;
      let qdata = response.data.data;
      if (qcode == 200) {
        thi.$message({
          type: 'success',
          message: qmsg
        });
      }
      else {
        console.log(console.log(response));
        thi.$message({
          type: 'warning',
          message: qmsg
        });
      }
      thi.$store.commit('fullScreenLoading',false);

      resolve(qcode);
    }).catch(function (error) {
      console.log(error)
    });
  })
}

