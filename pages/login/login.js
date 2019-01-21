// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: null,
    userpwd: null,
    logosrc: 'http://119.3.46.32/yinvoker/lzcj/images/logo.png',
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
    var un = this.data.userid;
    var up = this.data.userpwd;
    wx.request({
      url: 'http://iot.wduozhi.xyz/api/user/login',
      data:{
        "username": un,
        "password": up
      },
      method: 'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded; charset=utf-8'
      },
      success: function(res){
        var status = res.data.status;
        if (status == "success") {
          app.globalData.userInfo = { userid: un, userpwd: up, username: un };
          wx.redirectTo({
            url: '../home/home',
          })
        } else {
          wx.redirectTo({
            url: '../login/login',
          })
          wx.showToast({
            title: '登录失败',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    })
    

  },

  /**
   * 用户名读取
   */
  useridInput: function (event) {
    this.setData({ userid: event.detail.value })
  },

  /**
   * 密码读取
   */
  userpwdInput: function (event) {
    this.setData({ userpwd: event.detail.value })
  },
})