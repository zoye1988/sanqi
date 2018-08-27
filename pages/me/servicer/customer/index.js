// pages/me/servicer/customer/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    words:"",
    chats:[
      {
        cid:1,
        dtime:"2018-02-11 08:06",
        content:"您好，1002号客服为您服务",
        head:"head.jpg",
        role:"seller"
      },
      {
        cid:2,
        dtime: "2018-02-11 08:07",
        content: "测试",
        head: "customer.jpg",
        role: "customer"
      }
    ]
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

  WordsChange: function (e) {
    var _title = e.detail.value;
    //通过正则表达式，仅能输入数字、英文、中文。
    _title = _title.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '');
    this.setData({
      words: _title
    });
  },

  sendWords:function(){
    var words=this.data.words;
    console.log(words);
    var _chats=this.data.chats;
    var chat={
      cid: 2,
      dtime: app.dateFtt(),
      content: words,
      head: "customer.jpg",
      role: "customer"
    }
    _chats.push(chat);
    this.setData({
      chats:_chats
    })
  }
})