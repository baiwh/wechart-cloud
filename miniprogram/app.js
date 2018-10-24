//app.js
App({
    onLaunch: function () {

        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                traceUser: true,
            })
        }

        getTime:() => {
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
                nowTime:{
                    date: year + '-' + month + '-' + day,
                    time: hour + ':' + min
                }
            })
            console.log('全局调用',this.globalData.nowTime)
        }
        this.globalData = {
            userInfo: {},
            nowTime: {
                date: '',
                time: ''
            }
        }
    }
})
