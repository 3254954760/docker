import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class BarChart extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({ data });
  }

  render() {
    const { data } = this.state;

    // Count the number of male and female students in each department
    const departmentGenderCount = data.reduce((countMap, student) => {
      const departmentName = student.departmentName;
      const gender = student.gender;

      // Initialize counts for the department if not present
      countMap[departmentName] = countMap[departmentName] || {
        male: 0,
        female: 0,
      };

      // Increment count based on gender
      if (gender === '男') {
        countMap[departmentName].male += 1;
      } else if (gender === '女') {
        countMap[departmentName].female += 1;
      }

      return countMap;
    }, {});

    // Convert the departmentGenderCount object to an array of objects
    const barChartData = Object.keys(departmentGenderCount).map(
      (departmentName) => ({
        name: departmentName,
        male: departmentGenderCount[departmentName].male,
        female: departmentGenderCount[departmentName].female,
      }),
    );

    // ECharts options for the bar chart
    const options = {
      title: {
        text: 'Number of Students by Department and Gender',
        x: 'center',
        y: 10, // Adjust the vertical position of the title
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['男', '女'],
        bottom: 10, // Adjust the vertical position of the legend
      },
      xAxis: {
        type: 'category',
        data: barChartData.map((item) => item.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '男',
          type: 'bar',
          data: barChartData.map((item) => item.male),
        },
        {
          name: '女',
          type: 'bar',
          data: barChartData.map((item) => item.female),
        },
      ],
    };

    return (
      <div>
        <ReactEcharts option={options} />
      </div>
    );
  }
}

export default BarChart;
