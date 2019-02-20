// pages/function/confession/showlove/showlove.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadimgs: [],
    editable: false,
    nickname:null,
    fromname:null,
    toname:null,
    con:null,
    isAnonym:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/isRegister',
      method: 'GET',
      header: header,
      success: function (res) {
        console.log(res)
        if (res.data.code == 1) {
          console.log(res)
          wx.navigateTo({
            url: '../matching/matching',
          })
        }
      },
    })
    wx.request({
      url: 'http://119.3.46.32:8014/user/infor',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          nickname: res.data.object.nickname,
          fromname: res.data.object.nickname
        })
      }
    })
    
  },
  /**
   * 输入处理
   */
  frominput:function(e){
    this.setData({
      fromname: e.detail.value
    })
  },
  toinput: function (e) {
    this.setData({
      toname: e.detail.value
    })
  },
  coninput: function (e) {
    this.setData({
      con: e.detail.value
    })
  },
  ischange: function (e) {
    this.setData({
      isAnonym: e.detail.value
    })
  },
  /**
   * 图片处理
   */
  chooseImage: function () {
    let _this = this;
    if (this.data.uploadimgs.length == 0){
      wx.showActionSheet({
        itemList: ['从相册中选择', '拍照'],
        itemColor: "#ef383c",
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
    }
    
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      count: 1,
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
    var index = e.target.dataset.index;
    this.data.uploadimgs.splice(index, 1)
    this.setData({
      uploadimgs: this.data.uploadimgs
    })
  },
  
  /**
   * 提交
   */
  submit:function(){
    app.showLoadToast('发布中', 3000);
    var isok = true;
    var uid = null;
    var url = null;
    if(this.data.fromname == null || this.data.toname ==null){
      app.showErrorModal('发帖失败', "姓名不能为空")
    }else if (this.data.con == null){
      app.showErrorModal('发帖失败', "内容不能为空")
    }else{
      var that = this;
      let cookie = wx.getStorageSync('cookieKey');
      let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
      if (cookie) {
        header.Cookie = cookie
      }
      /**
       * 上传基本信息
       */
      wx.request({
        url: 'http://119.3.46.32:8014/conWall/insertConfession',
        method: 'POST',
        header: header,
        data: {
          isAnonym: !that.data.isAnonym,
          src: that.data.fromname,
          dst: that.data.toname,
          desc: that.data.con
        },
        success: function (res) {
          console.log("上传信息");
          console.log(res);
          if(that.data.uploadimgs.length>=1){
            uid = res.data.object
            isok = that.subphoto(uid);
          }else{
            isok = true;
          }
        },
        fail:function(res){
          isok = false;
        }
      })
      if (isok) {
        app.showSuccessToast('发布成功')
        wx.navigateBack({
          delta: 1
        })
      } else {
        app.showErrorModal('发布失败', '发布失败')
      }
    }
  },
  /**
   * 上传图片
   */
  subphoto: function (uid) {
    var that = this;
    var temp;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'multipart/form-data' };
    if (cookie) {
      header.Cookie = cookie
    }
    let imgs = this.data.uploadimgs;
    console.log("uid :" + uid);
    wx.uploadFile({
      url: 'http://119.3.46.32:8014/conWall/uploadPic',
      filePath: imgs[0],
      header: header,
      name: "file",
      success(res) {
        var url = (JSON.parse(res.data)).object;
        console.log("上传图片")
        console.log(res);
        return that.bindall(uid, url);
      },
      fail: function (res) {
        return false
      }
    })
  },
  /**
   * 绑定图片文字
   */
  bindall: function (uid,url) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    console.log("uid :" + uid);
    console.log("url :" + url);
    wx.request({
      url: 'http://119.3.46.32:8014/conWall/updatePic',
      method: 'POST',
      header: header,
      data: {
        conId: uid,
        url: url
      },
      success: function (res) {
        wx.hideLoading();
        return true;
      },
      fail: function (res) {
        return false;
      }
    })
  }
  
})