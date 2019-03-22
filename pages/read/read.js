//const util = require("/../utils/util.js");
var app = getApp();
Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    reads: [],
    scrollTop: 0,
    scrollHeight: 0,
    hiddenloading: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.readList('', '')
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
  onPullDownRefresh: function () {
    var that = this
    that.readList(wx.getStorageSync("maxId"), 'pullList')
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  onReachBottom: function () {
    var that = this
    // 显示加载图标
    that.setData({
      hiddenloading: false
    })
    setTimeout(function () {
      that.readList(wx.getStorageSync("minId"), 'pushList')
      wx.hideLoading();
    }, 1500)
  },
  //新闻列表
  readList: function (id,readFlag) {
    var that = this
    wx.request({
      url: 'https://www.happing.top/way/a/tools/readList',
      method: 'POST', 
      data: {
        token: '590785f6-bd3d-4d8e-893b-c72f9a42wang',
        id:id,
        readFlag: readFlag
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      success: function (res) {
        var reads = res.data.data.readList;
        
        if (readFlag == "pullList") {
          reads = reads.concat(that.data.reads);
          
        }
        if (readFlag == "pushList"){
          reads = that.data.reads.concat(reads)
        }
        wx.setStorageSync('minId', reads[reads.length - 1].id)
        wx.setStorageSync('maxId', reads[0].id)
        that.setData({
          reads: reads,
          scrollHeight: that.data.windowHeight,
        });


      },
      fail: function (res) {
       
      }
    })
  },

  lookRead: function (e) {
    var id = e.currentTarget.dataset['id'];
    if (typeof (id) != "undefined" && id != '') {
      wx.navigateTo({
        url: 'one?id=' + id,
      })
    }
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

})