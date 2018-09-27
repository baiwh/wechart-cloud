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
          top: '30%',
          left: 'center',
            orient: 'vertical',
            cellSize: 35,
            itemStyle:{
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
                verticalAlign:'middle',
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
}