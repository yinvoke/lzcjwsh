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
        despription:'九成新',
        src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549714849566&di=453901d661ceffa9cd7bf9c169431ec2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F03%2F20150103224114_SyVRt.thumb.700_0.png',
        price:'23.5',
        tel:'15616152768',
        qq:'23456789'
      },
      {
        id: 2,
        goodsname: '雨伞',
        despription: '七成新',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '100',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 3,
        goodsname: '耳机',
        despription: '七成新',
        src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4292726090,2886192673&fm=26&gp=0.jpg',
        price: '299',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 4,
        goodsname: 'dog',
        despription: '全新',
        src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2287990384,2843615090&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 5,
        goodsname: '雨伞',
        despription: '七成新',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 6,
        goodsname: '雨伞',
        despription: '七成新',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 7,
        goodsname: '雨伞',
        despription: '七成新',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 8,
        goodsname: '雨伞',
        despription: '七成新',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 9,
        goodsname: '雨伞',
        despription: '七成新',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 10,
        goodsname: '雨伞',
        despription: '七成新',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789'
      },
      {
        id: 11,
        goodsname: '雨伞',
        despription: '七成新',
        src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1735037410,1830000647&fm=26&gp=0.jpg',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789'
      },
    ],
    clickid : 0,
    clickitem : '推荐'
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
    
  }

})