import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class Piechart extends Component {
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

    // Count the number of students in each department
    const departmentCount = data.reduce((countMap, student) => {
      const departmentName = student.departmentName;

      // Increment count for the department or initialize it to 1
      countMap[departmentName] = (countMap[departmentName] || 0) + 1;

      return countMap;
    }, {});

    // Convert the departmentCount object to an array of objects
    const pieChartData = Object.keys(departmentCount).map((departmentName) => ({
      value: departmentCount[departmentName],
      name: departmentName,
    }));

    // ECharts options for the pie chart
    const options = {
      title: {
        text: 'Number of Students by Department',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: Object.keys(departmentCount),
      },
      series: [
        {
          name: 'Number of Students',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: pieChartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
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

export default Piechart;
