// pages/table/table.js
Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    semesters: ["2019-2020学年春季学期","2019-2020学年秋季学期"],
    semesterIndex:0,
    weeks:["第一周","第二周","第三周","第四周","第五周","第六周","第七周","第八周","第九周","第十周","第十一周","第十二周","第十三周","第十四周","第十五周","第十六周","第十七周"],
    weekIndex:0,
    colorArrays: ["#a1b3cf", "#6f83ad", "#f3f8ed", "#d4d9db", "#97b9d8", "#c1d9ea", "#dcecf2", "#c1d9ea"],
    wlist: [
      { "xqj": 1, "skjc": 1, "skcd": 3, "kcmc": "高等数学@教A-303" },
      { "xqj": 1, "skjc": 10, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 2, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 2, "skjc": 8, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 3, "skjc": 4, "skcd": 1, "kcmc": "高等数学@教A-301" },
      { "xqj": 3, "skjc": 8, "skcd": 1, "kcmc": "高等数学@教A-301" },
      { "xqj": 3, "skjc": 5, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 4, "skjc": 2, "skcd": 3, "kcmc": "高等数学@教A-301" },
      { "xqj": 4, "skjc": 10, "skcd": 12, "kcmc": "高等数学@教A-301" },
      { "xqj": 5, "skjc": 1, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 6, "skjc": 3, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 6, "skjc": 5, "skcd": 2, "kcmc": "高等数学@教A-301" },
      { "xqj": 7, "skjc": 5, "skcd": 3, "kcmc": "高等数学@教A-301" },
    ]
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 设置学期
   */
  bindSemesterChange: function (e) {
    this.setData({
      semesterIndex:e.detail.value
    })
  },

  /**
   * 设置星期
   */
  bindWeekChange: function(e) {
    this.setData({
      weekIndex:e.detail.value
    })
  }
})