// pages/cart/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    showMsg:true,
    carts: [
      {
        title: "纯正文山30头三七",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 260,
        sale: 120,
        ad: 30,
        comment: 4.5,
        unit: "元/500g",
        img: "goods3.jpg",
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
    var that = this;
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD
    });
    //app.setCssStyle();
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
   * 清空购物车
   */
  clearCart:function(){
    wx.showModal({
      title: "操作提示",
      content: "确定清空购物车?",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  /**
   * 删除购物车
   */
  cancelCart: function () {
    wx.showModal({
      title: "操作提示",
      content: "确定清空购物车?",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
})