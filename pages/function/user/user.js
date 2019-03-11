// pages/user/user.js
var app = getApp();
Page({

  data: {
  },

  onLoad: function (options) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if(cookie){
      header.Cookie = cookie
    }
    wx.request({
      url: 'https://lancai.zekdot.com:8013/user/infor',
      method:'GET',
      header: header,
      success:function(res){
        that.setData({
          userinfo:res.data.object
        })
      }
    })
  },
  onShow: function () {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'https://lancai.zekdot.com:8013/user/infor',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          userinfo: res.data.object
        })
      }
    })
  },

  jumpInformation:function(){
    let ob = this.data.userinfo
    wx.navigateTo({
      url: '../user/information/information?ob=' + JSON.stringify(ob),
    })
  },

  jumpFeedback:function(){
    wx.navigateTo({
      url: '../user/feedback/feedback',
    })
  },

  jumpAbout: function () {
    wx.navigateTo({
      url: '../user/about/about',
    })
  },
  jumpProduct: function () {
    wx.navigateTo({
      url: '../user/product/product',
    })
  },
  jumpLogin: function () {
    wx.clearStorageSync();
    wx.reLaunch({
      url: '../../login/login',
    })
  }
})