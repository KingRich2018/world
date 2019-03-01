// pages/find/histroy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    date:'',
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    days: '',
    twoday:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'],
    leapday: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28','29','30','31'],
    nonleap: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    month:'',
    day:'',
    show:false,
    selecting:true,
    todayHistory:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var date = that.issmall(month, day)
    that.setData({
      date: date,
      month: myDate.getMonth(),
      day: myDate.getDate() - 1
    })
    that.selectTime(month);
    that.setData({
      months: that.data.months
    })

    that.todayHistroy(month + "-" + day);
    wx.showToast({
      title: month + "月" + day + "日历史",
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  isShow: function (e) {
    var that = this
    var show = e.currentTarget.dataset.show;
    that.setData({
      show: !show
    })
   
  },
  getContent: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'today?id='+id
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
  selectMonth:function(e){
    var that = this
    var month = e.currentTarget.dataset.month;
    that.selectTime(month);
    that.setData({
      month: month,
      selecting:false
    })
  },
  selectDay:function(e){
    var that = this
    var day = e.currentTarget.dataset.day;
    var month = e.currentTarget.dataset.month;
    var date = that.issmall(month+1, day+1)
    that.todayHistroy((month + 1) + "-" + (day + 1));
    that.setData({
      month: month,
      day: day,
      date: date,
      show: false,
      selecting: true
    })
    wx.showToast({
      title: (month+1) + "月" + (day+1) + "日历史",
      icon: 'succes',
      duration: 2000,
      mask: true
    })
  },
  //时间方法类
  selectTime: function (month){
    var that = this
    var days = ''
    if (/^[13578]|1[02]$/.test(month + 1)) {
      days = that.data.leapday;
    }
    else if (/^[468]|1[1]$/.test(month + 1)) {
      days = that.data.nonleap;
    } else {
      days = that.data.twoday;
    }
    that.setData({
      days: days
    })
  },
  //判断加0或者不加零
  issmall: function (month, day){
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return month + "-" + day;
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  todayHistroy:function(date){
    var that = this
    wx.request({
      url: 'https://www.happing.top/way/a/tools/histroyList',
      data: {
        'token': '590785f6-bd3d-4d8e-893b-c72f9a42wang',
        'today':date
      },
      header: {
        'Content-type': 'application/x-www-form-urlencoded',// 默认值,
        'mobile': 't'
      },
      method: 'POST',
      success: function (res) {
        var code = res.data.code
        var benCode = '000000'
        if (code == benCode) {
          that.setData({
            todayHistory: res.data.data
          })
        } else {

        }
      },
      fail: function (res) {
        console.log('is failed')
      }
    })
  },

  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.title,
      path: '/pages/news/news',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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