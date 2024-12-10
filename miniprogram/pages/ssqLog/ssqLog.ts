// pages/ssqLog/ssqLog.ts
Page({

    /**
     * 页面的初始数据
     */
    data: {
        logList: [
            {
                "issue": "2024141",
                "opentime": "2024-12-08 星期日",
                "salemoney": "4.82亿",
                "drawnumber": "01 02 07 15 24 29",
                "trailnumber": "12"
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.loadData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    loadData() {
        wx.showNavigationBarLoading();
        wx.request({
            url: 'https://api.pearktrue.cn/api/lottery/?get=ssq&num=100',
            success: (res: any) =>{
                wx.hideNavigationBarLoading();
                this.setData({
                    logList: res.data.data || []
                })
            },
            fail: () =>{
                wx.hideNavigationBarLoading();
            }
        })
    }
})