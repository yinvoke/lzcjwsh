// pages/login/login.js
var app = getApp();
Page({
  data: {
    angle:0
  },
  onReady: function () {
    var that = this;
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
  bind: function () {
    var that = this;
    if (!that.data.userid || !that.data.passwd) {
      app.showErrorModal('账号及密码不能为空', '提醒');
    }
    else{
      app.globalData.username = that.data.userid
      app.globalData.pwd = that.data.passwd
      app.showLoadToast('验证中');
      wx.request({
        method: 'POST',
        url: 'https://lancai.zekdot.com:8013/user/login',
        data: {
          username: that.data.userid,
          password: that.data.passwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        success: function (res) {
          if(res && res.header && res.header['Set-Cookie']){
            wx.setStorageSync('cookieKey', res.header['Set-Cookie'])
          }
          if (res.data.message == "success") {
            wx.setStorageSync('username', that.data.userid);
            wx.setStorageSync('password', that.data.passwd);
            wx.redirectTo({
              url: '../index/index',
            })
          } else {
            wx.hideToast();
            app.showErrorModal(res.data.message, '登录失败');
          }
        },
        fail: function (res) {
          app.showLoadToast('请检查您的网络');
        }
      });
    }
    
  },

  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
});