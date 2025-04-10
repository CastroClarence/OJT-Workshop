// LineChart.tsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        title: {
            show: true,
            text: 'Predictive Visualization'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            name: 'Weekdays',
            type: 'line',
            data: [150, 230, 224, 218, 135, 147, null], // Only weekdays
            lineStyle: {
            type: 'solid'
            }
        },
        {
            name: 'Weekends',
            type: 'line',
            data: [null, null, null, null, null, 147, 260], // Only weekends
            lineStyle: {
            type: 'dashed'
            }
        }
        ]        
      };

      myChart.setOption(option);

      // Resize on window resize
      const handleResize = () => myChart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        myChart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return <div id="main" ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;
