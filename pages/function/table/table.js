// pages/table/table.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*semesters: ["2019-2020学年春季学期", "2019-2020学年秋季学期"],
    semesterIndex: 0,*/
    weeks: ["第一周", "第二周", "第三周", "第四周", "第五周", "第六周", "第七周", "第八周", "第九周", "第十周", "第十一周", "第十二周", "第十三周", "第十四周", "第十五周", "第十六周", "第十七周"],
    weekIndex: 0,
    colorArrays: ["#ffc09f", "#fce38a", "#eaffd0", "#95e1d3", "#FE8F92"],
    showModalStatus: false,
    wlist: [],
    ishidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(wx.getStorageSync('jwpwd')){
      var timestamp = Date.parse(new Date());
      var temp = (timestamp / 1000 - 1551024000) / 60 / 60 / 24;
      var now = parseInt(temp / 7)+1;
      this.setData({
        weekIndex: now-1,
        ishidden:false,
        jwpwd: wx.getStorageSync('jwpwd')
      })
      let refresh = false;
      this.getclass(now, refresh)
    }
  
  },


  getclass: function(now, refresh) {
    console.log("now" + now)
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/priSyllabus/getAll',
      method: 'POST',
      header: header,
      data: {
        password: that.data.jwpwd,
        refresh: refresh,
        weekNum: now
      },
      success: function(res) {
        if(res.data.code ==0){
          console.log(res)
          that.setData({
            wlist: res.data.object
          })
        }else{
          console.log(res)
          app.showErrorModal(res.message, '更新失败')
        }
      },
      fail: function(res) {
        console.log(res)
        app.showErrorModal(res.message, '更新失败')
      }
    })
  },

  /**
   * 设置学期
   */
  /*bindSemesterChange: function(e) {
    this.setData({
      semesterIndex: e.detail.value
    })
  },*/

  /**
   * 设置星期
   */
  bindWeekChange: function(e) {
    this.setData({
      weekIndex: e.detail.value
    })
    this.getclass(Number(this.data.weekIndex)+1, false)
  },
  /**
   * 刷新
   */
  refresh:function(){
    app.showLoadToast('同步中', 1200)
    this.getclass(Number(this.data.weekIndex) + 1, true)
  },
  /**
   * 绑定
   */
  jwinput:function(e){
    this.setData({
      jwpwd: e.detail.value
    })
  }, 
  bind:function(e){
    var timestamp = Date.parse(new Date());
    var temp = (timestamp / 1000 - 1550332800) / 60 / 60 / 24;
    var now = parseInt(temp / 7)+1;
    console.log('now:' + now)
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/priSyllabus/getAll',
      method: 'POST',
      header: header,
      data: {
        password: that.data.jwpwd,
        refresh: false,
        weekNum: now
      },
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res)
          app.showSuccessToast('绑定成功', 1000)
          wx.setStorageSync('jwpwd', that.data.jwpwd)
          that.setData({
            wlist: res.data.object,
            ishidden:false
          })
        } else {
          app.showErrorModal(res.message, '绑定失败')
        }
      },
      fail: function (res) {
        app.showErrorModal(res.message, '绑定失败')
      }
    })
  },
  /**
   * 动画
   */
  powerDrawer: function(e) {
    console.log(this.data.wlist[e.target.dataset.index])
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    if (currentStatu == "open") {
      let t = this.data.wlist[e.target.dataset.index];
      t.lessons_time = Number(t.lessons_time) + Number(t.lessons_start);
      console.log(t)
      this.setData({
        temp: t
      })
    }

  },
  util: function(currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
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
    setTimeout(function() {
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
})