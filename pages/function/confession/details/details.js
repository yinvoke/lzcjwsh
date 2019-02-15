// pages/function/confession/details/details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:null,
    headitem:null,
    uid: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      headitem: JSON.parse(options.ob),
      uid: JSON.parse(options.ob).id
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/getCommentByConId',
      method: 'POST',
      header: header,
      data: {
        id: 0,
        conId: that.data.uid
      },
      success: function (res) {
        console.log(res)
        that.setData({
          comments: res.data.object
        })
      }
    })
  },

  

  /**
   * 喜欢
   */
  likedislike: function(){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    if (this.data.headitem.isThumbUp == false){
      wx.request({
        url: 'http://119.3.46.32:8014/conWall/thumbUp',
        method: 'POST',
        header: header,
        data: {
          conId: that.data.uid
        },
        success:function(res){
          console.log(res)
          that.setData({
            ['headitem.isThumbUp']:true,
            ['headitem.thumb']:that.data.headitem.thumb+1
          })
        }
      })
    }
    else{
      wx.request({
        url: 'http://119.3.46.32:8014/conWall/thumbDown',
        method: 'POST',
        header: header,
        data: {
          conId: that.data.uid
        },
        success: function (res) {
          console.log(res)
          that.setData({
            ['headitem.isThumbUp']: false,
            ['headitem.thumb']: that.data.headitem.thumb - 1
          })
        }
      })
    }
  },

  /**
   * 更改评论用户
   */
  toBtn:function(e){
    console.log(e.target.dataset.id);
    this.setData({
      touser: e.target.dataset.id
    })
  }
})