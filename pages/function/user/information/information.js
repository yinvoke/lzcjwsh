// pages/information/information.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifname:false,
    ifpwd:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      headitem: JSON.parse(options.ob),
    })
  },
  getinfo:function(){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'https://lancai.zekdot.com:8013/user/infor',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          headitem: res.data.object
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
    let that = this;
    let imagename = app.globalData.username + "head";
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        let cookie = wx.getStorageSync('cookieKey');
        let header = { 
          'content-type': 'multipart/form-data'
        };
        if (cookie) {
          header.Cookie = cookie
        }
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 500
        })
        wx.uploadFile({
          url: 'https://lancai.zekdot.com:8013/user/uploadHead', 
          filePath: tempFilePaths[0],
          header: header,
          name: "head",
          success(res) {
            if(res.statusCode==200){
              var d = JSON.parse(res.data)
              app.showSuccessToast('修改成功', 3000)
              that.getinfo()
            }else{
              app.showErrorModal('图片过大，请重新上传', '修改失败')
            }
            
          },
          fail(res){
            var d = JSON.parse(res.data)
            app.showErrorModal(d.message, '上传失败')
          }

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
    if (that.data.name == null) {
      app.showErrorModal('请输入有效昵称修改失败', '请输入有效昵称')
    }
    else{
      app.showLoadToast('修改中', 2000);
      let cookie = wx.getStorageSync('cookieKey');
      let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
      if (cookie) {
        header.Cookie = cookie
      }
      wx.request({
        url: 'https://lancai.zekdot.com:8013/user/modNickname',
        method: 'POST',
        header: header,
        data: {
          nickname: that.data.name
        },
        success: function (res) {
          app.showSuccessToast('修改成功', 1500)
          that.getinfo()
        },
        fail: function (res) {
          app.showErrorModal(res.message, '修改失败')
        }
      })

      this.setData({
        ifname: false,
      })
    }
    

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
      app.showLoadToast('修改中', 2000);
      let cookie = wx.getStorageSync('cookieKey');
      let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
      if (cookie) {
        header.Cookie = cookie
      }
      wx.request({
        url: 'https://lancai.zekdot.com:8013/user/modPassword',
        method: 'POST',
        header: header,
        data: {
          password: that.data.newpwd
        },
        success: function (res) {
          app.showSuccessToast('修改成功', 1300)
          wx.clearStorageSync();
          wx.reLaunch({
            url: '../../../login/login',
          })
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