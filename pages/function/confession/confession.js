// pages/function/confession/confession.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    core: [
      { id: 'message', name: '消息中心' },
      { id: 'showlove', name: '发起表白' },
      { id: 'matching', name: '心动匹配' }
    ],
    timeline:[],
    scrollTop: 0,
    curid:0,
  },

  /**
   * 生命周期函数--页面显示
   */
  onLoad: function () {
    this.setData({
      timeline:[]
    })
    this.getmessage(0)
  },

  getmessage:function(id){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/getConfessionList',
      method: 'POST',
      header: header,
      data: {
        id: id
      },
      success: function (res) {
        console.log(res)
        var temp = that.data.timeline.concat(res.data.object)
        that.setData({
          timeline: temp
        })
        let l = res.data.object.length;
        let cid = res.data.object[l - 1].id;
        if(l-1<19){
          that.setData({
            curid: cid,
            remind:'没有更多啦！',
            more:false
          })
        }else{
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
    var that = this;
    if (that.data.more) {
      that.getmessage(that.data.curid);
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      curid:0,
      timeline:[]
    });
    that.getmessage(that.data.curid)
  },

  /**
   * 评论跳转功能
   */
  jumpDetails:function(e){
    let id = e.currentTarget.id
    let ob = this.data.timeline[id]
    wx.navigateTo({
      url: '../confession/details/details?ob=' + JSON.stringify(ob),
    })
  },
  /**
   * 回到顶部
   */
  // 获取滚动条当前位置
  scroll: function (e, res) {
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  //回到顶部
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  }

})