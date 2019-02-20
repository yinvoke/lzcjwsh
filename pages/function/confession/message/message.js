// pages/function/confession/message/message.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curid:0,
    huifu:[],
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmessage(this.data.curid)
  },
  getmessage: function (id) {
    app.showLoadToast('加载中', 3000);
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/getMessage',
      method: 'GET',
      header: header,
      data: {
        id: id
      },
      success: function (res) {
        
        wx.hideLoading()
        console.log(res)
        var obs = res.data.object
        var temp = [];
        for( let i = 0; i < obs.length; i++){
          temp = temp.concat(JSON.parse(obs[i].message))
          that.readme(obs[i].id);
        }
        var t = that.data.huifu.concat(temp)
        that.setData({
          huifu: t
        })
        let l = res.data.object.length;
        let cid = res.data.object[l - 1].id;
        if (l - 1 < 9) {
          that.setData({
            curid: cid,
            remind: '没有更多啦！',
            more: false
          })
        } else {
          that.setData({
            curid: cid,
            remind: '下拉加载更多！',
            more: true
          })
        }
      }
    })
  },
  readme:function(id){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/readMessage',
      method: 'POST',
      header: header,
      data: {
        id: id
      },
      success: function (res) {
      }
    })
  },
  //上滑加载更多
  onReachBottom: function () {
    var that = this;
    if (that.data.more) {
      that.getmessage(that.data.curid);
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      curid: 0,
      huifu: []
    });
    that.getmessage(that.data.curid)
  },
  /**
   * 评论跳转功能
   */
  jumpDetails: function (e) {
    let id = e.currentTarget.id
    let ob =null;
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/getConfessionById',
      method: 'GET',
      header: header,
      data: {
        conId: id
      },
      success: function (res) {
        console.log(res)
        ob = res.data.object
        wx.navigateTo({
          url: '../details/details?ob=' + JSON.stringify(ob),
        })
      }
    })
    
  },
})