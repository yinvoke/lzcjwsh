// pages/function/market/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [
      {
        id: 1,
        goodsname: '辣条',
        description: '随便卖卖',
        chengse: 2,
        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549714849566&di=453901d661ceffa9cd7bf9c169431ec2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F03%2F20150103224114_SyVRt.thumb.700_0.png',
        price: '23.5',
        tel: '15616152768',
        qq: '23456789',
        time:'2018-10-1',
        issale:false
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
        time: '2018-10-1',
        issale: false
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
        time: '2018-10-1',
        issale: false
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  sale:function(e){
    var id = e.currentTarget.id;
    var up = "goods[" + id + "].issale";
    this.setData({
      [up] :true
    })
  }
})