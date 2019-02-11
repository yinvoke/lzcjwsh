// pages/information/information.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifname:false,
    ifpwd:false,
    head:null,
    nickname:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/user/infor',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          head: res.data.object.head,
          nickname: res.data.object.nickname
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/user/infor',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          head: res.data.object.head,
          nickname: res.data.object.nickname
        })
      }
    })
  },

  chooseImage: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#ffcb63",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 3,
      success: function (res) {
        _this.setData({
          uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
        })
      }
    })
    this.setData({
      editable: true
    })
  },
  name:function(){
    this.setData({
      ifname: true
    })
  },
  pwd: function () {
    this.setData({
      ifpwd: true
    })
  },
  cancel:function(){
    this.setData({
      ifname:false,
      ifpwd:false
    })
  },
  nameinput:function(e){
    this.setData({
      name: e.detail.value,
    })
  },
  oldinput: function (e) {
    this.setData({
      oldpwd: e.detail.value,
    })
  },
  newinput: function (e) {
    this.setData({
      newpwd: e.detail.value,
    })
  },
  reinput: function (e) {
    this.setData({
      repwd: e.detail.value,
    })
  },
  confirmname: function(){
    var that = this
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8'};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/user/modNickname',
      method: 'POST',
      header: header,
      data:{
        nickname:that.data.name
      },
      success: function (res) {
        app.showSuccessToast('修改成功', 3000)
        that.onShow()
      },
      fail:function(res){
        app.showErrorModal('修改失败',res.message)
      }
    })
    
    this.setData({
      ifname: false,
    })

  },
  confirmpwd: function () {
    var that = this
    if (this.data.oldpwd != app.globalData.pwd){
      app.showErrorModal('旧密码输入错误','修改失败')
    }
    else if (this.data.newpwd != this.data.repwd){
      app.showErrorModal('两次密码输入不一致', '修改失败')
    }
    else{
      let cookie = wx.getStorageSync('cookieKey');
      let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
      if (cookie) {
        header.Cookie = cookie
      }
      wx.request({
        url: 'http://119.3.46.32:8014/user/modPassword',
        method: 'POST',
        header: header,
        data: {
          password: that.data.newpwd
        },
        success: function (res) {
          app.showSuccessToast('修改成功', 3000)
          that.onShow()
        },
        fail: function (res) {
          app.showErrorModal('修改失败', res.message)
        }
      })
      this.setData({
        ifpwd: false,
      })
    }
  }
})