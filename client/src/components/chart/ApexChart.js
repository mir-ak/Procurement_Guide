import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

export default class ApexChart extends Component {
  state = {
    options: {
      labels: ["Positive Comments", "Negative Comments"],
      colors: ["#42EC4A", "#DF5133"],
    },
  };

  render() {
    return (
      <div>
        <h3>
          <u>Analysis</u>
        </h3>
        <ReactApexChart
          options={this.state.options}
          series={[
            this.props.comments.compentPositive,
            this.props.comments.compentNegative,
          ]}
          type="pie"
          width={480}
          colors={this.state.colors}
        />
      </div>
    );
  }
}
