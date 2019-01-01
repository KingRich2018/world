var util = require('../../utils/news.js')
Page({
  data: {
    x: util.res[0].title,
    y: util.res[0].summary,
    yy: util.res[0].summary.substring(0, 20),
    z: util.res[0].href,
    hidden: false,
    last_update: 0,
    last_x: 0,
    last_y: 0,
    last_z: 0,
    windowWidth: '',
    windowHeight: '',
    isContent:false
  },
  onReady: function (e) {
    var determination = false
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    })

    function a() {
      wx.onAccelerometerChange(function (res) {
        var curTime = new Date().getTime()
        var SHAKE_THRESHOLD = 60
        var last_update = that.data.last_update
        var len = util.res.length
        var list = Math.floor(Math.random() * (len - 1))
        if ((curTime - last_update) > 100) {
          var diffTime = curTime - last_update;
          var speed = Math.abs(res.x + res.y + res.z - that.data.last_x - that.data.last_y - that.data.last_z) / diffTime * 10000;
          if (speed > SHAKE_THRESHOLD && !determination) {
            determination = true
            determination = that.f(util.res[list])
          }
          that.setData({
            last_update: curTime,
            last_x: res.x,
            last_y: res.y,
            last_z: res.z
          })
        }
      })
    }
    a()
  },
  f: function (res) {
      this.setData({
        x: res.title,
        y: res.summary,
        yy: res.summary.substring(0, 20),
        z: res.href,
        hidden: true,
      })
  },
  preventTouchMove: function (e) {
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


  content:function(e){
    var content_flag = e.currentTarget.dataset['content'];
    this.setData({
      isContent: content_flag
    })
  }
})

