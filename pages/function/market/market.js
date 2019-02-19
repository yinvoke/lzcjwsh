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
    
    this.getType();
    
  },
  onShow:function(){
    
    let typeid = Number(this.data.clickid)+1;
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
      url: 'http://119.3.46.32:8014/fleMar/getAllType',
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
    app.showLoadToast('加载中', 1200);
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8'};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/fleMar/getAllProduct',
      method: 'POST',
      header: header,
      data:{
        lastId:lastid,
        typeId:typeid
      },
      success: function (res) {
        wx.hideToast();
        console.log(res)
        var temp = that.data.goods.concat(res.data.object)
        that.setData({
          goods: temp
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

  /**
   * 改变选项
   */
  tabClick:function(e){
    this.setData({
      curid:0,
      clickid: e.currentTarget.id,
      goods:[]
    })
    let typeid = Number(this.data.clickid) +1;
    this.getGoods(this.data.curid,typeid)
  },
  //上滑加载更多
  loadmore: function () {
    let typeid = Number(this.data.clickid) + 1;
    if (this.data.more) {
      this.getGoods(this.data.curid,typeid);
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    this.setData({
      curid: 0,
      goods: []
    });
    let typeid = Number(this.data.clickid) + 1;
    this.getGoods(this.data.curid, typeid)
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
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示
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
  sousuo:function(){
    app.showErrorModal('抱歉暂未启用此功能','搜索失败')
  }

})