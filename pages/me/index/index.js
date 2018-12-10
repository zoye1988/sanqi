// pages/me/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    host:app.globalData.host,
    code:wx.getStorageSync("code"),
    wallet: 1990.4,
    lovecount:0,
    openid:"",
    address: "",
    user:app.globalData.user,
    wallet: {
      totals: 1550.50, //销售额
      bonus:500.50, //奖金提成
      sellcount: 15 //销售记录总数
    },
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
    var that = this;
    var host=this.data.host;
    var lovecount=0;
    var _openid = wx.getStorageSync("openid");
    if (_openid != "" && _openid != null) {

    } else {
      _openid = "";
    }
    //读取默认地址
    var _address = wx.getStorageSync("address");
    if (_address == "" || _address == null) {
      _address = "暂无地址数据"
    }
    //读取love总数
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "getLoveCount",
        code: that.data.code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        lovecount=res.data.result;
        that.setData({
          lovecount: lovecount
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
    })
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD,
      openid: _openid,
      address: _address
    });
    app.setCssStyle();
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
  onGotUserInfo:function(e){
    console.log(e.detail.userInfo);
    app.getLogin();
  }
})