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
      { id: '二狗', nickname: '刘薇', avatar: "/assets/user/logo.png", time: "3分钟前", text: '我是二狗', original_pic:"/images/1.jpg",likenum:60,commentnum:12},
      { id: 'invoker', nickname: 'testname', avatar: "/assets/core/market.png", time: "5分钟前", text: '测试文档', original_pic: "", likenum: 5, commentnum: 3 },
      { id: '谢景旭', nickname: 'qwe', avatar: "/assets/more/logo.png", time: "10分钟前", text: '', original_pic: "", likenum: 5, commentnum: 3 },
      { id: 'liasl', nickname: 'wfe', avatar: "/assets/user/logo.png", time: "13分钟前", text: 'ceshiyongli', original_pic: "", likenum: 5, commentnum: 3 },
      { id: 'lgd', nickname: '测试用户123', avatar: "/assets/core/market.png", time: "13分钟前", text: '!@#$%^&*((()_', original_pic: "", likenum: 5, commentnum: 3 },
      { id: 'we', nickname: '我不知道叫什么', avatar: "/assets/core/aides.png", time: "23分钟前", text: '123456789', original_pic: "", likenum: 5, commentnum: 3 },
      { id: 'newbee', nickname: '七七七', avatar: "/assets/more/logo.png", time: "30分钟前", text: 'chasohcioiehoihiohiohoeiwhoihvhkldsnklnlkvmdsklnlkvnlkndslknlknglknkldsnklnglknlkdsnklnklnklnklnklnklnlgknklndklsnklnklgfnklnerklnklbnklndsklnbklnskldnfjknjksdbjkbvjkbjwkebjkbjkbjkbjkbjkbjkbjknfkjnjksndjknfjknjdsknkjfnjknsdjknfjknsdjknfkjnjknejkbjkbjkbsjkbjkbjkbjvkbjkejksbjkvnjknsjnjknjknkj吃', original_pic: "", likenum: 5, commentnum: 3 },
      { id: 'aster', nickname: '2333333', avatar: "/assets/core/aides.png", time: "1小时前", text: '???????????', original_pic: "", likenum: 5, commentnum: 3 },
      { id: '@QQ@', nickname: '匿名用户', avatar: "/assets/user/logo.png", time: "2天前", text: '这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字这是一段特别长的文字', original_pic: "", likenum: 5, commentnum: 3 },
      { id: 'aster', nickname: '2333333', avatar: "/assets/core/aides.png", time: "1个月前", text: '???????????', original_pic: "", likenum: 5, commentnum: 3 },
    ],
    scrollTop: 0
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