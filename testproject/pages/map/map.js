// miniprogram/map/map
const app = getApp()
const app_data = getApp().globalData

Page({

    /**
     * 页面的初始数据
     */
    data: {},

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

    pageNavi: function (e) {
        wx.navigateTo({
            url: '../province/province?name=' + e.currentTarget.id
        })
    },
    goMap: function () {
        if (!app_data.is_map) {
            app.goMap()
        }
    },
    goCommu: function () {
        if (!app_data.is_commu)
            app.goCommu()
    },
    goInfo: function () {
        if (!app_data.is_info) {
            app.goInfo()
        }
    }
})
