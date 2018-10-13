// pages/news/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    news: {
      nid: 1,
      title: "人参之王三七的药理作用及功效应用",
      cover: "news2.jpg",
      desc: "《攻壳机动队》由日本漫画家士郎正宗（Masamune Shirow）创作，故事设定在未来的日本。那时全世界被庞大信息网络连为一体，人类的各种组织器官均可被人造化。", //卷首语
      like: 451,
      viewer: 200,
      keywords: ['三七花', '高血压', '高血脂', '高血糖'],
      time: "2018-02-03",
      content: [
        {
          words: "《攻壳机动队》由日本漫画家士郎正宗（Masamune Shirow）创作，故事设定在未来的日本。那时全世界被庞大信息网络连为一体，人类的各种组织器官均可被人造化。生化人、仿生人、人类共存在地球上，单凭肉眼无法识别。很多人的身体都有着与网络连接的端口（在脖子后面），身体纯粹成为了一个容纳人类灵魂的容器。在这样的背景下，犯罪活动也有了新的动向，日本国家公共安全委员会下属的秘密行动小组“攻壳机动队”就是专门为对付此类犯罪而成立的，主人公素子就是其中的一员。",
          img: "news2.jpg"
        },
        {
          words: "早在2008年梦工厂就曾透露有意将《攻壳机动队》（Ghost in the Shell）拍摄成真人出演的3D立体电影，不过此后关于这一计划就鲜有消息。据悉此次改编，负责导演的是曾执导《白雪公主与猎人》（Snow White and the Huntsman）的鲁伯特·桑德斯（Rupert Sanders），而《超凡蜘蛛侠》系列制片人阿维·阿拉德（Avi Arad）则担任制片。",
          img: "news3.jpg"
        }
      ]
    },
    ads: [
      {
        title: "纯正文山30头三七",
        content: "产品选用文山本地种植三七，无添加无公害，现磨打粉",
        price: 260,
        sale: 120,
        ad: 30,
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
        unit: "20片/盒",
        img: "goods.png",
        id: 2
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var host = app.globalData.host;
    var nid=options.nid;
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD
    });
    app.setCssStyle();
    wx.request({
      url: host + "news.do",
      method: "post",
      data: {
        method: "getDetail",
        nid:nid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var news = res.data;
        console.log(news);
        that.setData({
          news: news
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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toChat:function(){
    wx.navigateTo({
      url: '../../me/servicer/customer/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})