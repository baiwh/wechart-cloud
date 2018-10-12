// miniprogram/pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */

    data: {
        date: '2018-09-21',
        time: '14:42'
    },

    // 刷新按钮、获取当前时间
    refreshBtn: function () {
        // yyyy/mm/dd
        let nowDate = new Date()
        let year = nowDate.getFullYear()
        let month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1
        let day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate
            .getDate()
        let hour = nowDate.getHours()
        let min = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes()
        // 修改data
        this.setData({
            date: year + '-' + month + '-' + day,
            time: hour + ':' + min
        })
    },

    // 时间选择器-日期
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },

    // 时间选择器-时间
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },

    // 打卡按钮
    signIn: function () {
        // 打开loading
        wx.showLoading({
            mask: true
        })
        // 获取全局变量、获取个人信息
        let app = getApp()
        console.log(app.globalData.userInfo)
        // db初始化
        const db = wx.cloud.database()
        db.collection('signin').add({
            data: {
                date: this.data.date,
                time: this.data.time,
                nickName: app.globalData.userInfo.nickName
            },
            success: res => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'success',
                    title: '打卡成功',
                    duration: 1000
                })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
                wx.hideLoading()
                wx.showToast({
                    icon: 'none',
                    title: '打卡失败',
                    duration: 1000
                })
                console.error('[数据库] [新增记录] 失败：', err)
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        this.refreshBtn()
    },

})