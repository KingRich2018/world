Page({
  data: {
    x: '',
    y: '',
    yy: '',
    z: '',
    hidden: false,
    last_update: 0,
    last_x: 0,
    last_y: 0,
    last_z: 0,
    windowWidth: '',
    windowHeight: '',
    isContent:false,
    one:'',
    content:[],
    determination: false
  },
  onLoad: function () {
    this.oneContent();
    this.setData({
      determination: false
    })
  },
  onShow: function () {
    this.setData({
      determination: false
    })
  },
  onReady: function (e) {
    var that = this
    that.oneContent();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    })
   var num = 1;
    function a() {
      wx.onAccelerometerChange(function (res) {
        var curTime = new Date().getTime()
        var SHAKE_THRESHOLD = 210
        var last_update = that.data.last_update
        //var len = util.res.length
        //var list = Math.floor(Math.random() * (len - 1))
        if ((curTime - last_update) > 100) {
          var diffTime = curTime - last_update;
          var speed = Math.abs(res.x + res.y + res.z - that.data.last_x - that.data.last_y - that.data.last_z) / diffTime * 10000;
          if (speed > SHAKE_THRESHOLD && !that.data.determination) {
            
            that.setData({
              y: that.data.content[num].content,
              yy: that.data.content[num].content.substring(0, 20),
              z: that.data.content[num].img,
            })
            wx.playBackgroundAudio({
              dataUrl: 'http://fjyd.sc.chinaz.com/files/download/sound1/201410/5012.mp3',
              title: 'weixin'
            })  
            num = num + 1;
            if(num == 5){
              that.oneContent();
              num=1;
            }
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

  onHide: function () {
    this.setData({
      determination: true
    })
  },
  onUnload: function () {
   
  },
  preventTouchMove: function (e) {
  },

  oneContent:function(){
    var that =this
    wx.request({
      url: 'https://www.happing.top/way/a/tools/randomOne',
      data: {
        'token': '590785f6-bd3d-4d8e-893b-c72f9a42wang'
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
          that.setData({content : res.data.data.data
          })
          that.setData({
            y: res.data.data.data[0].content,
            yy: res.data.data.data[0].content.substring(0, 20),
            z: res.data.data.data[0].img,
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


  content:function(e){
    var content_flag = e.currentTarget.dataset['content'];
    this.setData({
      isContent: content_flag
    })
  }
})

