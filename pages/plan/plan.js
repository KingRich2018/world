//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    showModal:false,
  },
  onLoad: function () {
    
  },
  addPlan:function(){
    wx.navigateTo({
      url: 'addPlan?flag=insert'
    })
  },
  open:function(){
    this.setData({
      showModal: true,
    })
  },
  showOpen:function(){
    this.setData({
      showModal: false,
    })
  },
  punch:function(){
    wx.navigateTo({
      url: 'addPlan?flag=update'
    })
  }
})