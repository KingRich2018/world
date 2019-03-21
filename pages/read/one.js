// pages/read/one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastTapTime:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var WxParse = require('../../wxParse/wxParse.js');
    var id = options.id;
    wx.request({
      url: 'https://www.happing.top/way/a/tools/getRead',
      data: {
        'token': '590785f6-bd3d-4d8e-893b-c72f9a42wang',
        'id': id
      },
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        var code = res.data.code
        var benCode = '000000'
        if (code == benCode) {
          WxParse.wxParse('content', 'html', res.data.data.read.content, that, 5)
        } else {

        }
      },
      fail: function (res) {
        console.log('is failed')
      }
    })


  },
  //触摸事件
  mytap:function(e){
    var curTime = e.timeStamp;
    var lastTime = this.data.lastTapTime;
    if (lastTime > 0){
      //大于300毫秒，认为是双击
      if(curTime - lastTime < 300){
        wx.showModal({
          title: '提示',
          content: '是否收藏',
          success: function (res) {
            if (res.confirm) {
              console.log('弹框后点取消')
            } else {
              console.log('弹框后点取消')
            }
          }
   
        })

      
      }else{

      }
    }else{

    }
    this.setData({
      lastTapTime: curTime
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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

  }
})