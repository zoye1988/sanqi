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
    location:"",
    uname:"",
    uphone:"",
    lat:"",
    lng:"",
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
<<<<<<< HEAD
      },
      {
        id: 3,
        uname: "邓恒静",
        uphone: "15288653843",
        address: "云南省曲靖市麒麟区建宁东路880号",
        checked: false
=======
>>>>>>> 56f657d63e03719532aee94266b789cae7514de9
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
  /*
    提交新地址请求
  */
  postAddress:function(){
    var uname=this.data.uname;
    var location=this.data.location;
    var uphone=this.data.uphone;
    var lists=this.data.lists;
    if(uname==null || uname=="" ){
      wx.showModal({
        title: "错误提示",
        content: "请检查收货人姓名",
        showCancel: false,
        confirmText: "确定",
      })
      return;
    } else if (uphone == null || uphone == "" || uphone.length<11) {
      wx.showModal({
        title: "错误提示",
        content: "请检查收货人联系电话",
        showCancel: false,
        confirmText: "确定",
      })
      return;
    } else if (location == null || location == "") {
      wx.showModal({
        title: "错误提示",
        content: "请检查收货人地址",
        showCancel: false,
        confirmText: "确定",
      })
      return;
    }
    var newAddress={
      id: 3,
      uname: uname,
      uphone: uphone,
      address: location,
      checked: false
    };
    lists.push(newAddress);
    this.setData({
      lists:lists
    });
    this.newAddress();
  },

  /**
   * 选择地址
   */
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          lng: res.longitude,//读取地址数据
          lat: res.latitude,//读取地址数据
          location: res.address
        })
      }
    })
  },
  unameChange:function(e){
    var _title = e.detail.value;
    //通过正则表达式，仅能输入数字、英文、中文。
    _title = _title.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
    this.setData({
      uname: _title
    });
  },
  uphoneChange: function (e) {
    var _title = e.detail.value;
    //通过正则表达式，仅能输入数字。
    _title = _title.replace(/[^\Z0-9]/g, '');
    this.setData({
      uphone: _title
    });
  }

})