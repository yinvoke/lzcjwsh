// pages/function/confession/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{ id: '二狗', nickname: '刘薇', avatar: "/assets/core/aides.png", time: "3分钟前", text: '我是二狗，我爱你！', original_pic:"/images/1.jpg",likenum:60,commentnum:12},
    comments: [
      { 
        id: '李毛毛', avatar: "/assets/core/user.png", time: "5分钟前", text: '哦是吗？',
        comments: [
          { id: '怂文', content: '哦是啊' },
          { id: '怂文', content: '哦是啊!' },
          { id: '怂文', content: '哦是啊!!' },
          { id: '怂文', content: '哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!哦是啊!!!' },
        ]
      },
      { id: '柴死狗', avatar: "/assets/core/market.png", time: "3分钟前", text: '太惨了'},
      { id: '马小吊', avatar: "/assets/core/user.png", time: "3分钟前", text: '我才是你的！！！！！！'},
      { id: '怂文', avatar: "/assets/core/market.png", time: "3分钟前", text: '真实！' },
    ],
    islike:false,
    touser:"楼主"
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
   * 喜欢
   */
  likedislike: function(){
    this.setData({
      islike : !this.data.islike
    })
  },

  /**
   * 更改评论用户
   */
  toBtn:function(e){
    console.log(e.target.dataset.id);
    this.setData({
      touser: e.target.dataset.id
    })
  }
})