//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null,
    css:"moon",
    AD:true,     //广告位
    ad_package:"满200包邮",
    ad_minus:"满100减10",
    user:{
      uname:"",
      uimg:"",
      openid:"",
      tel:"",
    }
  },
  onShow:function(){
    this.setCssStyle();
  },

  //登录时，全局读取用户信息
  onLaunch:function(){
    var userInfo = this.globalData.userInfo;
    if (userInfo==null){
      this.getLogin();
    }
  },
  /***
   * 获取用户信息 
   */
  getLogin:function(){
    var that=this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;
        that.globalData.user.uname= userInfo.nickName;
        that.globalData.user.uimg= userInfo.avatarUrl;
        that.globalData.user.tel="15288653843";
      }
    });
  },
  setCssStyle:function(){
    var bgColor = "";
    var fColor = "";
    switch (this.globalData.css) {
      case "common": { bgColor = "#ffb53c"; fColor = "#ffffff"; break; }
      case "dw": { bgColor = "#ffffff"; fColor = "#000000"; break; }
      case "PLA": { bgColor = "#f3cf61"; fColor = "#ffffff"; break; }
      case "father": { bgColor = "#f3c720"; fColor = "#ffffff"; break; }
      case "moon": { bgColor = "#051a53"; fColor = "#ffffff"; break; }
      case "china": { bgColor = "#950a0d"; fColor = "#ffffff"; break; }
    }
    wx.setNavigationBarColor({
      backgroundColor: bgColor,
      frontColor: fColor
    })
  },
  backHome: function () { //返回首页
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  backCart: function () { //返回购物车
    wx.switchTab({
      url: '/pages/cart/index/index'
    })
  },
})  