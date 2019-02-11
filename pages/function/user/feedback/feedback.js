// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    description:null,
    qq:null,
    uploadimgs:[],
    editable:false
  },
  /**
   * 图片处理
   */
  chooseImage: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#1488CC",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count:3,
      success: function (res) {
        _this.setData({
          uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
        })
      }
    })
    this.setData({
      editable: true
    })
  },
  deleteImg: function (e) {
    console.log(e.target.dataset.index);
    var index = e.target.dataset.index;
    this.data.uploadimgs.splice(index,1)
    this.setData({
      uploadimgs: this.data.uploadimgs
    })
  },

  /**
   * 内容读取
   */
  wti: function(e){
    this.setData({ description:e.detail.value})
  },
  qqi: function (e) {
    this.setData({ qq: e.detail.value })
  },

  /**
   * 内容提交
   */
  submit:function(){
    app.showSuccessToast('提交成功',3000)
  }

})