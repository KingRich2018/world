var app = getApp();
Page({
  data: {
    travels: [],
    hiddenloading: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.travelList('', '')
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
    that.travelList(wx.getStorageSync("maxId"), 'pullList')
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
      that.travelList(wx.getStorageSync("minId"), 'pushList')
      wx.hideLoading();
    }, 1500)
  },
  //新闻列表
  travelList: function (id, travelFlag) {
    var that = this
    wx.request({
      url: 'https://www.happing.top/way/a/tools/travelList',
      method: 'POST',
      data: {
        token: '590785f6-bd3d-4d8e-893b-c72f9a42wang',
        id: id,
        travelFlag: travelFlag
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      success: function (res) {
        var travels = res.data.data.travel;
        console.log(travels)
        if (travelFlag == "pullList") {
          travels = travels.concat(that.data.travels);

        }
        if (travelFlag == "pushList") {
          travels = that.data.travels.concat(travels)
        }
        wx.setStorageSync('minId', travels[travels.length - 1].id)
        wx.setStorageSync('maxId', travels[0].id)
        that.setData({
          travels: travels
        });


      },
      fail: function (res) {

      }
    })
  },

  lookTravel: function (e) {
    var id = e.currentTarget.dataset['id'];
    if (typeof (id) != "undefined" && id != '') {
      wx.navigateTo({
        url: 'tour?id=' + id,
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