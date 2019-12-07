//index.js
//获取应用实例
const app = getApp()
const app_data = getApp().globalData

Page({
  data: {
    userInfo: {}
    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      userInfo: app_data.userInfo
    })
  },
  function() {
    wx.setBackgroundColor({
      backgroundColorTop: '#bbb', // 顶部窗口的背景色为白色
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
  },
  goRoom: function () {
     wx.navigateTo({
       url: '../room/room'
     })
  },
  goComm: function () {
    wx.navigateTo({
      url: '../mycom/mycom'
    })
  }
})
