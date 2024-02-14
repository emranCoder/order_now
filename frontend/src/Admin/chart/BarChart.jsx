import React from "react";
import ReactApexChart from "react-apexcharts";

export default function BarChart(props) {
  const barChartSeries = [
    {
      name: "This Year: ",
      data: props.data,
    },
  ];

  const barChart = {
    chart: {
      type: "bar",
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      style: {
        colors: "red",
      },
      fillSeriesColor: false,
      onDatasetHover: {
        highlightDataSeries: false,
      },
      x: {
        show: true,
      },
    },

    colors: ["#581c87"],
    grid: {
      show: false,
    },
    noData: {
      text: undefined,
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6c737f",
        },
      },
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: "#6c737f",
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };

  return (
    <ReactApexChart options={barChart} series={barChartSeries} type="bar" />
  );
}
