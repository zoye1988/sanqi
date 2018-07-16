// pages/me/bill/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: "all",
    css: app.globalData.css,
    AD: app.globalData.AD,
    bills: [
      {
        bid: 1,
        bcode: "CGT011023123",
        price: 450.00,
        time: "2018-01-02",
        status: "pay",
      },
      {
        bid: 2,
        bcode: "CGT011023123",
        price: 450.00,
        time: "2018-01-02",
        status: "ready",
      },
      {
        bid: 3,
        bcode: "CGT011023123",
        price: 450.00,
        time: "2018-01-02",
        status: "receive",
      },
      {
        bid: 4,
        bcode: "CGT011023123",
        price: 450.00,
        time: "2018-01-02",
        status: "delay",
      }
    ]
  },

  swichNav: function (e) {
    var _current = e.currentTarget.dataset.current;
    this.setData({
      currentTab: _current
    })
  },

  delBill:function(e){
    var that=this;
    var dcode = e.currentTarget.dataset.dcode;
    var bills=this.data.bills;
    var _bills=[];
    wx.showModal({
      title: "操作提示",
      content: "确定删除此订单?",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          for (var bt in bills) {
            if (dcode != bills[bt].dcode) {
              _bills.push(bills[bt])
            }
          }
          that.setData({
            bills: _bills
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /*
  swichNav
  */

})