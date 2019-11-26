// pages/province/province.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        province_name: '',
        poem_name: [],
        author: [],
        poem_content: [],
        translation: [],
        introduction: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.request({
            url: getApp().globalData.url + '/api/get_poem',
            data: {
                province: '陕西'
            },
            method: 'GET',
            header: {
                'content-type': 'application/json' //默认值
            },
            success: function (res) {
                const data = res.data;
                if(res.data.status) {
                    that.setData({
                        poem_name:data['poem_name'],
                        poem_content:data['poem_content']
                    });
                    // console.log(that.data.poem_name);
                } else {
                    console.log('sadad');
                }
            },
            fail: function (res) {
                console.log(res.state);
            }
        })
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

    }
})
