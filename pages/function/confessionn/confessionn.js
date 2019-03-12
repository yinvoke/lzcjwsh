// pages/function/confession/confession.js
var app = getApp();
var cookie = wx.getStorageSync('cookieKey');
var header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
if (cookie) {
  header.Cookie = cookie
}
Page({

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
    weidunum:0
  },

  /**
   * 生命周期函数--页面显示
   */
  onLoad: function () {
    
    var that = this;
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
        let l = res.data.object.length;
        let cid = res.data.object[l - 1].id;
        if(l-1<19){
          that.setData({
            curid: cid,
            remind:'没有更多啦！',
            more:false,
            timeline: temp
          })
        }else{
          that.setData({
            curid: cid,
            remind: '下拉加载更多！',
            more: true,
            timeline: temp
          })
        }
      }
    })
  },
  //上滑加载更多
  onReachBottom: function () {
    if (this.data.more) {
      this.getmessage(this.data.curid);
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      curid:0,
      timeline:[]
    });
    this.getmessage(0)
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

})