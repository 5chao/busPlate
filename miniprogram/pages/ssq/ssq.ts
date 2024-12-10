// pages/ssq/ssq.ts
import {generatorNums} from '../../lib/lottery';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ssqData:  [] as any,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.initData();
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
    // 生成数据
    initData() {
        this.setData({
            ssqData: generatorNums({
                frontSize: 6,
                endSize: 1,
                frontMax: 33,
                endMax: 16,
              })
        })
    },
    // 复制
    copyHandle() {
        const _copyData = [] as any;
        this.data.ssqData.forEach((item: any) => {
            let _ball = [...item.font, ...item.end];
            _copyData.push(_ball);
        });
        wx.setClipboardData({
            data: _copyData.join('\n'),
            success () {
               wx.showToast({
                   icon: 'none',
                   title: '复制成功'
               })
            },
             fail() {
                wx.showToast({
                    icon: 'none',
                    title: '复制失败'
                })
             }
        })
    }
})