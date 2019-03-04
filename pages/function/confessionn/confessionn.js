// pages/function/confession/confession.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    core: [
      { id: 'message', name: '消息中心' },
      { id: 'matching', name: '心动匹配' }
    ],
    selectData: ['查看全部', '只看实名', '只看匿名'],
    mode:0,
    timeline:[],
    scrollTop: 0,
    curid:0,
  },

  /**
   * 生命周期函数--页面显示
   */
  onLoad: function () {
    
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    if (wx.getStorageSync('isfirst')){
      wx.navigateTo({
        url: '../confessionn/matching/matching',
      })
    }
    
    wx.request({
      url: 'https://lancai.zekdot.com:8013/conWall/getNoReMesNum',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          weidunum:res.data.object
        })
      },
    })
    this.getmessage(0)
  },

  getmessage:function(id){
    app.showLoadToast('加载中', 3000);
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'https://lancai.zekdot.com:8013/conWall/getConfessionList',
      method: 'POST',
      header: header,
      data: {
        id: id
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        wx.hideToast()
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
  // 点击下拉显示框
  selectTap:function() {
    this.setData({
      show: !this.data.show
    });
  },
  // 点击下拉列表
  optionTap:function(e) {
    let tem = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      mode: tem,
      show: !this.data.show
    });
  },
  /**
   * 评论跳转功能
   */
  jumpDetails:function(e){
    let id = e.currentTarget.id
    let ob = this.data.timeline[id]
    wx.navigateTo({
      url: '../confessionn/details/details?ob=' + JSON.stringify(ob),
    })
  },
  jumprelease: function () {
    wx.navigateTo({
      url: '../confessionn/showlove/showlove',
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