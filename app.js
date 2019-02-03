//app.js
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          wx.request({
            url: 'http://119.3.46.32:8014/user/login',
            data: {
              username: app.globalData.usernmae,
              password: app.globalData.passowrd
            },
          })
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    });
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    userInfo:{
      username:null,
      passowrd: null,
      gender: null,
      name:null,
      nickname:null,
      college:null,
      major:null,
      portrait:null,
    }
  },

  /**
   * 提示功能
   */
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function (title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      duration: duration || 5000
    });
  }
})
