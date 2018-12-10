// pages/cart/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    css: app.globalData.css,
    AD: app.globalData.AD,
    ad_package: app.globalData.ad_package,
    ad_minus: app.globalData.ad_minus,
    showMsg:true,
    count:0,
    totals:0,
    carts: []
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
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD
    });
    app.setCssStyle();
    var host = this.data.host;
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "getCarts",
        code:wx.getStorageSync("code") ,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var _carts=res.data;
        var _totals = 0;
        for (var i in _carts) {
          _totals += 1.0 * _carts[i].price * _carts[i].counts;
        }
        that.setData({
          carts:res.data,
          count: _carts.length,
          totals: _totals
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
    var that=this;
    var host=that.data.host;
    wx.showModal({
      title: "操作提示",
      content: "确定清空购物车?",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: host + "goods.do",
            method: "post",
            data: {
              method: "clearCarts",
              code: wx.getStorageSync("code")
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.setData({
                carts: []
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
        }
      }
    })
  },
  /**
   * 删除购物车
   */
  cancelCart: function (e) {
    var that=this;
    var host=this.data.host;
    var gid = e.target.dataset.gid;
    wx.showModal({
      title: "操作提示",
      content: "确定清空购物车?",
      showCancel: true,
      confirmText: "确定",
      success: function (res) {
        if (res.confirm) {
          var carts=that.data.carts;
          var _carts=[];
          for (var s in carts) {
            if (carts[s].gid != gid) {
              _carts.push(carts[s]);
            }
          }
          wx.request({
            url: host + "goods.do",
            method: "post",
            data: {
              method: "clearCart",
              code: wx.getStorageSync("code"),
              gid: gid
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              that.setData({
                carts: _carts
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
        }
      }
    })
  },
  countPlus:function(e){
    var that = this;
    var gid = e.target.dataset.gid;
    var _carts = that.data.carts;
    var _totals = 0;
    var _counts=0;
    for (var i in _carts) {
      if (_carts[i].gid == gid) {
        _carts[i].counts = 1.0 * _carts[i].counts + 1;
        _counts = _carts[i].counts;
        if (app.setCount(gid, _counts, 'add') == 0) {
          wx.showModal({
            title: "操作异常",
            content: "请检查网络或重启程序,",
            showCancel: false,
            confirmText: "确定"
          })
        }
      }
      _totals += 1.0 * _carts[i].price * _carts[i].counts;
    }
    that.setData({
      carts: _carts,
      totals: _totals,
      count: _carts.length
    })
    
  },
  countMinus: function (e) {
    var that = this;
    var gid = e.target.dataset.gid;
    var _carts = that.data.carts;
    var carts=[];
    var _totals = 0;
    for (var i in _carts) {
      if (_carts[i].gid == gid) {
        _carts[i].counts = 1.0 * _carts[i].counts - 1;
        if (app.setCount(gid, _carts[i].counts, 'minus') == 0) {
          wx.showModal({
            title: "操作异常",
            content: "请检查网络或重启程序,",
            showCancel: false,
            confirmText: "确定"
          })
        }
      }
      if(_carts[i].counts!=0){
        carts.push(_carts[i]);
        _totals += 1.0 * _carts[i].price * _carts[i].counts;
      }
    }
    that.setData({
      carts: carts,
      totals: _totals,
      count:carts.length
    })
  },
  receipt:function(){
    
  }
})