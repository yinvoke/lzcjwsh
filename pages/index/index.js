// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    core: [
      { id: 'table', name: '课表查询' },
      { id: 'aides', name: '蹭课助手' },
      { id: 'market', name: '跳蚤市场' },
      { id: 'confession', name: '表白墙' },
      { id: 'user', name: '用户中心' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var username = wx.getStorageSync('username');
    var password = wx.getStorageSync('password');
    if(!username){
      wx.redirectTo({
        url: '../login/login',
      })
    }
    else{
      app.showLoadToast('加载中',1000);
      wx.request({
        method: 'POST',
        url: 'http://119.3.46.32:8014/user/login',
        data: {
          username: username,
          password: password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        success: function (res) {
          if (res && res.header && res.header['Set-Cookie']) {
            wx.setStorageSync('cookieKey', res.header['Set-Cookie'])
          }
          if (res.data.message == "success") {

          } else {
            wx.hideToast();
            app.showErrorModal('请检查教务网密码是否更改', '加载失败');
          }
        },
        fail: function (res) {
          app.showLoadToast('请检查您的网络');
        }
      });
    }
    
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

  /**
   * 课程表跳转
   */
  tableBtn: function(){
    wx.navigateTo({
      url: '../function/table/table',
    })
  },

  /**
   * 蹭课小助手跳转
   */
  aidesBtn: function () {
    wx.navigateTo({
      url: '../function/aides/aides',
    })
  },

  /**
   * 个人中心跳转
   */
  userBtn: function () {
    wx.navigateTo({
      url: '../function/user/user',
    })
  },

  /**
   * 表白墙跳转
   */
  confessionBtn: function () {
    wx.navigateTo({
      url: '../function/confession/confession',
    })
  },

  /**
   * 跳蚤市场跳转
   */
  lostBtn: function () {
    wx.navigateTo({
      url: '../function/market/market',
    })
  },

  
})