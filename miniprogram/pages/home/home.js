// miniprogram/pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '2018-09-21',
        time: '14:42'
    },

    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    signIn: () => {
        wx.showLoading({
            mask:true
        })
        const db = wx.cloud.database()
        db.collection('signin').add({
            data: {
                date: this.data.date,
                time: this.data.time
            },
            success: res => {
                wx.showToast({
                    icon: 'success',
                    title: '打卡成功',
                })
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '打卡失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
            },
            complete:()=>{
                wx.hideLoading()
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // yyyy/mm/dd
        let nowDate = new Date()
        let year = nowDate.getFullYear()
        let month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1
        let day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate
            .getDate()
        let hour = nowDate.getHours()
        let min = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes()
        this.setData({
            date: year + '-' + month + '-' + day,
            time: hour + ':' + min
        })
    },

})