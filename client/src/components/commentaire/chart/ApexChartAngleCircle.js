import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";
export default class ApexChartAngleCircle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          height: 20,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            offsetY: -10,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 8,
              size: "20%",
              background: "transparent",
              image: undefined,
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                show: false,
              },
            },
          },
        },
        colors: ["#FFEC19", "#FFC100", "#FF9800", "#FF5607", "#F6412D"],
        labels: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"],
        legend: {
          show: true,
          floating: true,
          fontSize: "15px",
          position: "left",
          offsetX: 0,
          offsetY: -5,
          labels: {
            useSeriesColors: false,
          },
          markers: {
            size: 0,
          },
          formatter: function (seriesName, opts) {
            return (
              seriesName +
              " :  " +
              opts.w.globals.series[opts.seriesIndex] +
              "%"
            );
          },
          itemMargin: {
            vertical: 2,
          },
        },
        responsive: [
          {
            breakpoint: 400,
            options: {
              legend: {
                show: false,
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.props.data}
          type="radialBar"
          height={390}
        />
      </div>
    );
  }
}
