// pages/plan/addPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDates: "",
    endDates:"",
    inputList:[1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var mAndD = that.issmall(month, day);
    that.setData({
      startDates: year + "-" + mAndD,
      endDates: year + "-" + mAndD
    })
  },
  //判断加0或者不加零
  issmall: function (month, day) {
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return month + "-" + day;
  },
  addStep:function(e){
    var that =this
    var id = e.currentTarget.dataset['id']+1;
    var inputList = that.data.inputList.concat(id);
    that.setData({
      inputList: inputList
    })
  },
  detStep:function(e){
    var id = e.currentTarget.dataset['detid'];
    console.log(id)
    var that = this
    var inputList = that.data.inputList;
    console.log(inputList)
    inputList.splice(id-1, 1)
    console.log(inputList)
    console.log("长" + inputList.length)
    for (var i = id-1; i < inputList.length;i++){
      inputList[i] = inputList[i]-1;
    }
    console.log(inputList)
    that.setData({
      inputList: inputList
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

  },

  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    this.setData({
      startDates: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateEndChange: function (e) {
    this.setData({
      endDates: e.detail.value
    })
  }
 

})