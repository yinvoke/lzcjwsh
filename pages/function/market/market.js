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
        goodsname:'图标',
        despription:'这是一个图标',
        price:'23.5',
        tel:'15616152768',
        qq:'23456789'
      
      }
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

})