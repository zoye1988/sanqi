// pages/me/address/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    status:true,
    lists: [
      {
        id: 1,
        uname: "邓恒静",
        uphone: "15288653843",
        address: "云南省曲靖市麒麟区建宁东路880号",
        checked: false
      },
      {
        id: 2,
        uname: "邓恒静",
        uphone: "15288653843",
        address: "云南省曲靖市麒麟区建宁东路880号",
        checked: true
      },
      {
        id: 3,
        uname: "邓恒静",
        uphone: "15288653843",
        address: "云南省曲靖市麒麟区建宁东路880号",
        checked: false
      }
    ]
  },
  /**
   * 更新默认地址
   */
  updateAddress: function (e) {
    var current = e.target.dataset.index;
    var lists = this.data.lists;
    for (var bt in lists) {
      if (current == lists[bt].id) {
        lists[bt].checked = true;
      } else {
        lists[bt].checked = false;
      }
    }
    this.setData({
      lists: lists
    });
  },
  /**
   * 删除默认地址
   */
  delAddress: function (e) {
    var that=this;
    var current = e.target.dataset.index;
    var _lists = this.data.lists;
    var lists = [];
    wx.showModal({
      title: "操作提示",
      content: "确定删除此地址?",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          for (var bt in _lists) {
            if (current != _lists[bt].id) {
              lists.push(_lists[bt])
            }
          }
          that.setData({
            lists: lists
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
  newAddress:function(){
    var status=this.data.status;
    if(status==true){
      status=false;
    }else{
      status=true;
    }
    this.setData({
      status:status
    });
  },
  postAddress:function(){
    this.newAddress();
  }
})