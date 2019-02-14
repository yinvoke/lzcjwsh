// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if(cookie){
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/user/infor',
      method:'GET',
      header: header,
      success:function(res){
        that.setData({
          userinfo:res.data.object
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/user/infor',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          userinfo: res.data.object
        })
      }
    })
  },

  /**
   * 信息修改跳转
   */
  jumpInformation:function(){
    wx.navigateTo({
      url: '../user/information/information',
    })
  },

  /**
   * 意见反馈跳转
   */
  jumpFeedback:function(){
    wx.navigateTo({
      url: '../user/feedback/feedback',
    })
  },

  /**
   * 关于我们跳转
   */
  jumpAbout: function () {
    wx.navigateTo({
      url: '../user/about/about',
    })
  },
  /**
   * 产品信息跳转
   */
  jumpProduct: function () {
    wx.navigateTo({
      url: '../user/product/product',
    })
  },
  /**
   * 注销账号跳转
   */
  jumpLogin: function () {
    wx.setStorageSync('cookieKey', null)
    wx.navigateTo({
      url: '../../login/login',
    })
  }
})