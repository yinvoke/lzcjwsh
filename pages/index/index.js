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
      { id: 'table', name: '失误招领' },
      { id: 'wall', name: '表白墙' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo == null) {
      wx.redirectTo({
        url: '../login/login',
      })
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
  kcb: function(){
    wx.navigateTo({
      url: '../function/table/table',
    })
  },

  /**
   * 蹭课小助手跳转
   */
  ckxzs: function () {
    wx.navigateTo({
      url: '../function/aides/aides',
    })
  },

  /**
   * 个人中心跳转
   */
  grzx: function () {
    wx.navigateTo({
      url: '../function/user/user',
    })
  },

  /**
   * 敬请期待
   */
  test: function(){
    wx.showToast({
      title: '敬请期待',
      icon: 'loading',
      duration: 1500
    })
  }
})