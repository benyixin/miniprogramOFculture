const app_data = getApp().globalData
let SocketTask = null

Page({

    /**
     * 页面的初始数据
     */
    data: {
        focus: false,
        inputValue: null,
        content_list: [
            {
                user_id: null,
                is_my: true,
                content: '哈哈哈哈今天去哪里哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊啊',
                time: null
            },
            {
                user_id: null,
                is_my: false,
                content: '我先去你家我先去你家的我先去你家的我先去你家的我先去你家的我先去你家的我先去你家的我先去你家的的',
                time: null
            }
        ],
        my_avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
        other_avatar: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.webSocket()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        SocketTask.onOpen(res => {
            console.log('监听 WebSocket 连接打开事件。', res)
        })
        SocketTask.onClose(onClose => {
            console.log('监听 WebSocket 连接关闭事件。', onClose)
            this.webSocket()
        })
        SocketTask.onError(onError => {
            console.log('监听 WebSocket 错误。错误信息', onError)
        })
        SocketTask.onMessage(msg => {
            console.log('监听WebSocket 接收信息。', JSON.parse(msg.data))
            console.log(app_data.userInfo)
            let data = JSON.parse(msg.data)
            console.log(data['user_name'] === app_data.userInfo['nickName'])
            if (data['user_name'] !== app_data.userInfo['nickName']) {
                data.is_my = false
                this.pushMessage(data, false)
            }
        })
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
    webSocket: function () {
        // 创建Socket
        SocketTask = wx.connectSocket({
            url: 'ws://localhost:8000' + app_data.chat_url + 'room/',
            data: 'data',
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            success: function (res) {
                console.log('WebSocket连接创建', res)
            },
            fail: function (err) {
                wx.showToast({
                    title: '网络异常！',
                })
                console.log(err)
            },
        })
    },
    submitTo: function () {
        let message = {
            user_name: app_data.userInfo['nickName'],
            user_id: app_data.userInfo['openid'],
            is_my: true,
            content: this.data.inputValue,
            time: Date.parse(new Date()) / 1000
        }
        this.pushMessage(message, true)
        this.sendSocketMessage(message)
    },
    bindKeyInput: function (e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    sendSocketMessage: function (msg) {
        SocketTask.send({
            data: JSON.stringify(msg)
        }, function (res) {
            console.log('已发送', res)
        })
    },
    pushMessage: function (msg, is_my) {
        this.data.content_list.push(msg)
        if (is_my) {
            this.setData({
                content_list: this.data.content_list,
                inputValue: '',
                focus: true,
                scrollTop: 100000
            })
        } else {
            this.setData({
                content_list: this.data.content_list,
                scrollTop: 100000
            })
        }
    }
})
