// miniprogram/pages/echarts/echarts.js
import * as echarts from '../../ec-canvas/echarts';

Page({
  /**
   * 页面的初始数据
   */
  data: {
      ec: {
          lazyLoad: true
      },
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
                console.log(param)
            })
            return chart;
        });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 获取组件
      this.ecComponent = this.selectComponent('#mychart-dom-bar');
      // 初始化图表
      let option = {
          color: ['#37a2da'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
          },
          legend: {
              data: ['平均加班时长']
          },
          grid: {
              left: 20,
              right: 20,
              bottom: 15,
              top: 40,
              containLabel: true
          },
          xAxis: [
              {
                  type: 'value',
                  axisLine: {
                      lineStyle: {
                          color: '#999'
                      }
                  },
                  axisLabel: {
                      color: '#666'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'time',
                  axisTick: { show: false },
                  data: ['七月', '六月', '五月', '四月', '三月', '二月', '一月'],
                  axisLine: {
                      lineStyle: {
                          color: '#999'
                      }
                  },
                  axisLabel: {
                      color: '#666'
                  }
              }
          ],
          series: [
              {
                  name: '平均加班时长',
                  type: 'bar',
                  label: {
                      normal: {
                          show: true,
                          position: 'inside'
                      }
                  },
                  data: [300, 270, 340, 344, 300, 320, 310],
                  itemStyle: {
                      // emphasis: {
                      //   color: '#37a2da'
                      // }
                  }
              }
          ]
      };
      this.init(option)
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

})