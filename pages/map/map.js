// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    map:{
      latitude: 34.75381,
      longitude: 113.67739
    },
    mark:{
      latitude: '',
      longitude: '',
      address:''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myThis = this
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        myThis.setData({
          'map.latitude': res.latitude,
          'map.longitude': res.longitude
        })
      }
    })
  },
    /**
   * 点击地图添加Mark点
   */
  clickMap: function(){
    var myThis = this
    wx.chooseLocation({
      success: function (res) {
        myThis.setData({
          'mark.latitude': res.latitude,
          'mark.longitude': res.longitude,
          'mark.address': res.address
        })
        console.log(myThis.data.mark)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getlola: function(){

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