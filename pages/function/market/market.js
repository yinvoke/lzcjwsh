// pages/function/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      '推荐', '图书', '电器', '手机', '电脑', '衣服', '鞋', '饰品', '包', '化妆品', '日用品', '食品', '票务', '其他'
    ],
    goods:[
      {
        id:1,
        goodsname:'辣条',
        description:'随便卖卖',
        chengse:2,
        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549714849566&di=453901d661ceffa9cd7bf9c169431ec2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F03%2F20150103224114_SyVRt.thumb.700_0.png',
        price:'23.5',
        tel:'15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 2,
        goodsname: '雨伞',
        description: '随便卖卖',
        chengse: 1,
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '100',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 3,
        goodsname: '耳机',
        description: '随便卖卖',
        chengse: 7,
        src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4292726090,2886192673&fm=26&gp=0.jpg',
        price: '299',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 4,
        goodsname: 'dog',
        description: '随便卖卖',
        chengse: 10,
        src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2287990384,2843615090&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 5,
        goodsname: '雨伞',
        description: '随便卖卖',
        chengse: 7,
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 6,
        goodsname: '雨伞',
        despription: 9,
        chengse: 7,
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 7,
        goodsname: '雨伞',
        description: '随便卖卖',
        chengse: 7,
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: 10,
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 8,
        goodsname: '雨伞',
        description: '随便卖卖',
        chengse: 6,
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 9,
        goodsname: '雨伞',
        description: '随便卖卖',
        chengse: 5,
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 10,
        goodsname: '雨伞',
        description: '随便卖卖',
        chengse: 6,
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
      {
        id: 11,
        goodsname: '雨伞',
        description: '爱神的箭空喊口号文化苦旅为了就离开是捡垃圾了就两节课了巨额局看来今晚来睡觉考虑将来晚了巨款了继往开来拉开距离金额来看捡垃圾了爱神的箭空喊口号文化苦旅为了就离',
        chengse: 7,
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789',
        time: '2018-10-10',
      },
    ],
    clickid : 0,
    clickitem : '推荐',
    showModalStatus: false
  },
  /**
   * 改变颜色
   */
  tabClick:function(e){
    this.setData({
      clickid: e.currentTarget.id,
      clickitem: this.data.tabs[e.currentTarget.id]
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  fatie:function(){
    
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
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
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
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
  }

})