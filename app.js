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
      role:"customer"
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

  dateFtt: function () {
    var that = this;
    var fmt = "yyyy-MM-dd hh:mm:ss";
    var date = new Date();
    var o = {
      "M+": date.getMonth() + 1,                 //月份   
      "d+": date.getDate(),                    //日   
      "h+": date.getHours(),                   //小时   
      "m+": date.getMinutes(),                 //分   
      "s+": date.getSeconds(),                 //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
})  