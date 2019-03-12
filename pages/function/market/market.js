// pages/function/market/market.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: null,
    goods:[],
    clickid : 0,
    curid:0,
    showModalStatus: false
  },
  /**
   * 页面加载
   */
  onLoad:function(){

    app.showLoadToast('加载中', 1200);
    this.getType();
    
  },
  onShow:function(){
    this.setData({
      curid:0,
      goods:[]
    })
    let typeid = Number(this.data.clickid);
    this.getGoods(this.data.curid, typeid);
  },
  /**
   * 获取类型
   */
  getType:function(){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'https://lancai.zekdot.com:8013/fleMar/getAllType',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          tabs: res.data.object
        })
      }
    })
  },
  /**
   * 获取类型商品
   */
  getGoods: function (lastid, typeid){
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8'};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'https://lancai.zekdot.com:8013/fleMar/getAllProduct',
      method: 'POST',
      header: header,
      data:{
        lastId:lastid,
        typeId:typeid
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        wx.hideToast();
        var temp = that.data.goods.concat(res.data.object)
        that.setData({
          goods: temp
        })
        let l = res.data.object.length;
        let cid = res.data.object[l - 1].id;
        if (l==0) {
          that.setData({
            remind: '没有更多啦！',
            more: false
          })
        } else if (l - 1 < 19) {
          that.setData({
            curid: cid,
            remind: '没有更多啦！',
            more: false
          })
        }else {
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
   * 改变选项
   */
  tabClick:function(e){
    this.setData({
      curid:0,
      clickid: e.currentTarget.id,
      goods:[]
    })
    let typeid = Number(this.data.clickid) ;
    this.getGoods(this.data.curid,typeid)
  },
  //上滑加载更多
  loadmore: function () {
    app.showLoadToast('加载中', 600);
    let typeid = Number(this.data.clickid);
    if (this.data.more) {
      this.getGoods(this.data.curid,typeid);
    }
  },
  /**
   * 动画
   */
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    let index = e.currentTarget.id
    if(currentStatu == "open"){
      this.setData({
        temp: this.data.goods[index]
      })
    }
    
  },
  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    this.animation = animation;
    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation
      })

      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  jumpmine:function(){
    wx.navigateTo({
      url: '../market/mine/mine',
    })
  },
  jumprelease: function () {
    wx.navigateTo({
      url: '../market/release/release',
    })
  },
  sousuoinput: function (e) {
    this.setData({
      findcon: e.detail.value
    })
  },
  sousuo:function(){
    let tmp = this.data.findcon;
    wx.navigateTo({
      url: '../market/find/find?findcon=' + tmp,
    })
  },
  previewImage: function (e) {
    let curr = e.target.dataset.index;
    let urls = this.data.temp.pic;
    let l = this.data.temp.pic.length;
    for (let i = 0; i < l; i++){
      urls[i] = "https://lancai.zekdot.com:8013/" + urls[i];
    }
    
    wx.previewImage({
      urls: urls,
      current:urls[curr]
    })
  }, 

})