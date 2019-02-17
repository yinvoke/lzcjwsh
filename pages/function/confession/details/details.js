// pages/function/confession/details/details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    headitem:null,
    //表白id
    uid: null,
    //页面标记id
    curid:0,
    nickname:'楼主'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      headitem: JSON.parse(options.ob),
      uid: JSON.parse(options.ob).id,
    })
  },
  onShareAppMessage:function(){

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmessage(this.data.curid)
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
      comments: []
    });
    that.getmessage(that.data.curid)
  },
  /**
   * 获取评论
   */
  getmessage:function(curid){
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
        id: curid,
        conId: that.data.uid
      },
      success: function (res) {
        console.log(res)
        var temp = that.data.comments.concat(res.data.object)
        that.setData({
          comments: temp
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
  /**
   * 获取二级评论
   */
  getmoresecond: function (scurid, comid, idx){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/getMoreSecComment',
      method: 'POST',
      header: header,
      data: {
        id: scurid,
        comId: comid,
      },
      success: function (res) {
        console.log(res)
        var temp = that.data.comments[idx].secondComment.concat(res.data.object)
        let vn = 'comments['+idx+'].secondComment';
        that.setData({
          [vn]: temp
        })
        let l = res.data.object.length;
        let vnn = 'comments[' + idx + '].more';
        if (l - 1 < 9) {
          that.setData({
            [vnn]: false,
          })
        } else {
          that.setData({
            [vnn]: true,
          })
        }
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
  toBtn1:function(e){
    this.setData({
      comid: e.target.dataset.id.id,
      nickname: e.target.dataset.id.nickname,
      isFirst:true
    })
  },
  toBtn2: function (e) {
    this.setData({
      comid: e.target.dataset.id.id,
      nickname: e.target.dataset.id.nickname,
      isFirst: false
    })
  },
  /**
   * 输入处理
   */
  hfinput:function(e){
    this.setData({
      hf: e.detail.value
    })
  },
  send:function(){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    if(this.data.nickname=='楼主'){
      wx.request({
        url: 'http://119.3.46.32:8014/conWall/comConfession',
        method: 'POST',
        header: header,
        data: {
          conId: that.data.headitem.id,
          content: that.data.hf
        },
        success: function (res) {
          app.showSuccessToast('回复成功！',2500)
          that.setData({
            curid: 0,
            inputValue: null,
            comments:[]
          })
          that.getmessage(that.data.curid)
        }
      })
    }
    else{
      wx.request({
        url: 'http://119.3.46.32:8014/conWall/comComment',
        method: 'POST',
        header: header,
        data: {
          isFirst: that.data.isFirst,
          comId: that.data.comid,
          content: that.data.hf
        },
        success: function (res) {
          app.showSuccessToast('回复成功！', 2500)
          that.setData({
            curid:0,
            inputValue:null,
            comments: []
          })
          that.getmessage(that.data.curid)
        }
      })
    }
  },
  getmore:function(e){
    let comid=e.target.dataset.id
    let idx = e.target.dataset.idx
    let l = comid.secondComment.length
    this.getmoresecond(comid.secondComment[l-1].id, comid.id, idx)
  }
})