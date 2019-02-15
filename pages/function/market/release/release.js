// pages/function/market/Release/release.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploadimgs: [],
    editable: false,
    tabs:[],
    tindex: 0,

  },
  /**
   * 页面加载
   */
  onLoad:function(){
    this.getType()
  },
  /**
   * 获取类型
   */
  getType: function () {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = {};
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/fleMar/getAllType',
      method: 'GET',
      header: header,
      success: function (res) {
        that.setData({
          tabs: res.data.object
        })
      }
    })
  },
  /**
   * 图片处理
   */
  chooseImage: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#7acfa6",
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
      count: 3,
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
   * 输入处理
   */
  sname: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  sprice: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
  squan: function (e) {
    this.setData({
      quan: e.detail.value
    })
  },
  sdesc: function (e) {
    this.setData({
      desc: e.detail.value
    })
  },
  scon: function (e) {
    this.setData({
      con: e.detail.value
    })
  },
  stype: function (e) {
    this.setData({
      tindex: e.detail.value
    })
  },
  /**
   * 提交
   */
  submit: function () {
    var isok = true;
    var uid = null;
    var url = null;
    let typeid = Number(this.data.tindex) + 1;
    console.log("typeid" + typeid);
    if (this.data.name == null || this.data.price == null || this.data.quan == null || this.data.desc == null || this.data.con == null) {
      app.showErrorModal("不能有信息为空", '发帖失败')
    } else if(this.data.uploadimgs.length == 0){
      app.showErrorModal("至少上传一张图片", '发帖失败')
    }else {
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
        url: 'http://119.3.46.32:8014/fleMar/subProduct',
        method: 'POST',
        header: header,
        data: {
          name: that.data.name,
          quality: that.data.quan,
          price: that.data.price,
          contact: that.data.con,
          type: typeid,
          content: that.data.desc,
        },
        success: function (res) {
          console.log("上传信息");
          console.log(res);
          uid = res.data.object
          isok = that.subphoto(uid);
        },
        fail: function (res) {
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
    var urls = [];
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'multipart/form-data' };
    if (cookie) {
      header.Cookie = cookie
    }
    let imgs = this.data.uploadimgs;
    let l = imgs.length;
    for(var i = 0; i < l; i++){
      console.log('正在上传第'+ i +'张图片')
      wx.uploadFile({
        url: 'http://119.3.46.32:8014/fleMar/uploadPic',
        filePath: imgs[i],
        header: header,
        name: "file",
        success(res) {
          var url = (JSON.parse(res.data)).object;
          console.log("上传图片")
          console.log(res);
          console.log("urls=");
          console.log(urls);
          urls[i] = url;
        },
        fail: function (res) {
          return false
        }
      })
    }
    return that.bindall(uid, urls);
  },
  /**
   * 绑定图片文字
   */
  bindall: function (uid, urls) {
    var that = this;
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    console.log("uid :" + uid);
    console.log("urls :" + urls);
    wx.request({
      url: 'http://119.3.46.32:8014/fleMar/updateProduct',
      method: 'POST',
      header: header,
      data: {
        proId: uid,
        picUrl: urls
      },
      success: function (res) {
        console.log('合并');
        console.log(res);
        return true;
      },
      fail: function (res) {
        return false;
      }
    })
  }
})