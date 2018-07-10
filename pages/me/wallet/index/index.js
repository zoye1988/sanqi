// pages/me/wallet/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css: app.globalData.css,
    AD: app.globalData.AD,
    wallet: {
      totals: 1550.50, //销售额
      bonus: 500.50, //奖金提成
      sellcount: 15 //销售记录总数
    },
    records: [
      {
        uname: "李白",
        bill:"YRSM201802150023",
        uimg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531195129988&di=f6c820ab936834766a0bffeaf6cd4149&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201508%2F09%2F20150809005334_rxVJH.jpeg",
        color: "#0cca67",
        work: "奖金",
        bonus: "+800.00",
        time:"2018-02-15"
      },
      {
        uname: "杜甫",
        bill: "YRSM201802150023",
        uimg: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4278319825,854340123&fm=27&gp=0.jpg",
        color: "#fc5b40",
        work: "提现",
        bonus: "-800.00",
        time: "2018-06-15"
        
      },
      {
        uname: "玛丽",
        bill: "YRSM201802150023",
        uimg: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=248922623,1099147588&fm=27&gp=0.jpg",
        color: "#1296db",
        work: "退款",
        bonus: "+20.00",
        time: "2018-04-15"
      },
      {
        uname: "李白",
        bill: "YRSM201802150023",
        uimg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531195129988&di=f6c820ab936834766a0bffeaf6cd4149&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201508%2F09%2F20150809005334_rxVJH.jpeg",
        color: "#0cca67",
        work: "奖金",
        bonus: "+800.00",
        time: "2018-02-15"
      },
      {
        uname: "李白",
        bill: "YRSM201802150023",
        uimg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531195129988&di=f6c820ab936834766a0bffeaf6cd4149&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201508%2F09%2F20150809005334_rxVJH.jpeg",
        color: "#0cca67",
        work: "奖金",
        bonus: "+800.00",
        time: "2018-02-15"
      },
      {
        uname: "李白",
        bill: "YRSM201802150023",
        uimg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531195129988&di=f6c820ab936834766a0bffeaf6cd4149&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201508%2F09%2F20150809005334_rxVJH.jpeg",
        color: "#0cca67",
        work: "奖金",
        bonus: "+800.00",
        time: "2018-02-15"
      },
      {
        uname: "李白",
        bill: "YRSM201802150023",
        uimg: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531195129988&di=f6c820ab936834766a0bffeaf6cd4149&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201508%2F09%2F20150809005334_rxVJH.jpeg",
        color: "#0cca67",
        work: "奖金",
        bonus: "+800.00",
        time: "2018-02-15"
      },
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
})