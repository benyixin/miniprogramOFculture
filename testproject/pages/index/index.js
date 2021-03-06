//index.js
//获取应用实例
const app = getApp()
const app_data=app.globalData

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                lang: "zh_CN",
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
        wx.login({
            success: data => {
                console.log('获取登录 Code：' + data.code)
                let postData = {
                    code: data.code
                };
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx56cd11bf9a92da4b&secret=f8853d02171794d0'
                  + 'cf4fb419a8421db1&js_code=' + data.code + '&grant_type=authorization_code/',
                    data: postData,
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                    success: res => {
                        // 回调处理
                        app.globalData.userInfo['openid'] = res.data['openid']
                        this.sendUserInfo()
                    },
                    fail: error => {
                    }
                })
            }
        })
    },
    sendUserInfo: function () {
      wx.request({
        url: getApp().globalData.url + '/api/register_user/',
        data: JSON.stringify(app.globalData.userInfo),
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        success: res => {
            app.globalData.userInfo['openid'] = res.data['openid']
        },
        fail: error => {
          console.log('fail!')
        }
      })
    },
    pageNavi: function (e) {
        console.log(e)
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
