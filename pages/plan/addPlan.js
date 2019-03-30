// pages/plan/addPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDates: "",
    endDates:"",
    arr:[''],
    value:"",
    isgo:false,
    disable:"disabled"
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
    var flag = options.flag;
   
    var disable = ""
    if (flag=='update'){
      disable = "disable"
    }else{
      disable =""
    }
    that.setData({
      startDates: year + "-" + mAndD,
      endDates: year + "-" + mAndD,
      disable: disable
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
    var id = e.currentTarget.dataset['id'];
    var value = that.data.value;
    that.data.arr[id] = "";
    that.setData({
      isgo: false,
      arr: that.data.arr
      })
  },
  nofouce:function(e){
    var that = this;
    var value = e.detail.value;
    var id = e.currentTarget.dataset['id'];
    that.data.arr[id - 1] = value;
    that.setData({
      arr: that.data.arr
    })
  },
  step:function(e){
    var that = this;
    var value = e.detail.value;
    if (value){
      that.setData({
        isgo:true
      })
    } else {
      that.setData({
        isgo: false
      })
    }
  },
  detStep:function(e){
    var that = this;
    var id = e.currentTarget.dataset['detid'];
    var value = that.data.value;
    var isgo = true;
    that.data.arr.splice(id - 1, 1);
    if (that.data.arr.length == 0){
      that.data.arr[0]="";
    }
    if (that.data.arr[that.data.arr.length - 1] == ""){
      isgo = false;
    }
    that.setData({
      isgo: isgo,
      arr: that.data.arr
    })
  },
 
  formSubmit:function(e){
    var that = this
    var title=e.detail.value.title;
    var startTime = e.detail.value.startTime;
    var endTime = e.detail.value.endTime;
    var step = that.data.arr;
    console.log(title + ">>>" + startTime + ">>>>>" + endTime + ">>>" + step)
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    
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