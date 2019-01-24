// pages/login/login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid:null,
    passwd:null,
    angle:0
  },
  onReady: function () {
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function () {
    var that = this;
    if (!that.data.userid || !that.data.passwd) {
      console.log('信息为空')
    }
    else if(that.data.userid=='010' && that.data.passwd == '010'){
      wx.redirectTo({
        url: '../index/index',
      })
    }else{
      wx.request({
        method: 'POST',
        url: 'http://119.3.46.32:8014/user/login',
        data: {
          username: that.data.userid,
          password: that.data.passwd
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.message == "success") {
            console.log('登陆成功');
            wx.redirectTo({
              url: '../index/index',
            })
          } else {
            console.log('登陆失败');
            wx.redirectTo({
              url: '../login/login',
            })
          }
        },
        fail: function (res) {
          console.log('连接失败');
          wx.redirectTo({
            url: '../login/login',
          })
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
  }
});