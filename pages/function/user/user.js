// pages/user/user.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,//app.global.username
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      username:app.globalData.userInfo.username
    })
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
  jumpProduct: function () {
    wx.navigateTo({
      url: '../user/product/product',
    })
  }
})