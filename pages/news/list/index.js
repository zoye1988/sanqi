// pages/news/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    news:[         //指定广告位
      { nid: 1, title: "人参之王三七的药理作用及功效应用", img: "news4.jpg", like: 100,visit:200,time:'2018-02-15',keywords:['三七花','高血压','高血脂','高血糖'] },
      { nid: 2, title: "99.99%的人都傻傻分不清春三七和冬三七", img: "news2.jpg", like: 50, visit: 300, time: '2018-02-32', keywords: ['三七粉', '心脏病', '功效'] },
      { nid: 2, title: "人参之王三七治一切血液病", img: "news3.jpg", like: 50, visit: 300, time: '2018-02-32',keywords: ['三十头', '四十头', '区别'] },
      { nid: 2, title: "人参之王三七的药理作用及功效应用", img: "news1.jpg", like: 50, visit: 300, time: '2018-02-32', keywords: ['丹参', '山楂', '三七粉'] },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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