// pages/user/user.js
var amapFile = require('../../libs/amap-wx.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    core: [{
        id: 'table',
        name: '课表查询',
        bc: '#154360',
        c: '#85C1E9'
      },
      {
        id: 'aides',
        name: '蹭课助手',
        bc: '#4A235A',
        c: '#D7BDE2'
      },
      {
        id: 'market',
        name: '跳蚤市场',
        bc: '#0E6655',
        c: '#A3E4D7'
      },
      {
        id: 'user',
        name: '用户中心',
        bc: '#9C640C',
        c: '#F9E79F'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var username = wx.getStorageSync('username');
    var password = wx.getStorageSync('password');
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '059a42238cba63b188e9589bd8500f4f'
    });
    if (!username) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      wx.request({
        method: 'POST',
        url: 'https://lancai.zekdot.com:8013/user/login',
        data: {
          username: username,
          password: password
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        success: function(res) {
          if (res && res.header && res.header['Set-Cookie']) {
            wx.setStorageSync('cookieKey', res.header['Set-Cookie'])
          }
          if (res.data.message == "success") {
            myAmapFun.getWeather({
              success: function(data) {
                that.setData({
                  weather: data
                });
              },
              fail: function(info) {
                app.showErrorModal('天气获取失败', '加载失败')
              }
            })
          } else {
            app.showErrorModal('请检查教务网密码是否更改', '加载失败');
            wx.redirectTo({
              url: '../login/login',
            })
          }
        },
        fail: function(res) {
          app.showLoadToast('请检查您的网络');
        }
      });


    }

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  


})