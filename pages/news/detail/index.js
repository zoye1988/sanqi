
// pages/news/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    ad_package: app.globalData.ad_package,
    ad_minus: app.globalData.ad_minus,
    news: {
      nid: 1,
      title: "",
      cover: "news2.jpg",
      brief: "", //卷首语
      love: 0,
      viewer: 0,
      keywords: [],
      time: "",
      contents: []
    },
    goods: [
      {
        title: "纯正文山30头三七",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 260,
        sale: 120, 
        ad: 30,
        unit: "元/500g",
        img: "hot.jpg",
        id: 1
      },
      {
        title: "血栓通片（250毫克）",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 800,
        sale: 600,
        ad: 10,
        unit: "20片/盒",
        img: "goods.png",
        id: 2
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var nid=options.nid;
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD
    });
    app.setCssStyle();
    wx.request({
      url: host + "news.do",
      method: "post",
      data: {
        method: "getDetail",
        nid:nid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var news = res.data.news;
        that.setData({
          news: news
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toChat:function(){
    wx.navigateTo({
      url: '../../me/servicer/customer/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})