// pages/feedback/feedback.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editable:false
  },
  

  /**
   * 内容读取
   */
  wti: function(e){
    this.setData({ description:e.detail.value})
  },
  qqi: function (e) {
    this.setData({ qq: e.detail.value })
  },

  /**
   * 内容提交
   */
  submit:function(){
    app.showLoadToast('提交中', 2000);
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8'};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'https://lancai.zekdot.com:8013/suggest/insertSug',
      method: 'POST',
      header: header,
      data:{
        content:that.data.description,
        contact:that.data.qq
      },
      success: function (res) {
        app.showSuccessToast('提交成功', 1000)
        wx.navigateBack({
          delta: 1
        })
      },
      fail:function(res){
        app.showErrorModal(res.data.message,'提交失败')
      }
    })
    
  }

})