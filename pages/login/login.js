// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    userpwd: null,
    src: 'http://119.3.46.32/yinvoker/lzcj/images/logo.png'
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 登录事件
   */
  startBtn: function () {
    if (this.data.username == 'ceshi' && this.data.userpwd == 'ceshi') {
      app.globalData.userInfo = { username: this.data.username, userpwd: this.data.userpwd };
      wx.redirectTo({
        url: '../user/user',
      })
    } else {
      wx.redirectTo({
        url: '../login/login',
      })
    }

  },
  /**
   * 用户名读取
   */
  usernameInput: function (event) {
    this.setData({ username: event.detail.value })
  },
  /**
   * 密码读取
   */
  userpwdInput: function (event) {
    this.setData({ userpwd: event.detail.value })
  }
})