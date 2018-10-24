// miniprogram/pages/history/history.js
import * as echarts from "../../ec-canvas/echarts";
let chart
// 图表数据
function setOption(chart) {
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
                show:false
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
                show:false
            },
            range: ['2018-09']
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
            data: [["2018-09-01", 5],["2018-09-02", 0],["2018-09-03", 0],["2018-09-04", 0],["2018-09-05", 0],["2018-09-06", 0],
                ["2018-09-07", 0],["2018-09-08", 0],["2018-09-09", 0],["2018-09-10", 0],["2018-09-11", 0],
                ["2018-09-12", 0],["2018-09-13", 0],["2018-09-14", 0],["2018-09-15", 0],["2018-09-16", 0],
                ["2018-09-17", 0],["2018-09-18", 0],["2018-09-19", 0],["2018-09-20", 0],["2018-09-21", 0],
                ["2018-09-22", 0],["2018-09-23", 0],["2018-09-24", 0],["2018-09-25", 0],["2018-09-26", 0],
                ["2018-09-27", 0],["2018-09-28", 0],["2018-09-29", 0],["2018-09-30", 0],["2018-09-31", 0]],
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        let day = params.value[0].split('-')[2]
                        let d = day.charAt(0)
                        let data = ''
                        if (d==='0') {
                            data = day.charAt(1)
                        } else{
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
    chart.setOption(option);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '2018-09',
        signInData: '',
        echartsOption: {},
        ec: {
            lazyLoad: true
        },
    },
    // 时间选择器-日期
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    // 初始化图表
    init: function () {
        this.ecComponent.init((canvas, width, height) => {
            // 初始化图表
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height
            });
            setOption(chart);
            // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        // 获取组件
        this.ecComponent = this.selectComponent('#mychart-dom-bar');
        // 初始化图表
        this.init()
    },

})

// 日历背景颜色随机函数
function getVirtulData(year) {
    // year = year || '2017';
    // var date = +echarts.number.parseDate(year + '-01-01');
    // var end = +echarts.number.parseDate((+year + 1) + '-01-01');
    // var dayTime = 3600 * 24 * 1000;
    // var data = [];
    // for (var time = date; time < end; time += dayTime) {
    //     data.push([
    //         echarts.format.formatTime('yyyy-MM-dd', time),
    //         Math.floor(Math.random() * 1000)
    //     ]);
    // }
}
