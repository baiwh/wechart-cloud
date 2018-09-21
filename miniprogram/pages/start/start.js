// miniprogram/pages/start/start.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        avatarUrl: './../../images/n.jpg',
        isAuthSetting: true,
    },

// 获取用户授权并储存
    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                isAuthSetting: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
            // 把信息储存下来
            let app = getApp()
            app.globalData.userInfo = e.detail.userInfo
            // 传回数据库
            this.onAdd(e.detail.userInfo)
            // 跳转到主页
            wx.switchTab({
                url: './../home/home'
            })
        }
    },

    // 把用户信息储存到数据库
    onAdd: function (info) {
        const db = wx.cloud.database()
        db.collection('userinfo').add({
            data: {
                info: info
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取用户信息
        wx.showLoading()
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.showLoading()
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                            // 把信息储存下来
                            let app = getApp()
                            app.globalData.userInfo = res.userInfo
                            // 跳转到主页
                            wx.switchTab({
                                url: './../home/home'
                            })
                        },
                        complete: ()=>{
                            wx.hideLoading()
                        }
                    })
                }
            },
            complete: ()=>{
                wx.hideLoading()
            }
        })
    },

})