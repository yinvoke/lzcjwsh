// pages/information/information.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifname:false,
    ifpwd:false,
    pwd:'ce'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
    console.log('修改成功'),
    this.setData({
      ifname: false,
    })
  },
  confirmpwd: function () {
    if (this.data.oldpwd != this.data.pwd){
      app.showErrorModal('旧密码输入错误','修改失败')
    }
    else if (this.data.newpwd != this.data.repwd){
      app.showErrorModal('两次密码输入不一致', '修改失败')
    }
    else{
      console.log('修改成功'),
        this.setData({
          ifpwd: false,
        })
    }
  }
})