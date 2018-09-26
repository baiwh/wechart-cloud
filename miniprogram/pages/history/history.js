// miniprogram/pages/history/history.js
import * as echarts from "../../ec-canvas/echarts";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ecBar: {
            onInit: function (canvas, width, height) {
                const barChart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });
                canvas.setChart(barChart);
                barChart.setOption(getBarOption());

                return barChart;
            }
        },

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

})
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
function getBarOption() {
    return {
        calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: 40,
            yearLabel: {
                margin: 50,
                textStyle: {
                    fontSize: 30
                }
            },
            dayLabel: {
                firstDay: 1,
                nameMap: 'cn'
            },
            monthLabel: {
                nameMap: 'cn',
                margin: 15,
                textStyle: {
                    fontSize: 20,
                    color: '#999'
                }
            },
            range: ['2018-09', '2018-10']
        },
        visualMap: {
            min: 0,
            max: 1000,
            type: 'piecewise',
            left: 'center',
            bottom: 20,
            inRange: {
                color: ['#5291FF', '#C7DBFF']
            },
            seriesIndex: [1],
            orient: 'horizontal'
        },
        series: [{
            type: 'graph',
            edgeSymbol: ['none', 'arrow'],
            coordinateSystem: 'calendar',
            symbolSize: 15,
            calendarIndex: 0,
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlue: 9,
                    shadowOffsetX: 1.5,
                    shadowOffsetY: 3,
                    shadowColor: '#555'
                }
            },
            lineStyle: {
                normal: {
                    color: '#D10E00',
                    width: 1,
                    opacity: 1
                }
            },
            z: 20
        }, {
            type: 'heatmap',
            coordinateSystem: 'calendar',
            data: getVirtulData(2018)
        }]
    };
}