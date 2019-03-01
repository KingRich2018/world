// pages/find/foods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    foods:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.foodList('', '')
  },

  foodList: function (id, foodFlag) {
    var that = this
    wx.request({
      url: 'https://www.happing.top/way/a/tools/foodList',
      method: 'POST',
      data: {
        token: '590785f6-bd3d-4d8e-893b-c72f9a42wang',
        id: id,
        foodFlag: foodFlag
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      success: function (res) {
        var foods = res.data.data.food;
        if (foodFlag == "pullList") {
          foods = foods.concat(that.data.foods);
        }
        if (foodFlag == "pushList") {
          foods = that.data.foods.concat(foods)
        }
        wx.setStorageSync('minId', foods[foods.length - 1].id)
        wx.setStorageSync('maxId', foods[0].id)
        that.setData({
          foods: foods
        });


      },
      fail: function (res) {

      }
    })
  },

  lookFood: function (e) {
    var id = e.currentTarget.dataset['id'];
    if (typeof (id) != "undefined" && id != '') {
      wx.navigateTo({
        url: 'food?id=' + id,
      })
    }
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