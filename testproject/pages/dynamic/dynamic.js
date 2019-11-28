// pages/dynamic/dynamic.js
const app_data = getApp().globalData

Page({

    /**
     * 页面的初始数据
     */
    data: {
        InputValue: '',
        text_len: 0,
        full: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    bindKeyInput: function (e) {
        this.setData({
            InputValue: e.detail.value,
            text_len: e.detail.value.length,
            full: false
        })
        if (e.detail.value.length >= 400) {
            this.setData(
                {
                    full: true
                })
        }
    },
    cancel: function () {
        wx.navigateBack()
    },
    add: function () {
        let that = this
        wx.request({
            url: app_data.url + '/api/add_dynamic/',
            data: {
                user_id: app_data.userInfo['openid'],
                text: that.data.InputValue
            },
            method: 'POST',
            success: res => {
                if (res.data['status']) {
                    that.clear()
                }
            },
            fail: res => {
                wx.showToast({
                    title: '添加失败，稍后重试',
                    mask: true
                })
            }
        })
    },
    clear: function () {
      this.setData({
        InputValue: '',
        full: false,
        text_len: 0
      })
    }
})
