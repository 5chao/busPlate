// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})

/*"tabBar": {
        "selectedColor": "#1b6fff",
        "list": [
            {
                "pagePath": "pages/index/index",
                "iconPath": "./images/home_icon.png",
                "selectedIconPath": "./images/home_selected_icon.png",
                "text": "首页"
            },
            {
                "pagePath": "pages/knowledge/knowledge",
                "iconPath": "./images/home_book_icon.png",
                "selectedIconPath": "./images/home_book_selected_icon.png",
                "text": "知识库"
            }
        ]
    },*/