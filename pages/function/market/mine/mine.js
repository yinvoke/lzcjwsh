// pages/function/market/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curid: 0,
    goods: [],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getGoods(this.data.curid)
  },
  /**
   * 获取类型商品
   */
  getGoods: function (lastid) {
    app.showLoadToast('加载中', 3000);
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'https://lancai.zekdot.com:8013/fleMar/getOwnProduct',
      method: 'POST',
      header: header,
      data: {
        lastId: lastid
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res)
        var temp = that.data.goods.concat(res.data.object)
        that.setData({
          goods: temp
        })
        let l = res.data.object.length;
        let cid = res.data.object[l - 1].id;
        if (l - 1 < 19) {
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
  //上滑加载更多
  onReachBottom: function () {
    if (this.data.more) {
      this.getGoods(this.data.curid);
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      curid: 0,
      goods: []
    });
    this.getGoods(this.data.curid)
  },
  /**
   * 重新上架
   */
  resale:function(e){
    var that =this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    var id = e.currentTarget.id;
    console.log(this.data.goods[id].id)
    let uid = this.data.goods[id].id
    wx.request({
      url: 'https://lancai.zekdot.com:8013/fleMar/refreshProduct',
      method: 'POST',
      header: header,
      data: {
        id: uid
      },
      success: function (res) {
        that.setData({
          curid:0,
          goods:[]
        })
        that.getGoods(that.data.curid)
      }
    })
  },
  /**
   * 删除物品
   */
  deleteit:function(e){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    var id = e.currentTarget.id;
    console.log(this.data.goods[id].id)
    let uid = this.data.goods[id].id
    wx.request({
      url: 'https://lancai.zekdot.com:8013/fleMar/deleteProduct',
      method: 'POST',
      header: header,
      data: {
        id: uid
      },
      success: function (res) {
        that.setData({
          curid: 0,
          goods: []
        })
        that.getGoods(that.data.curid)
      }
    })
  }
})