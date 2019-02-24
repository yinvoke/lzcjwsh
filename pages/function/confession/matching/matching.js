// pages/function/confession/matching/matching.js
var md5 = require('../../../../libs/MD5.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  onLoad: function(e) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/isRegister',
      method: 'GET',
      header: header,
      success: function(res) {
        console.log(res)
        if (res.data.code == 1) {
          that.setData({
            tips: '请输入喜欢的人的姓名',
            ir:0
          })
        } else {
          that.setData({
            tips: '请在确认无误后修改喜欢的人的姓名',
            ir:1
          })
        }
      },
      fail: function(res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  /**
   * 输入处理
   */
  toinput: function(e) {
    this.setData({
      toname: e.detail.value
    })
  },

  /**
   * 提交
   */
  submit: function() {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    if (cookie) {
      header.Cookie = cookie
    }
    let code = md5.hexMD5('shudaixiong' + that.data.toname);
    if (this.data.toname == null) {
      app.showErrorModal('发帖失败', "姓名不能为空")
    } else if(this.data.ir==0){
      app.showLoadToast('注册中', 3000);
      wx.request({
        url: 'http://119.3.46.32:8014/conWall/register',
        method: 'POST',
        header: header,
        data: {
          likeCode: code
        },
        success: function (res) {
          wx.hideLoading()
          console.log(res)
          if(res.data.object){
            that.setData({
              message: res.data.message,
              obj: res.data.object
            })
          }else{
            that.setData({
              message: res.data.message
            })
          }
          
        },
        fail: function (res) {
          app.showErrorModal('请重试', '匹配失败')
        }
      })
    } else {
      app.showLoadToast('匹配中', 3000);
      wx.request({
        url: 'http://119.3.46.32:8014/conWall/changeName',
        method: 'POST',
        header: header,
        data: {
          likeCode: code
        },
        success: function(res) {
          wx.hideLoading()
          console.log(res)
          if (res.data.object) {
            that.setData({
              message: res.data.message,
              obj: res.data.object
            })
          } else {
            that.setData({
              message: res.data.message
            })
          }
        },
        fail: function(res) {
          app.showErrorModal('请重试', '匹配失败')
        }
      })
    }
  },


})