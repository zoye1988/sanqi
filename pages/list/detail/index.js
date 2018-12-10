// pages/list/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    host: app.globalData.host,
    downloadurl: app.globalData.downloadurl,
    ad_package: app.globalData.ad_package,
    ad_minus: app.globalData.ad_minus,
    // tab切换  
    currentTab: 0,
    defaultHeight: 1000,//H:240,204
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    count: 0,  //购物总数
    comments: 0,
    love: false,
    carts: [],
    good: {
      gid: 3,
      title: "文山七丹药业血栓通(25mg)",
      brief: "这是一款神奇的产品,对'三高'患者有较好的功效。",
      tp: "500g/罐",
      price: 260,
      preprice: 120,
      place: "云南文山",
      sellcount: 0,
      commentcount: 0,
      plan: 0,
      packages: "铝塑封盒",
      imgs: [],                 //封面图片
      descImgs: [],                   //宣传图片和文案
      headimg: "temp.png"
    },
    comment: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host =this.data.host;
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD
    });
    app.setCssStyle();
    //将navrigaterBar名称修改
    var gid = options.gid;
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "getDetail",
        gid: gid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var good = res.data.good;
        that.setData({
          good: good
        });
        wx.setNavigationBarTitle({
          title: good.title
        })
        //读取图片数字的长度，确定swiper的高度
        that.setData({
          defaultHeight: good.descImgs.length * 240,
        });
      },
      fail: function (res) {
        wx.showModal({
          title: "操作异常",
          content: "请检查网络或重启程序,",
          showCancel: false,
          confirmText: "确定"
        })
      }
    });
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "commentList",
        gid: gid,
        page: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var comment = res.data.comment;
        that.setData({
          comment: comment
        });
      },
      fail: function (res) {
        wx.showModal({
          title: "操作异常",
          content: "请检查网络或重启程序,",
          showCancel: false,
          confirmText: "确定"
        })
      }
    });
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "getComment",
        gid: gid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var comments = res.data.count;
        that.setData({
          comments: comments
        });
      },
      fail: function (res) {
        wx.showModal({
          title: "操作异常",
          content: "请检查网络或重启程序,",
          showCancel: false,
          confirmText: "确定"
        })
      }
    });
    //读取收藏的商品
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "getLove",
        gid: gid,
        code: wx.getStorageSync("code")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var result = res.data.result;
        if (result == 1) {
          that.setData({
            love: true
          })
        }
      },
      fail: function (res) {
        wx.showModal({
          title: "操作异常",
          content: "请检查网络或重启程序,",
          showCancel: false,
          confirmText: "确定"
        })
      }
    });
    //读取的商品
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "getCart",
        gid: gid,
        code: wx.getStorageSync("code")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var sum = res.data.sum;
        that.setData({
          count: sum
        })
      },
      fail: function (res) {
        wx.showModal({
          title: "操作异常",
          content: "请检查网络或重启程序,",
          showCancel: false,
          confirmText: "确定"
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 设置收藏
   */
  setLove: function () {
    var that=this;
    var love = this.data.love;
    var gid = this.data.good.gid;
    var host = this.data.host;
    var code = wx.getStorageSync("code");
    //读取cookie中的商品数量

    var title = "";
    if (love == true) {
      love = false;
      title = "取消收藏";
    } else {
      love = true;
      title = "收藏成功"
    }
    if (app.updateLoves(love, code, gid)==0){
      wx.showModal({
        title: "操作异常",
        content: "请检查网络或重启程序,",
        showCancel: false,
        confirmText: "确定"
      })
    }else{
      that.setData({
        love: love
      });
      wx.showToast({
        title: title,
        duration: 1000
      })
    }
  },

  /*
  countPlus
  **/
  countPlus: function () {
    var that=this;
    var count = this.data.count+1;
    that.setData({
      count: count
    });
    if (app.setCount(this.data.good.gid, count,'add') == 0) {
      wx.showModal({
        title: "操作异常",
        content: "请检查网络或重启程序,",
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  /*
  countMinus
  **/
  countMinus: function () {
    var that=this;
    var count = this.data.count-1;
    if (count < 0) {
      count = 0;
    }
    that.setData({
      count: count
    });
    if(app.setCount(this.data.good.gid, count,'minus')==0){
      wx.showModal({
        title: "操作异常",
        content: "请检查网络或重启程序,",
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  moreComment: function () {
    var that = this;
    var gid = that.data.good.gid;
    var host = this.data.host;
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "commentList",
        gid: gid,
        page: that.data.comment.length
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var _comment = res.data.comment;
        var comment = that.data.comment;
        for (var bt in _comment) {
          comment.push(_comment[bt]);
        }
        var _defaultHeight = 30 + that.data.comment.length * 209;
        that.setData({
          comment: comment,
          defaultHeight: _defaultHeight
        });
      },
      fail: function (res) {
        wx.showModal({
          title: "操作异常",
          content: "请检查网络或重启程序,",
          showCancel: false,
          confirmText: "确定"
        })
      }
    });
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
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var current = e.target.dataset.current;
      var _defaultHeight = 0;
      if (current == 0) {
        _defaultHeight = that.data.good.descImgs.length * 240;
      } else if (current == 1) {
        _defaultHeight = 30 + that.data.comment.length * 209;
        console.log("_defaultHeight=" + _defaultHeight);
      }
      this.setData({
        defaultHeight: _defaultHeight,
        currentTab: e.target.dataset.current
      });
    }
  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    var current = e.detail.current;
    var _defaultHeight = 0;
    if (current == 0) {
      _defaultHeight = that.data.good.descImgs.length * 240;
    } else if (current == 1) {
      _defaultHeight = 30 + that.data.comment.length * 209;
    }
    this.setData({
      defaultHeight: _defaultHeight
    });
  },
  /** 
    * 返回首页
    */
  backHome: function () {
    app.backHome();
  },
  /** 
    * 返回购物车
    */
  backCart: function () {
    app.backCart();
  }
})