// pages/function/market/find/find.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    curid: 0,
    showModalStatus: false
  },
  /**
   * 页面加载
   */
  onLoad: function (options) {
    app.showLoadToast('搜索中', 3000);
    this.setData({
      findcon: options.findcon,
    })
    this.sousuo();
  },
  /**
   * 获取类型商品
   */
  getGoods: function (findcon, curid) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/fleMar/findProduct',
      method: 'POST',
      header: header,
      data: {
        key: findcon,
        lastId: curid
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
        if (l == 0) {
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
  loadmore: function () {
    app.showLoadToast('加载中', 1200);
    let typeid = Number(this.data.clickid) + 1;
    if (this.data.more) {
      this.getGoods(this.data.curid, typeid);
    }
  },
  /**
   * 动画
   */
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    let index = e.currentTarget.id
    if (currentStatu == "open") {
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
  /**
   * 搜索
   */
  sousuoinput:function(e){
    this.setData({
      findcon:e.detail.value
    })
  },
  sousuo: function () {
    this.setData({
      curid:0,
      goods:[]
    })
    this.getGoods(this.data.findcon,this.data.curid)
  },
  previewImage: function (e) {
    let curr = e.target.dataset.index;
    let urls = this.data.temp.pic;
    let l = this.data.temp.pic.length;
    for (let i = 0; i < l; i++) {
      urls[i] = "http://119.3.46.32:8014/" + urls[i];
    }

    wx.previewImage({
      urls: urls,
      current: urls[curr]
    })
  },

})