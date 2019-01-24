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
    timeline:[
      { id: 'table', nickname: '二狗', avatar: "/assets/core/aides.png", time: "3分钟前", text: '我是二狗', original_pic:"/images/1.jpg" }
    ]
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTimeline()
  },
  onPullDownRefresh() {
    if (refreshing) return false

    refreshing = true
    ajax({
      url: 'refresh_timeline.json',
      success: res => {
        if (refreshed) {
          wx.showToast({
            title: '没有刷出新消息哦！'
          })
        } else {
          let timeline = this.formatTimeline(res.data)
          this.setData({
            timeline: [...timeline, ...this.data.timeline]
          })
        }
      },
      complete: _ => {
        refreshing = false
        refreshed = true
        wx.stopPullDownRefresh()
      }
    })
  },
  scrollToLower() {
    if (loadingMore || loadedEnd) return false

    loadingMore = true
    ajax({
      url: 'more_timeline.json',
      success: res => {
        let timeline = this.formatTimeline(res.data)
        this.setData({
          timeline: [...this.data.timeline, ...timeline]
        })
      },
      complete: _ => {
        loadingMore = false
        loadedEnd = true
      }
    })
  },
  getTimeline() {
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    ajax({
      url: 'timeline.json',
      success: res => {
        let timeline = this.formatTimeline(res.data)
        this.setData({
          timeline: timeline
        })
      },
      complete: _ => {
        wx.hideToast()
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
  } 
})