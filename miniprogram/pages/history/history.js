// miniprogram/pages/history/history.js
import * as echarts from "../../ec-canvas/echarts";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '2018-09',
        signInData: '2018-10-26 17:50',
        echartsOption: {},
        ec: {
            lazyLoad: true
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        // 获取组件
        this.ecComponent = this.selectComponent('#mychart-dom-bar');
        // yyyy/mm/dd
        let nowDate = new Date()
        let year = nowDate.getFullYear()
        let month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1)
            : nowDate.getMonth() + 1
        let day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate
            .getDate()
        let hour = nowDate.getHours()
        let min = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes()
        // 保存当天日期
        this.setData({
            date: year + '-' + month
        })
        let date = year + '-' + month + '-' + day
        // 获取数据库当天记录的值，并赋值给signInData并显示，如果当天无值为空，显示加号

        // 获取数据库中当月的数据

        // 初始化图表
        let option = {
            calendar: {
                top: '30%',
                left: 'center',
                orient: 'vertical',
                cellSize: 40,
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#ffffff',
                    width: 1,
                    type: 'solid'
                  }
                },
                itemStyle: {
                    fontSize: 10,
                    color: '#999',
                    normal: {
                      borderWidth: 1,
                      borderColor: '#ffffff'
                    }
                },
                yearLabel: {
                    show: false
                },
                dayLabel: {
                    firstDay: 7,
                    nameMap: 'cn',
                    textStyle: {
                        fontSize: 10,
                        color: '#999'
                    }
                },
                monthLabel: {
                    show: false
                },
                range: [this.data.date]
            },
            visualMap: {
                show: false,
                min: 0,
                max: 5,
                type: 'piecewise',
                inRange: {
                    color: ['#ffffff', '#5291FF']
                },
                orient: 'horizontal'
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: [["2018-11-01", 5], ["2018-11-02", 0], ["2018-11-03", 0], ["2018-11-04", 0], ["2018-11-05", 0], ["2018-11-06", 0],
                    ["2018-11-07", 0], ["2018-11-08", 0], ["2018-11-09", 0], ["2018-11-10", 0], ["2018-11-11", 0],
                    ["2018-11-12", 0], ["2018-11-13", 0], ["2018-11-14", 0], ["2018-11-15", 0], ["2018-11-16", 0],
                    ["2018-11-17", 0], ["2018-11-18", 0], ["2018-11-19", 0], ["2018-11-20", 0], ["2018-11-21", 0],
                    ["2018-11-22", 0], ["2018-11-23", 0], ["2018-11-24", 0], ["2018-11-25", 0], ["2018-11-26", 0],
                    ["2018-11-27", 0], ["2018-11-28", 0], ["2018-11-29", 0], ["2018-11-30", 0], ["2018-11-31", 0]],
                label: {
                    normal: {
                        show: true,
                        formatter: function (params) {
                            let day = params.value[0].split('-')[2]
                            let d = day.charAt(0)
                            let data = ''
                            if (d === '0') {
                                data = day.charAt(1)
                            } else {
                                data = day
                            }
                            return data;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
            }
        };
        this.init(option)
    },

    // 时间选择器-日期
    bindDateChange: function (e) {
        // 保存选值
        this.setData({
            date: e.detail.value
        })
        // 调取数据库

        // 重绘图表
        let option = {
            calendar: {
                top: '30%',
                left: 'center',
                orient: 'vertical',
                cellSize: 40,
                itemStyle: {
                    fontSize: 10,
                    color: '#999'
                },
                yearLabel: {
                    show: false
                },
                dayLabel: {
                    firstDay: 7,
                    nameMap: 'cn',
                    textStyle: {
                        fontSize: 10,
                        color: '#999'
                    }
                },
                monthLabel: {
                    show: false
                },
                range: [this.data.date]
            },
            visualMap: {
                show: false,
                min: 0,
                max: 5,
                type: 'piecewise',
                inRange: {
                    color: ['#ffffff', '#5291FF']
                },
                orient: 'horizontal'
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: [["2018-11-01", 5], ["2018-11-02", 0], ["2018-11-03", 0], ["2018-11-04", 0], ["2018-11-05", 0], ["2018-11-06", 0],
                    ["2018-11-07", 0], ["2018-11-08", 0], ["2018-11-09", 0], ["2018-11-10", 0], ["2018-11-11", 0],
                    ["2018-11-12", 0], ["2018-11-13", 0], ["2018-11-14", 0], ["2018-11-15", 0], ["2018-11-16", 0],
                    ["2018-11-17", 0], ["2018-11-18", 0], ["2018-11-19", 0], ["2018-11-20", 0], ["2018-11-21", 0],
                    ["2018-11-22", 0], ["2018-11-23", 0], ["2018-11-24", 0], ["2018-11-25", 0], ["2018-11-26", 0],
                    ["2018-11-27", 0], ["2018-11-28", 0], ["2018-11-29", 0], ["2018-11-30", 0], ["2018-11-31", 0]],
                label: {
                    normal: {
                        show: true,
                        formatter: function (params) {
                            let day = params.value[0].split('-')[2]
                            let d = day.charAt(0)
                            let data = ''
                            if (d === '0') {
                                data = day.charAt(1)
                            } else {
                                data = day
                            }
                            return data;
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
            }
        };
        this.init(option)
    },

    // 初始化图表
    init: function (option) {
        this.ecComponent.init((canvas, width, height) => {
            // 初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            chart.setOption(option);
            // 将图表实例绑定到 this 上，可以在其他成员函数中访问
            this.chart = chart;
            this.setData({
                isLoaded: true,
                isDisposed: false
            });
            // 给图表增加点击事件
            chart.on("click", (param) => {
                console.log(param.data)
                console.log(this.data)
            })
            return chart;
        });
    },
})
