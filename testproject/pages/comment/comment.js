// pages/comment/comment.js
const app = getApp()
const app_data = getApp().globalData
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        focus: true,
        reply: null,
        inputValue: null,
        comment_list: [
            {
                user: '枫梓。',
                text: '哈哈哈哈今天去哪里哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊啊',
                time: '2019-11-28 21:45',
                avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                reply: null
            },
            {
                user: '枫梓。',
                text: '哈哈哈哈今天去哪里哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊啊',
                time: '2019-11-28 21:45',
                avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                reply: '枫梓。枫梓。枫梓。。'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     * undefined bug
     * 修改输入框显示方式
     */
    onLoad: function (options) {
        const id = options.id
        this.setData({
            id: id
        })
        this.getData()
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
        this.getData()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    keyBoard: function (e) {
        let flag = this.data.focus
        this.setData({
            focus: !flag,
            reply: e.currentTarget.dataset.reply
        })
    },
    bindKeyInput: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    submitTo: function () {
        let that = this
        wx.request({
            url: app_data.url + '/api/add_comment',
            data: {
                id: that.data.id,
                user: app_data.userInfo['openid'],
                reply: that.data.reply,
                text: that.data.inputValue
            },
            method: 'POST',
            header: {
                'content-type': 'application/json' //默认值
            },
            success: res => {
                that.setData({
                    inputValue: null,
                    reply: null
                })
                this.getData()
            },
            fail: res => {
                console.log(res.data)
            }
        })
        wx.createSelectorQuery().select('#all').boundingClientRect(function(rect){
            // 使页面滚动到底部
            wx.pageScrollTo({
                scrollTop: rect.bottom
            })
        }).exec()
    },
    getData: function () {
        const id = this.data.id
        wx.request({
            url: app_data.url + '/api/get_comments/',
            data: {
                id: id,
            },
            method: 'GET',
            success: res => {
                let data = res.data
                data['data'].forEach((item) => {
                    item['time'] = app.time(item['time'])
                })
                let list = data['data']
                console.log(list)
                this.setData({
                    comment_list: list
                })
                setTimeout(() => {
                    wx.hideLoading()
                }, 100)
            },
            fail: res => {
                wx.showToast({
                    title: res.data['error'],
                    mask: true
                })
            }
        })

    }
})
