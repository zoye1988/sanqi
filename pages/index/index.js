//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    indicatorDots: false,
    vertical: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    tabShow: false,//广告栏是否指定
    css: app.globalData.css,
    AD: app.globalData.AD,
    ad_package: app.globalData.ad_package,
    ad_minus: app.globalData.ad_minus,
    hots: [
      {
        title: "纯正文山30头三七",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 260,
        sale: 120,
        plan: 30,
        unit: "元/500g",
        img: "hot.jpg",
        id: 1
      },
      {
        title: "血栓通片（250毫克）",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 800,
        sale: 600,
        plan: 10,
        unit: "20片/盒",
        img: "goods.png",
        id: 2
      },
      {
        title: "三七牙膏",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 20,
        sale: 0,
        plan: 3,
        unit: "100g/盒",
        img: "goods2.png",
        id: 3
      },
    ],
    plans: [
      {
        title: "纯正文山30头三七",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 260,
        sale: 120,
        ad: 30,
        comment:4.5,
        unit: "元/500g",
        img: "hot.jpg",
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
        ad: 3,
        comment: 4.5,
        unit: "100g/盒",
        img: "goods2.png",
        id: 3
      },
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.setCssStyle();
  },
})
