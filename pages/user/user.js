var app = getApp()
const login = require("../../utils/login.js");
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    windowHeight: wx.getSystemInfoSync().windowHeight,
    userInfo: {
      avatarUrl: "",//用户头像  
      nickName: "",//用户昵称 
      city: "",
      country: "",
      province: "",
      gender: "",
      language: "",
    },
    flag:'2',
    openid: '',
    unionid: '',
    bind:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that =this
    if (wx.getStorageSync("token") == '') {
      console.log(11111111)
      that.setData({
        bind: true
      })
    }
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
  },
  onShow: function () {
    var that = this
    if (wx.getStorageSync("token") == '') {
      console.log(11111111)
      that.setData({
        bind:true
      })
    }

  },
  getContent: function (e) {
    var that = this
    var flag = e.currentTarget.dataset.flag;
    that.setData({
      flag: flag
    })
  },
  getUserInfo: function (e) {
    console.log( e)
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  // 查看是否授权
  bindGetUserInfo: function (e) {
   
    console.log(JSON.stringify(e)+"EEEEEEEEEEEE")
    var that = this
    /*
    if (wx.getStorageSync("token")){
      wx.setStorage({
        key: "userInfo",
        data: e.detail.userInfo
      })
      that.setData({
        userInfo: e.detail.userInfo
      })
    }else{
      */
  
      login.login(e.detail.userInfo)
    
    wx.setStorage({
      key: "userInfo",
      data: e.detail.userInfo
    })
    
    that.setData({
      userInfo: e.detail.userInfo,
      bind: false
    })
    
  },
  //登录
  toLogin(){
    
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
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.title,
      path: '/pages/find/main',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})