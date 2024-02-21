import React from "react";
import ApexCharts from "apexcharts";

export default function PieChart(props) {
  const pieChart = {
    colors: ["#3856ae", "#df9f16", "#30aa5e"],
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  total: {
                    fontSize: "20px",
                  },
                },
              },
            },
          },
        },
      },
    ],

    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    labels: ["Products", "Users", "Orders"],
    plotOptions: {
      pie: {
        selection: {
          enabled: false,
        },
        expandOnClick: false,
        select: false,
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "25px",
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#373d3f",
            },
          },
        },
      },
    },
  };
  return <ApexCharts series={props.data} options={pieChart} type="donut" />;
}
