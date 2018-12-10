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
    lists: []
    // {
    // id: 1,
    // uname: "邓恒静",
    // uphone: "15288653843",
    // address: "云南省曲靖市麒麟区建宁东路880号",
    // checked: true
    // }
  },
  /**
   * 更新默认地址
   */
  updateAddress: function (e) {
    var host=app.globalData.host;
    var current = e.target.dataset.index;
    var lists = this.data.lists;
    for (var bt in lists) {
      if (current == lists[bt].aid) {
        console.log(lists[bt])
        lists[bt].checked = true;
        var _list=lists[bt];
        //更新数据
        wx.request({
          url: host + "user.do",
          method: "post",
          data: {
            method: "updateAddress",
            openid: wx.getStorageSync("openid"),
            aid:lists[bt].aid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var code=res.data.result;
            if(code==1){
              console.log(_list.location);
              wx.setStorageSync("address", _list.location);
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
    var host=app.globalData.host;
    var lists = [];
    wx.showModal({
      title: "操作提示",
      content: "确定删除此地址?",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          for (var bt in _lists) {
            if (current != _lists[bt].aid) {
              lists.push(_lists[bt])
            }else{
              wx.request({
                url: host + "user.do",
                method: "post",
                data: {
                  method: "delAddress",
                  aid: _lists[bt].aid
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  wx.showToast({
                    title: "地址删除成功",
                    duration: 1000
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
    var host=app.globalData.host;
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD
    });
    app.setCssStyle();
    console.log(wx.getStorageSync("openid"));
    wx.request({
      url: host + "user.do",
      method: "post",
      data: {
        method: "getAddress",
        openid:wx.getStorageSync("openid")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var lists = that.data.lists;
        lists = res.data;
        that.setData({
          lists: lists
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
    var that=this;
    var host=app.globalData.host;
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
    //增加数据
    wx.request({
      url: host + "user.do",
      method: "post",
      data: {
        method: "newAddress",
        openid: wx.getStorageSync("openid"),
        name:uname,
        location: location,
        checked:(lists.length==0?1:0),
        tel:uphone
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var lists = that.data.lists;
        if(lists.length==0){
          wx.setStorageSync("address", location);
        }
        lists = res.data;
        that.setData({
          lists: lists
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
  //更新数据
    wx.request({
      url: host + "user.do",
      method: "post",
      data: {
        method: "getAddress",
        openid: wx.getStorageSync("openid")
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var lists = that.data.lists;
        lists = res.data;
        that.setData({
          lists: lists
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