// pages/user/user.js
var amapFile = require('../../libs/amap-wx.js');
var app = getApp();
var cookie = wx.getStorageSync('cookieKey');
var header = {
  'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
};
if (cookie) {
  header.Cookie = cookie
}
Page({
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
        id: 'confessionn',
        name: '表白墙',
        bc: '#78281F',
        c: '#F5B7B1'
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
    var that = this;
    var myAmapFun = new amapFile.AMapWX({
      key: '059a42238cba63b188e9589bd8500f4f'
    });
    wx.request({
      url: 'https://lancai.zekdot.com:8013/inform/getInfor',
      method: 'GET',
      header: header,
      success: function(res) {
        myAmapFun.getWeather({
          success: function (data) {
            if (res.data.object.length > 0) {
              that.setData({
                infor: res.data.object[0].content,
                weather: data
              })
            }
          },
          fail: function (info) {
            app.showErrorModal('天气获取失败', '加载失败')
          }
        })
        
      }
    })
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


})