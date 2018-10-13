//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    indicatorDots: false,
    vertical: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    tabShow: false,//广告栏是否指定
    css: app.globalData.css,
    AD: app.globalData.AD,
    ad_package: app.globalData.ad_package,
    ad_minus: app.globalData.ad_minus,
    hots: [],
    plans:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function(){
    app.setCssStyle();
  },
  onLoad: function (options) {
    var that = this;
    var host=app.globalData.host;
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD
    });
    
    //读取热门商品
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "getList",
        ishot: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var hots=that.data.hots;
        hots=res.data;
        that.setData({
          hots:hots
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
    //读取促销商品
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "getList",
        issale: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var plans = that.data.plans;
        plans = res.data;
        that.setData({
          plans: plans
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
    })
  },
})
