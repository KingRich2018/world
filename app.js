//app.js
//获取应用实例
const app = getApp()
App({
  onLaunch: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              var encryptedData = res.encryptedData;
              var iv = res.iv;
              this.wxLogin(encryptedData,iv);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 登录
    
   
  },
  wxLogin: function (encryptedData, iv){
    wx.login({
      success: res => {
        wx.request({
          url: 'https://www.happing.top/way/login/weixin',
          data: {
            code: res.code,
            encryptedData: encryptedData,
            iv: iv,
          },
          header: {
            'Content-type': 'application/json',// 默认值,
            'mobile': 't'
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
            var code = res.data.code
            var benCode = '000000'
            if (code == benCode) {
              try {
                wx.setStorageSync('token', res.data.data.token)
              } catch (e) {
                console.log('there is no id_token')
              }
            } else {
              try {
                wx.setStorageSync('token', '')
              } catch (e) {
                console.log('there is no id_token')
              }
            }
            console.log(res.data);
          },
          fail: function (res) {
            console.log(res.data);
            console.log('is failed')
          }
        })
      }
    })
  },
  globalData: {
   
  }
})