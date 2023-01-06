// components/maskCamera/maskCamera.ts
const device = wx.getSystemInfoSync()
const FormData = require('../../utils/formData.js')

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        ctx: null,
        isShowCamera: false,
        src: '',
        plateNumber: '',
        plateLines: [],
    },
    lifetimes: {
        attached: function() { 
            this.authCamera();
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        error: function(e:any) {
            console.log(e, '|---error---')
        },
        authCamera: function() {
            var that = this
            wx.authorize({
                scope: 'scope.camera',
                success: function () {
                that.setData({
                    isShowCamera: true,
                })
                },
                fail: function (res) {
                console.log("" + res);
                wx.showModal({
                    title: '请求授权您的摄像头',
                    content: '如需正常使用此小程序功能，请您按确定并在设置页面授权用户信息',
                    confirmText: '确定',
                    success: res => {
                    if (res.confirm) {
                        wx.openSetting({
                        success: function (res) {
                            console.log('成功');
                            console.log(res);
                            if (res.authSetting['scope.camera']) { //设置允许获取摄像头
                            console.log('设置允许获取摄像头')
                            wx.showToast({
                                title: '授权成功',
                                icon: 'success',
                                duration: 1000
                            })
                            that.setData({
                                isShowCamera: true,
                            })

                            } else { //不允许
                            wx.showToast({
                                title: '授权失败',
                                icon: 'none',
                                duration: 1000
                            })
                            wx.navigateBack({delta: 1})
                            }
                        }
                        })
                    } else { //取消
                        wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                        })
                        wx.navigateBack({delta: 1})

                    }
                    }
                })
                }
            });
        },
        takePhotoAction: function () {
            
            const ctx = wx.createCameraContext()
            ctx.takePhoto({
              quality: 'low',
              success: (res) => {
                this.setData({
                    isShowCamera: false,
                    src: res.tempImagePath
                })
              },
              fail: (e) => {
                  console.log(e, '|----')
              }
            })
        },
        submitHandle: function() {    
            let formData = new FormData();
            formData.appendFile("file", this.data.src);
            formData.append("language", 'chs');
            formData.append("FileType", '.Auto');
            formData.append("IsCreateSearchablePDF", false);
            formData.append("isSearchablePdfHideTextLayer", true);
            formData.append("detectOrientation", false);
            formData.append("scale", true);
            formData.append("OCREngine", 5);
            formData.append("detectCheckbox", false);
            formData.append("checkboxTemplate", 0);

            let data = formData.getData();
            console.log(formData);
            console.log(data);
            console.log(data.buffer);
            wx.showLoading({title: ''});
            wx.request({
                method: 'POST',
              url: 'https://api8.ocr.space/parse/image',
              header: {
                'content-type': data.contentType,
                "apikey": "donotstealthiskey8589"
              },
              data: data.buffer,
              success: (res)=> {
                  console.log(res, '|---res---')
                  if (res.data) {
                      this.filterResult(res.data);
                  }
              },
              fail: (error) => {
                  wx.showToast({
                      icon: "none",
                      title: error.errMsg,
                  });
              },
              complete: () =>{
                  wx.hideLoading();
              }
            });
        },
        filterResult: function (data: any) {
            if (data.ParsedResults) {
                let _info = [] as any;
                data.ParsedResults[0].TextOverlay.Lines.map((item: any) => {
                    _info.push(item.LineText);
                });
                this.setData({
                    plateNumber: data.ParsedResults[0].ParsedText,
                    plateLines: _info,
                });
            }
        },
        repeatTake: function() {
            this.setData({
                src: '',
                isShowCamera: true,
            });
        },
      
    },
})
