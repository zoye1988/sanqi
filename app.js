//app.js
App({
  globalData: {
    ustatus: null,
    css:"common",
    AD:1,     //广告位
    ad_package:"满200包邮",
    ad_minus:"满100减10",
    user:{
      uname:"",
      uimg:"",
      openid:"",
      tel:"",
      role_EN:"customer",
      role_CN:"普通用户",
      /*
      产品代理
      店小二
      */
    },
    /**
     * 系统默认参数
     */
    downloadurl: 'http://192.168.3.71:8080/wxadmin/res/',//默认系统下载链接
    host: "http://192.168.3.71:8080/wxadmin/",//默认系统数据访问地址
    //downloadurl: 'http://192.168.31.194:8080/wxadmin/res/',//默认系统下载链接
    //host: "http://192.168.31.194:8080/wxadmin/",//默认系统数据访问地址

  },

  onShow:function(){
  },

  //登录时，全局读取用户信息
  onLaunch:function(){
    console.log("onLaunch");
    this.getCssStyle();
  },
  /***
   * 获取用户信息 
   */
  getLogin:function(){
    var that=this;
    var host=this.globalData.host;
    wx.getUserInfo({
      success: function (res) {
        console.log(res.code);
        if (1==1) {
          //发起网络请求
          wx.request({
            url: host + "user.do",
            method: "post",
            data: {
              method: "getOpenid",
              code: res.code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              var openid = res.data.openid;
              console.log(openid);
              if (openid == "" || openid == null || openid == "null") {
                wx.showModal({
                  title: "系统提示",
                  content: "读取用户信息失败，请重启程序",
                  showCancel: false,
                  confirmText: "确定"
                })
              } else {
                that.setData({
                  openid: openid
                })
                that.checkAuth();//发送审核核实请求
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
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
        var userInfo = res.userInfo;
        that.globalData.user.uname= userInfo.nickName;
        that.globalData.user.uimg= userInfo.avatarUrl;
        that.globalData.user.tel="15288653843";
        wx.setStorageSync("user.uname", that.globalData.user.uname);
        wx.setStorageSync("user.uimg", that.globalData.user.uimg);
        wx.setStorageSync("user.tel", that.globalData.user.tel);
        wx.setStorageSync("user.role", "customer");
        wx.setStorageSync("ustatus", "");
      }
    });
  },
  /**
   * 检查服务器样式数据
   */
  getCssStyle:function(){
    //发起网络请求
    var that = this;
    var host = this.globalData.host;
    wx.request({
      url: host + "styles.do",
      method: "post",
      data: {
        method: "getStyle"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var styles = res.data[0];
        var holiday=styles.holiday;
        if (holiday!="" && holiday!=null) {
           that.globalData.css=holiday;
           that.globalData.AD=styles.holiday_ad;
        }
        console.log("setup");
        wx.switchTab({
          url: '/pages/index/index'
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
    })
  },
  //每个页面设置统一样式
  setCssStyle:function(){
    var bgColor = "";
    var fColor = "";
    switch (this.globalData.css) {
      case "dw": { bgColor = "#ffffff"; fColor = "#000000"; break; }
      case "PLA": { bgColor = "#f3cf61"; fColor = "#ffffff"; break; }
      case "father": { bgColor = "#f3c720"; fColor = "#ffffff"; break; }
      case "moon": { bgColor = "#051a53"; fColor = "#ffffff"; break; }
      case "china": { bgColor = "#950a0d"; fColor = "#ffffff"; break; }
      default: { bgColor = "#ffb53c"; fColor = "#ffffff"; break; }
    }
    wx.setNavigationBarColor({
      backgroundColor: bgColor,
      frontColor: fColor
    })
    console.log("setCssStyle,this.globalData.css=" + this.globalData.css);
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