// pages/function/confession/confession.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    core: [
      { id: 'table', name: '课表查询' },
      { id: 'aides', name: '蹭课助手' },
      { id: 'lost', name: '失误招领' },
      { id: 'confession', name: '表白墙' },
      { id: 'user', name: '用户中心' }
    ],
    timeline:null,
    scrollTop: 0,
    page:0
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8'};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/getConfessionList',
      method: 'POST',
      header: header,
      data:{
        id:0
      },
      success: function (res) {
        console.log(res)
        that.setData({
          timeline:res.data.object
        })
      }
    })
  },
  formatTimeline(items) {
    items.forEach(item => {
      item.avatar = util.getAvatarUrl(item.avatar)
      item.time = util.timeFormat(item.created_at)
      return item
    })
    return items
  },
  previewImage(event) {
    wx.previewImage({
      current: '',
      urls: [event.target.dataset.originalPic]
    })
  },

  /**
   * 评论跳转功能
   */
  jumpDetails:function(){
    wx.navigateTo({
      url: '../confession/details/details',
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