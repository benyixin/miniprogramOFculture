// pages/community/community.js
let page = 0
let total_page = 1
const app_data = getApp().globalData

Page({

    /**
     * 页面的初始数据
     */
    data: {
        focus: false,
        inputValue: null,
        content_list: [
            {
                user: '枫梓。',
                text: '哈哈哈哈今天去哪里哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊哈哈哈哈今天去哪里啊啊',
                time: '2019-11-28 21:45',
                avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                image: ['https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                    'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                    'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                    'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                    'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                    'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                ],
                flag: 2
            },
            {
                user: '山蕲。',
                text: '我先去你家我先去你家的我先去你家的我先去你家的我先去你家的我先去你家的我先去你家的我先去你家的的',
                avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
                time: '2019-11-28 21:50'
            }
        ],
        my_avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLWCFP2QI1x7JjuSoCgVEkyY6TGRnTpOUhibBfmqIn9mS5C3eDWvJ9OfU4iaooVQdAF0RVfK9OEbUkQ/132',
        other_avatar: null
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
        let that = this;
        // 显示加载图标
        if (page + 1 > total_page) {
            wx.showToast({
                title: '以上是全部了！',
                mask: true
            })
        } else {
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            wx.request({
                url: app_data.url + '/api/get_dynamics/',
                data: {
                    page: page
                },
                method: 'GET',
                success: res => {
                    const data = res.data['data']
                    data.forEach((item) => {
                        item['time'] = that.time(item['time'])
                    })
                    let list = this.data.content_list.concat(data)
                    this.setData({
                        content_list: list
                    })
                    page += 1
                    total_page = data['total_page']

                    console.log(this.data.content_list)
                    setTimeout(() => {
                        wx.hideLoading();
                    }, 100);
                },
                fail: res => {

                }
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    time(timestamp) {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        let day = date.getDate();
        day = this.addZero(day);
        let month = date.getMonth() + 1;
        month = this.addZero(month);
        let hour = date.getHours();
        hour = this.addZero(hour);
        let minute = date.getMinutes();
        minute = this.addZero(minute);
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    },
    addZero(number) {
        if (number < 10) {
            return '0' + number;
        } else {
            return number;
        }
    },
    addDynamic() {
        wx.navigateTo({
            url: '../dynamic/dynamic'
        })
    }
})
