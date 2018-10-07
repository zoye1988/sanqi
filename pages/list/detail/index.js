// pages/list/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    ad_package: app.globalData.ad_package,
    ad_minus: app.globalData.ad_minus,
    // tab切换  
    currentTab: 0,
    defaultHeight: 1000,//H:240,204
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    count:1,  //购物总数
    detail: {
      id: 3,
      title: "文山七丹药业血栓通(25mg)",
      desc: "这是一款神奇的产品,对'三高'患者有较好的功效。",
      unit: "500g/罐",
      price: 260,
      sale: 120,
      love:true,
      origin:"云南文山",
      packager:"铝塑封盒",
      cover: "goods.png",         //封面图片
      coverImgs: ['goods2.png', 'goods.png'],                   //封面图片
      Imgs: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],                   //宣传图片和文案
      ad: 30,
      comment: 4.5,
    },
    comments:[    //评价列表
      {
        cid:0,
        datetime:"2018-03-23 03:02:10",
        degree:5,                    //评价等级1~5个等级。
        uname:"测试用户",
        title:"当一个人颐养天年的时候是最喜欢回顾自己生前的成就的，他们并不想他们建立在他们子女心目中的“英雄”形象而因此因为自己的错误而遭受到半点的瑕疵",
        header:"head.jpg",
        imgs: ['goods2.png', 'goods.png']                      //用户上传图片,最多5张
      },
      {
        cid: 1,
        datetime: "2018-03-23 03:02:10",
        degree: 3,                    //评价等级1~5个等级。
        uname: "李嬷嬷",
        title: "环境监测是环境保护的基础工作，是推进生态文明建设的重要支撑。",
        header: "goods3.jpg",
        imgs: ['head.jpg', 'news.jpg']                      //用户上传图片,最多5张
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      css: app.globalData.css,
      AD: app.globalData.AD
    });
    app.setCssStyle();
    //将navrigaterBar名称修改
    wx.setNavigationBarTitle({
      title: that.data.detail.title
    })
    //读取图片数字的长度，确定swiper的高度
    that.setData({
      defaultHeight: that.data.detail.Imgs.length*240,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 设置收藏
   */
  setLove: function () {
    console.log("setLOVE");
    var love=this.data.detail.love;
    var title="";
    if(love==true){
      love=false;
      title="取消收藏";
    }else{
      love=true;
      title="收藏成功"
    }
    this.setData({
      'detail.love':love
    });
    wx.showToast({
      title: title,
      duration: 1000
    })
  },

  /*
  countPlus
  **/
  countPlus:function(){
    var count=this.data.count;
    this.setData({
      count:++count
    });
  },
  /*
  countMinus
  **/
  countMinus: function () {
    var count=this.data.count;
    if(--count<0){
      count=0;
    }
    this.setData({
      count: count
    });
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var current = e.target.dataset.current;
      var _defaultHeight = 0;
      if (current == 0) {
        _defaultHeight = that.data.detail.Imgs.length * 240;
      } else if (current == 1) {
        _defaultHeight = that.data.comments.length*204+30;
      }
      this.setData({
        defaultHeight: _defaultHeight,
        currentTab: e.target.dataset.current
      });
    }
  },
  /** 
    * 滑动切换tab 
    */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
    var current = e.detail.current;
    var _defaultHeight=0;
    if (current == 0) {
      _defaultHeight = that.data.detail.Imgs.length*240;
    } else if (current == 1) {
      _defaultHeight = that.data.comments.length * 204+30;
    }
    this.setData({
      defaultHeight: _defaultHeight
    });
  },
  /** 
    * 返回首页
    */
  backHome:function(){
    app.backHome();
  },
  /** 
    * 返回购物车
    */
  backCart: function () {
    app.backCart();
  }
})