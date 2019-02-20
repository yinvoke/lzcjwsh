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
    tindex: 0
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
        let temp = res.data.object;
        temp.shift();
        console.log(temp)
        that.setData({
          tabs:temp
        })
      }
    })
  },
  /**
   * 图片处理
   */
  chooseImage: function () {
    let _this = this;
    if(this.data.uploadimgs.length<=2){
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
    }
    
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
    app.showLoadToast('发布中',6000)
    var uid = null;
    var url = null;
    let typeid = Number(this.data.tindex) + 1;
    if (this.data.name == null || this.data.price == null || this.data.quan == null || this.data.desc == null || this.data.con == null) {
      app.showErrorModal("不能有信息为空", '发帖失败')
    } else if(this.data.uploadimgs.length == 0){
      app.showErrorModal("至少上传一张图片", '发帖失败')
    } else if (Number(this.data.quan) < 1 || Number(this.data.quan) > 10) {
      app.showErrorModal("成色填写不符合规范", '发帖失败')
    } else {
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
          let imgs = that.data.uploadimgs;
          let uid = res.data.object;
          that.subphotos({
            uid:uid,
            urls:[],
            path:imgs
          });
        },
        fail: function (res) {
          app.showErrorModal('发布失败', '发布失败')
        }
      })
    }
  },
  /**
   * 上传图片
   */
  subphotos: function (data) {
    console.log(data);
    var that = this;
    let i = data.i ? data.i : 0;//当前上传的哪张图片
    let success = data.success ? data.success : 0;//上传成功的个数
    let fail = data.fail ? data.fail : 0;//上传失败的个数
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'multipart/form-data' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.uploadFile({
      url: 'http://119.3.46.32:8014/fleMar/uploadPic',
      filePath: data.path[i],
      header: header,
      name: "file",
      success: (resp) => {
        console.log(resp)
        success++;
        let url = (JSON.parse(resp.data)).object;
        data.urls = data.urls.concat(url)
      },
      fail: (res) => {
        console.log(res)
        fail++;
      },
      complete: () => {
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用          
          console.log('执行完毕');
          console.log('成功：' + success + " 失败：" + fail);
          that.bindall(data)
        } else {//若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.subphotos(data);
        }
      }
    })
  },
  /**
   * 绑定图片文字
   */
  bindall: function (data) {
    let uid = data.uid;
    let urls = data.urls;
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
        console.log(res);
        app.showSuccessToast('发布成功', 1000)
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function (res) {
        app.showErrorModal('发布失败', '发布失败')
      }
    })
  }
})