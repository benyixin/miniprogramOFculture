//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // wx.request({
    //   url: getApp().globalData.url + '/api/register_user',
    //   data: app.globalData.userInfo,
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    //   success: res => {
    //     console.log('succeed!')
    //   },
    //   fail: error => {
    //     console.log('fail!')
    //   }
    // })
    wx.login({
      success: data => {
        console.log('获取登录 Code：' + data.code)
        let postData = {
          code: data.code
        };
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
          data: postData,
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          success: res=> {
            //回调处理
            console.log('getOpenID-OK!');
          },
          fail: error => {
            console.log(error);
          }
        })
      },
      fail: function() {
        console('登录获取Code失败！');
      }
    })
  }
})
