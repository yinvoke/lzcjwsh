// pages/function/confession/matching/matching.js
var md5 = require('../../../../libs/MD5.js')
var app = getApp();
Page({

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
      url: 'https://lancai.zekdot.com:8013/conWall/isRegister',
      method: 'GET',
      header: header,
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            tips: '欢迎来到表白墙，这是我们的匹配功能，接下来，你可以输入喜欢的人的姓名，我们将会为您匹配~~',
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
  toinput: function(e) {
    this.setData({
      toname: e.detail.value
    })
  },

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
        url: 'https://lancai.zekdot.com:8013/conWall/register',
        method: 'POST',
        header: header,
        data: {
          likeCode: code
        },
        success: function (res) {
          wx.hideLoading()
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
          setTimeout(function () {
            wx.navigateBack({//返回
              delta: 1
            })

          }, 2000);
        },
        fail: function (res) {
          app.showErrorModal('请重试', '匹配失败')
        }
      })
    } else {
      app.showLoadToast('匹配中', 3000);
      wx.request({
        url: 'https://lancai.zekdot.com:8013/conWall/changeName',
        method: 'POST',
        header: header,
        data: {
          likeCode: code
        },
        success: function(res) {
          wx.hideLoading()
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