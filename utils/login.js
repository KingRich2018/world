var app = getApp()

function login(detail) {
  var that = this
  var userInfo = detail
  /** 
  var latitude =''
  var longitude =''
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      latitude = res.latitude
      longitude = res.longitude
      console.log(latitude + "111111")
    }
  })
 */
 
 wx.login({
      success: res => {
        console.log(JSON.stringify(res)+"2222222222")
        wx.request({
          url: 'https://www.happing.top/way/login/weiLogin',
          data: {
            city: userInfo.city,
            nickname: userInfo.nickName,
            country: userInfo.country,
            img: userInfo.avatarUrl,
            province: userInfo.province,
            gender: userInfo.gender,
            openid: wx.getStorageSync("openId"),
            code: res.code
           // latitude: latitude,
            //longitude: longitude,
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
              console.log(res.data.data)
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
}
module.exports = {
  login: login
}
/**
* 生命周期函数--监听页面初次渲染完成
*/
