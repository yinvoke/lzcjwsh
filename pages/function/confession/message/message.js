// pages/function/confession/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curid:0,
    huifu:[
      {
        src:"二狗",
        con:"哦是吗？",
        isconed:"[图片]二狗二狗二狗在吗",
        time:"2019-1-1 12:03:03",
        head:"https://www.baidu.com/img/baidu_jgylogo3.gif"
      },
      {
        src: "二狗33333",
        con: "[图片]",
        isconed: "二狗二狗二狗在吗",
        time: "2019-1-1 12:03:03",
        head: "https://www.baidu.com/img/baidu_jgylogo3.gif"
      },
      {
        src: "二狗3",
        con: "[图片]哦是吗？",
        isconed: "二狗二狗二狗在吗",
        time: "2019-1-1 12:03:03",
        head: "https://www.baidu.com/img/baidu_jgylogo3.gif"
      }, 
      {
        src: "二狗",
        con: "哦是吗？",
        isconed: "二狗二狗二狗在吗",
        time: "2019-1-1 12:03:03",
        head: "https://www.baidu.com/img/baidu_jgylogo3.gif"
      }, 
      {
        src: "二狗",
        con: "哦是吗？",
        isconed: "[图片]二狗二狗二狗在吗",
        time: "2019-1-1 12:03:03",
        head: "https://www.baidu.com/img/baidu_jgylogo3.gif"
      }, 
      {
        src: "二狗",
        con: "哦是吗？",
        isconed: "[图片]",
        time: "2019-1-1 12:03:03",
        head: "https://www.baidu.com/img/baidu_jgylogo3.gif"
      },
    ]
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmessage(this.data.curid)
  },
  getmessage: function (id) {
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
        console.log(res)
        var temp = that.data.huifu.concat(res.data.object)
        that.setData({
          huifu: temp
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
})