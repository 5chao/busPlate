// index.ts
// 获取应用实例
import {generatorNums} from '../../lib/lottery';

const app = getApp<IAppOption>()

Page({
  data: {
    ssq: {},
    dlt: {},
    loading: false,
  },
  onLoad() {
    // 免责声明
    this.userPrivate();
    // 初始化数据
    //this.initData();

    this.getLastResult();
  },
  // 声明提示
  userPrivate() {
     wx.getStorage({
         key: 'agree',
         fail(e) {
             console.log(e, "|===e==")
             wx.showModal({
                title: '声明',
                content: '本小程序只供娱乐使用，内容以及模拟生成的数据仅供参考，请注意辨别。',
                showCancel: false,
                success() {
                    console.log(Date.now().toString())
                    wx.setStorage({key: "agree", data: Date.now().toString(),});
                }
            })
         }
     })
  },
  // 生成数据
  initData() {
      const ssq = generatorNums({
        frontSize: 6,
        endSize: 1,
        frontMax: 33,
        endMax: 16,
      });
      const daLeTou = generatorNums({
        frontSize: 5,
        endSize:2,
        frontMax: 35,
        endMax: 12,
        total: 5,
      });

      this.setData({
          ssqList: ssq,
          daLeTouList: daLeTou
      })
  },
  // 获取最新结果
  getLastResult() {
      // https://api.pearktrue.cn/api/lottery/?get=ssq&num=1
     let pGet = [];
     pGet.push(this.getPromiseData("https://api.pearktrue.cn/api/lottery/?get=ssq&num=1"));
     pGet.push(this.getPromiseData("https://api.pearktrue.cn/api/lottery/?get=dlt&num=1"));

     this.setData({
        loading: true,
     })

     Promise.all(pGet).then(res =>{
         let reslutMap = {drawnumber: "",trailnumber: ""};
         const ssq = res && res[0] ? res[0] as {drawnumber: "",trailnumber: ""} : reslutMap;
         const dlt = res && res[1] ? res[1] as {drawnumber: "",trailnumber: ""} : reslutMap;
        //console.log(ssq.drawnumber.split(" "), '|===blue--')
         this.setData({
             ssq: {...ssq, red: ssq.drawnumber.split(" ")},
             dlt: {...dlt, red: dlt.drawnumber.split(" "), blue: dlt.trailnumber.split(" ")}
         })
     }).finally(() => {
         this.setData({loading: false})
     });
  },
  // 数据请求
  getPromiseData(url: string) {
      return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            success: (res: any) =>{
                resolve(res.data.data[0] || null)
            },
            fail: () =>{
                reject(null)
            }
          })
      })
  }
})
