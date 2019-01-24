// pages/function/user/product/product.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  jumpDisclaimer: function () {
    wx.navigateTo({
      url: '../product/disclaimer/disclaimer',
    })
  }
})