//app.js

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {},

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {
    var username = wx.getStorageSync('username');
    var password = wx.getStorageSync('password');
    if (!username) {
      wx.redirectTo({
        url: '/pages/login/login',
      })
    } else {
      let cookie = wx.getStorageSync('cookieKey');
      let header = {
        'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
      };
      if (cookie) {
        header.Cookie = cookie
      }
      wx.request({
        method: 'POST',
        url: 'https://lancai.zekdot.com:8013/user/login',
        data: {
          username: username,
          password: password
        },
        header: header,
        success: function (res) {
          if (res && res.header && res.header['Set-Cookie']) {
            wx.setStorageSync('cookieKey', res.header['Set-Cookie'])
          }
        },
        fail: function (res) {
          this.showLoadToast('请检查您的网络');
        }
      });
    }
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {},

  globalData: {
    username: null,
    pwd: null,
  },




  /**
   * 提示功能
   */
  showErrorModal: function(content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function(title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 5000
    });
  },
  showSuccessToast: function(title, duration) {
    wx.showToast({
      title: title || '成功',
      icon: 'success',
      duration: duration || 3000
    });
  }
})