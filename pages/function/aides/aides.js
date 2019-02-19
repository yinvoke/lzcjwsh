//xs.js
//获取应用实例
var app = getApp();

Page({
  data: {
    header: {
      inputValue: ''
    },
    main: {
      mainDisplay: true, // main 显示的变化标识
      total: 0,
      sum: 0,
      curid: 0,
      message: '上滑加载更多'
    },
    testData: [
    ],
    messageObj: { // 查询失败的提示信息展示对象
      messageDisplay: true,
      message: ''
    }
  },

  bindClearSearchTap: function (e) {
    this.setData({
      'main.mainDisplay': true,
      'main.total': 0,
      'main.sum': 0,
      'main.curid': 0,
      'main.message': '',
      'testData': [],
      'header.inputValue': ''
    });
  },

  bindSearchInput: function (e) {
    this.setData({
      'header.inputValue': e.detail.value,
      'main.total': 0,
      'main.sum': 0,
      'main.curid': 0,
      'main.message': '上滑加载更多',
      'testData': []
    });
    if (!this.data.messageObj.messageDisplay) {
      this.setData({
        'messageObj.messageDisplay': true,
        'messageObj.message': ''
      });
    }
    return e.detail.value;
  },

  // 点击搜索
  bindConfirmSearchTap: function () {
    this.setData({
      'main.total': 0,
      'main.sum': 0,
      'main.curid': 0,
      'main.message': '上滑加载更多',
      'testData': []
    });
    this.search();
  },

  // 上滑加载更多
  onReachBottom: function () {
    if (this.data.main.message != '已全部加载' && this.data.main.message != '正在加载中') {
      this.search();
    }
  },

  // 搜索
  search: function () {
    var that = this;
    var inputValue = that.data.header.inputValue,
      messageDisplay = false,
      message = '',
      reDdata = null,
      numberSign = false; // 用户输入的是姓名还是学号的标识
    // 消除字符串首尾的空格
    function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    }
    inputValue = trim(inputValue);
    // 抽离对messageObj的设置成一个单独的函数
    function setMessageObj(messageDisplay, message) {
      that.setData({
        'messageObj.messageDisplay': messageDisplay,
        'messageObj.message': message
      });
    }
    // 对输入的是空格或未进行输入进行处理
    if (inputValue === '') {
      this.setData({
        'main.mainDisplay': true
      });
      return false;
    }
    // 防止注入攻击
    function checkData(v) {
      var temp = v;
      v = v.replace(/\\|\/|\.|\'|\"|\<|\>/g, function (str) { return ''; });
      v = trim(v);
      messageDisplay = v.length < temp.length ? false : true;
      message = '请勿输入非法字符!';
      return v;
    }
    // 对输入进行过滤
    inputValue = checkData(inputValue);
    setMessageObj(messageDisplay, message);
    this.setData({
      'header.inputValue': inputValue
    });
    // 存在非法输入只会提示错误消息而不会发送搜索请求
    if (messageDisplay === false) {
      app.showErrorModal('请勿输入非法字符', '警告')
      return false;
    }

    // 处理成功返回的数据
    function doSuccess(data, messageDisplay) {
      console.log(data)
      // 若data===false, 查询没有结果
      if (data === false) {
        return false;
      }
      that.setData({
        'main.curid':data[data.length-1].id,
        'testData': that.data.testData.concat(data),
        'main.mainDisplay': false,
        'main.total': data.length,
        'main.sum': that.data.main.sum + data.length,
        'messageObj.messageDisplay': messageDisplay,
      });
      wx.hideToast();
      if (data.length === 1) {
        that.bindOpenList(0);
      }

      if (data.total <= 20) {
        that.setData({
          'main.message': '已全部加载'
        });
      }

    }

    // 处理没找到搜索到结果或错误情况
    function doFail(err) {
      var message = typeof err === 'undefined' ? '未搜索到相关结果' : err;
      setMessageObj(false, message);
      app.showErrorModal(message, '出错啦~')
    }

    that.setData({
      'main.message': '正在加载中',
      'main.curid': that.data.main.curid
    });
    app.showLoadToast('搜索中',3000);
    let cookie = wx.getStorageSync('cookieKey');
    let header = { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' };
    if (cookie) {
      header.Cookie = cookie
    }
    wx.request({
      url: 'http://119.3.46.32:8014/syllabus/querySyllabus',
      method: 'POST',
      header:header,
      data: {
        name: that.data.header.inputValue,
        teacher: null,
        room: null,
        id: that.data.main.curid
      },
      success: function (res) {
        console.log(res)
        if (res.data.object.length==0 && that.data.main.sum==0){
          let ttt = '抱歉，没有搜索到哦~';
          wx.hideToast();
          doFail(ttt)
        }else if(res.data.object.length==20){
          that.setData({
            'main.message': '上滑加载更多',
          });
        }else{
          that.setData({
            'main.message': '已全部加载',
          });
        }
        if (res.data.code == 0) {
          doSuccess(res.data.object, true);
        } else {
          wx.hideToast();
          doFail(res.data.message);
        }
      },
      fail: function (res) {
        wx.hideToast();
        doFail(res.data.message);
      }
    });

  },

  // main——最优
  bindOpenList: function (e) {
    var index = !isNaN(e) ? e : parseInt(e.currentTarget.dataset.index),
      data = {};
    data['testData[' + index + '].display'] = !this.data.testData[index].display;
    this.setData(data);
  },

  onLoad: function () {
    this.setData({
      'main.mainDisplay': false,
    });
    this.search();
  }
});