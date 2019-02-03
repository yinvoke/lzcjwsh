// pages/function/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['推荐', '图书', '电器', '手机', '电脑', '衣服', '鞋', '饰品', '包', '化妆品', '日用品', '食品', '其他'],
    clickid : 0,
    clickitem : '推荐'
  },
  /**
   * 改变颜色
   */
  tabClick:function(e){
    this.setData({
      clickid: e.currectTarget.id,
      clickitem: this.data.tabs[e.currectTarget.id]
    })
  }
  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

})