// miniprogram/pages/history/history.js
import * as echarts from "../../ec-canvas/echarts";

// 图表数据
function setOption(chart) {
    const option = {
        calendar: {
            top: '30%',
            left: 'center',
            orient: 'vertical',
            cellSize: 35,
            itemStyle: {
                fontSize: 10,
                color: '#999'
            },
            yearLabel: {
                margin: 50,
                textStyle: {
                    fontSize: 10
                }
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
                nameMap: 'cn',
                margin: 10,
                verticalAlign: 'middle',
                textStyle: {
                    fontSize: 10,
                    color: '#999'
                }
            },
            range: ['2018-09']
        },
        visualMap: {
            show: false,
            min: 0,
            max: 1000,
            type: 'piecewise',
            inRange: {
                color: ['#5291FF', '#C7DBFF']
            },
            orient: 'horizontal'
        },
        series: {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: getVirtulData(2018),
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        var d = echarts.number.parseDate(params.value[0]);
                        return d.getDate();
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
    year = year || '2017';
    var date = +echarts.number.parseDate(year + '-01-01');
    var end = +echarts.number.parseDate((+year + 1) + '-01-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 1000)
        ]);
    }
    return data;
}
