const app = getApp();
// pages/list/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    lists: [
      {
        title: "纯正文山30头三七",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 260,
        sale: 120,
        ad: 30,
        comment: 4.5,
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
        comment: 4.5,
        unit: "20片/盒",
        img: "goods.png",
        id: 2
      },
      {
        title: "三七牙膏",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 20,
        sale: 0,
        ad: 1,
        comment: 4.5,
        unit: "100g/盒",
        img: "goods2.png",
        id: 3
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setCssStyle();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})