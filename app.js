//app.js
App({
  globalData: {
    ustatus: null,
    carts:[],
    css: "",
    AD: 1,     //广告位
    ad_package: "满200包邮",
    ad_minus: "满100减10",
    openid:"",
    address:"",//默认的地址数据
    code:"",
    user: {
      uname: "",
      uimg: "",
      openid: "",
      tel: "",
      role_EN: "customer",
      role_CN: "普通用户",
      /*
      产品代理
      店小二
      */
    },
    /**
     * 系统默认参数
     */
    downloadurl: 'http://127.0.0.1:8080/wxadmin/res/',//默认系统下载链接
    host: "http://127.0.0.1:8080/wxadmin/",//默认系统数据访问地址
    //downloadurl: 'http://192.168.31.194:8080/wxadmin/res/',//默认系统下载链接
    //host: "http://192.168.31.194:8080/wxadmin/",//默认系统数据访问地址

  },

  onShow: function () {
  },

  //登录时，全局读取用户信息
  onLaunch: function () {
    //读取随机用户数据
    var host=this.globalData.host;
    var that=this;
    var code=wx.getStorageSync("code");
    //随机生成一个用户识别号
    if(code=='' || code==null){
      wx.request({
        url: host + "user.do",
        method: "post",
        data: {
          method: "passanger"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var code = res.data.code;
          wx.setStorageSync("code", code);
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
    }
  },
  updateGoods:function(carts){
    wx.setStorageSync("carts", carts);
  },
  updateLoves: function (love,code,gid) {
    var host=this.globalData.host;
    var checked=(love==true?1:0);
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "setLove",
        checked:checked,
        gid:gid,
        code:code
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        return res.data.result;
      },
      fail: function (res) {
        
      }
    })
  },
  setCount:function(gid,count,act){
    var that = this;
    var host = this.globalData.host;
    wx.request({
      url: host + "goods.do",
      method: "post",
      data: {
        method: "setCart",
        code: wx.getStorageSync("code"),
        gid:gid,
        act:act,
        count:count
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var result = res.data.result;
        if (result==0) {
          wx.showModal({
            title: "系统提示",
            content: "请检查网络或重启程序",
            showCancel: false,
            confirmText: "确定"
          })
        }
        return result;
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
  /***
   * 获取用户信息 
   */
  getLogin: function () {
    var that = this;
    var host = this.globalData.host;
    wx.login({
      success: function (res) {
        if (res.code) {
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
              console.log("openid="+openid);
              if (openid == "" || openid == null || openid == "null") {
                wx.showModal({
                  title: "系统提示",
                  content: "读取用户信息失败，请重启程序",
                  showCancel: false,
                  confirmText: "确定"
                })
              } else {
                wx.setStorageSync("openid", openid);
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
      }
    });
  },
  /**
   * 检查服务器样式数据
   */
  getCssStyle: function () {
    console.log(this.globalData.css);
    var that = this;
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
  },
  //每个页面设置统一样式
  setCssStyle: function () {
    var that = this;
    var host = this.globalData.host;
    console.log(this.globalData.css);
    if (this.globalData.css == "") {
      //发起网络请求
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
          var holiday = styles.holiday;
          if (holiday != "" && holiday != null) {
            that.globalData.css = styles.holiday;
            that.globalData.AD = styles.holiday_ad;
          } else {
            that.globalData.css = "common";
            that.globalData.AD = 1;
          }
          that.getCssStyle();
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
    }else{
      that.getCssStyle();
    }
  },
  backHome: function () { //返回首页
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  backCart: function () { //返回购物车
    wx.reLaunch({
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