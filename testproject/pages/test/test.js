// pages/test/test.js
let province = 'xinjiang'
let app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        test_list: [],
        current_index: 0,
        selected_index: null,
        answer: [],
        user_answer: [],
        nosubmit: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        //province = options.name
        wx.request({
            url: getApp().globalData.url + '/api/get_test',
            data: {
                province: province
            },
            method: 'GET',
            header: {
                'content-type': 'application/json' //默认值
            },
            success: function (res) {
                const data = res.data
                that.setData({
                    test_list: data.data.sort(that.randomSort)
                })
                console.log(data.data)
                data.data.forEach((item) => {
                    that.data.answer.push(item['answer'])
                })
                console.log(that.data.answer)
            },
            fail: function (res) {

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

    },

    randomSort: function (a, b) {
        return Math.random() > .5 ? -1 : 1;
    },

    select: function (e) {
        const data = this.data
        this.setData({
            selected_index: e.currentTarget.dataset['index']
        })
        data.user_answer[data.current_index] = data.selected_index
        this.setData({
            nosubmit: this.judge()
        })
    },

    previous: function () {
        const data = this.data
        this.setData({
            current_index: data.current_index - 1
        })
        if (typeof (data.user_answer[data.current_index]) != 'undefined') {
            this.setData({
                selected_index: data.user_answer[data.current_index]
            })
        } else {
            this.setData({
                selected_index: null
            })
        }
    },

    next: function () {
        const data = this.data
        this.setData({
            current_index: data.current_index + 1
        })
        if (typeof (data.user_answer[data.current_index]) != 'undefined') {
            this.setData({
                selected_index: data.user_answer[data.current_index]
            })
        } else {
            this.setData({
                selected_index: null
            })
        }
    },

    submit: function () {
        const data = this.data
        let tmp_answer = []
        data.user_answer.forEach((item) => {
            item += 'A'.charCodeAt()
            tmp_answer.push(String.fromCharCode(item))
        })
        if (this.compare(tmp_answer, this.data.answer)) {
            wx.request({
                url: getApp().globalData.url + '/api/finish_test',
                data: {
                    user_id: app.globalData.userInfo['openid'],
                    province: province
                },
                method: 'POST',
                header: {
                    'content-type': 'application/json' //默认值
                },
                success: function (res) {
                    console.log(res.data)
                },
                fail: function (res) {
                    console.log(res.data)
                }
            })
            wx.showToast({
                title: '答案正确',
                mask: true
            })
            setTimeout(function () {
                wx.navigateBack()
            }, 1500)
        } else {
            wx.showToast({
                title: '答案错误',
                icon: 'none',
                mask: true
            })
            setTimeout(function () {
                wx.navigateBack()
            }, 1500)
        }
    },

    judge: function () {
        const data = this.data
        for (let index = 0; index < data.test_list.length; index++) {
            if (typeof (data.user_answer[index]) == 'undefined') {
                return true
            }
        }
        return false
    },

    compare: function (a, b) {
        for (let index = 0; index < a.length; index++) {
            if (a[index] != b[index]) {
                return false
            }
        }
        return true
    }
})
