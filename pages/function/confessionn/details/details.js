// pages/function/confession/details/details.js
var app = getApp();


Page({

  data: {
    comments:[],
    //页面标记id
    curid:0,
    nickname:'楼主'
  },

  onLoad: function (options) {
    app.showLoadToast('加载中', 400);
    this.setData({
      headitem: JSON.parse(options.ob),
      uid: JSON.parse(options.ob).id,
    })
    
  },
  onShareAppMessage:function(){

  },

  onShow: function () {
    this.getmessage(this.data.curid)
  },
  deleteit:function(){
    var cookie = wx.getStorageSync('cookieKey');
    var header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    var that = this;
    wx.request({
      url: 'https://lancai.zekdot.com:8013/conWall/deleteConfession',
      method: 'POST',
      header: header,
      data: {
        conId: that.data.uid
      },
      success: function (res) {
        wx.hideLoading();
        app.showSuccessToast('删除成功',400)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  //上滑加载更多
  onReachBottom: function () {
    if (this.data.more) {
      this.getmessage(this.data.curid);
    }
  },
  /**
   * 获取评论
   */
  getmessage:function(curid){
    var cookie = wx.getStorageSync('cookieKey');
    var header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    var that = this;
    wx.request({
      url: 'https://lancai.zekdot.com:8013/conWall/getCommentByConId',
      method: 'POST',
      header: header,
      data: {
        id: curid,
        conId: that.data.uid
      },
      success: function (res) {
        wx.hideLoading();
        var temp = that.data.comments.concat(res.data.object);
        let l = res.data.object.length;
        if (l==0) {
          that.setData({
            remind: '没有更多啦！',
            more: false,
            comments: temp
          })
        } else if (l - 1 < 9){
          let cid = res.data.object[l - 1].id;
          that.setData({
            curid: cid,
            remind: '没有更多啦！',
            more: false,
            comments: temp
          })
        } else {
          let cid = res.data.object[l - 1].id;
          that.setData({
            curid: cid,
            remind: '下拉加载更多！',
            more: true,
            comments: temp
          })
        }
      }
    })
    
  },
  /**
   * 获取二级评论
   */
  getmoresecond: function (scurid, comid, idx){
    console.log("scurid:"+scurid+" comid:"+comid)
    var cookie = wx.getStorageSync('cookieKey');
    var header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    var that = this;
    wx.request({
      url: 'https://lancai.zekdot.com:8013/conWall/getMoreSecComment',
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
        let l = res.data.object.length;
        let vnn = 'comments[' + idx + '].more';
        if (l - 1 < 9) {
          that.setData({
            [vnn]: false,
            [vn]: temp
          })
        } else {
          that.setData({
            [vnn]: true,
            [vn]: temp
          })
        }
      }
    })
  },

  

  /**
   * 喜欢
   */
  likedislike: function(){
    var cookie = wx.getStorageSync('cookieKey');
    var header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    var that = this
    if (this.data.headitem.isThumbUp == false){
      this.setData({
        ['headitem.isThumbUp']: true,
        ['headitem.thumb']: that.data.headitem.thumb + 1
      })
      wx.request({
        url: 'https://lancai.zekdot.com:8013/conWall/thumbUp',
        method: 'POST',
        header: header,
        data: {
          conId: that.data.uid
        },
      })
    }
    else{
      this.setData({
        ['headitem.isThumbUp']: false,
        ['headitem.thumb']: that.data.headitem.thumb - 1
      })
      wx.request({
        url: 'https://lancai.zekdot.com:8013/conWall/thumbDown',
        method: 'POST',
        header: header,
        data: {
          conId: that.data.uid
        },
      })
    }
    console.log(this.data.comments)
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
    var cookie = wx.getStorageSync('cookieKey');
    var header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    var that = this;
    if (this.data.hf){
      if (this.data.nickname == '楼主') {
        wx.request({
          url: 'https://lancai.zekdot.com:8013/conWall/comConfession',
          method: 'POST',
          header: header,
          data: {
            conId: that.data.headitem.id,
            content: that.data.hf
          },
          success: function (res) {
            app.showSuccessToast('回复成功！', 800);
            that.setData({
              curid: 0,
              inputValue: null,
              comments: [],
              hf:null,
            })
            that.getmessage(that.data.curid)
          }
        })
      }
      else {
        wx.request({
          url: 'https://lancai.zekdot.com:8013/conWall/comComment',
          method: 'POST',
          header: header,
          data: {
            isFirst: that.data.isFirst,
            comId: that.data.comid,
            content: that.data.hf
          },
          success: function (res) {
            app.showSuccessToast('回复成功！', 800)
            that.setData({
              curid: 0,
              inputValue: null,
              comments: [],
              hf: null,
            })
            that.getmessage(that.data.curid)
          }
        })
      }
    }
    
  },
  getmore:function(e){
    let comid=e.target.dataset.id
    let idx = e.target.dataset.idx
    let l = comid.secondComment.length
    this.getmoresecond(comid.secondComment[l-1].id, comid.id, idx)
  },
  previewImage: function (e) {
    let urls = [];
    urls[0] = "https://lancai.zekdot.com:8013/" +this.data.headitem.picUrl;
    wx.previewImage({
      urls: urls
    })
  }, 
})