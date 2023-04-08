import React from "react";
import ReactApexChart from "react-apexcharts";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const JobWidgetCharts = ({ dataColors, series }) => {
  var areacharteathereumColors = getChartColorsArray(dataColors);

  var options = {
    chart: {
      width: 130,
      height: 46,
      type: "area",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [50, 100, 100, 100],
      },
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
    colors: areacharteathereumColors,
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height="46"
        width="130"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const StatisticsApplicationsChart = ({ dataColors }) => {
  var statisticsApplicationColors = getChartColorsArray(dataColors);

  const series = [
    {
      name: "Companay",
      type: "column",
      data: [30, 48, 28, 74, 39, 87, 54, 36, 50, 87, 84],
    },
    {
      name: "New Jobs",
      type: "column",
      data: [20, 50, 42, 10, 24, 28, 60, 35, 47, 64, 78],
    },
    {
      name: "Total Jobs",
      type: "area",
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
    },
    {
      name: "Job View",
      type: "line",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
    },
  ];
  var options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: true,
      offsetY: 10,
    },
    stroke: {
      width: [0, 0, 2, 2],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    fill: {
      opacity: [1, 1, 0.1, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: [
      "01/01/2022",
      "02/01/2022",
      "03/01/2022",
      "04/01/2022",
      "05/01/2022",
      "06/01/2022",
      "07/01/2022",
      "08/01/2022",
      "09/01/2022",
      "10/01/2022",
      "11/01/2022",
    ],
    colors: statisticsApplicationColors,
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="350"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

const ReceivedTimeCharts = ({ dataColors }) => {
  var ApplicationReveicedTimeColors = getChartColorsArray(dataColors);

  const series = [
    {
      name: "Received Application",
      data: [34, 44, 54, 21, 12, 43, 33, 80, 66],
    },
  ];
  var options = {
    chart: {
      type: "line",
      height: 378,
      toolbar: {
        show: false,
      },
    },
    // stroke: {
    //     curve: 'stepline',
    // },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    labels: [
      "8 PM",
      "9 PM",
      "10 PM",
      "11 PM",
      "12 PM",
      "1 AM",
      "2 AM",
      "3 AM",
      "4 AM",
    ],
    dataLabels: {
      enabled: false,
    },
    colors: ApplicationReveicedTimeColors,
    markers: {
      hover: {
        sizeOffset: 4,
      },
    },
  };
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="378px"
        width="456px"
        className="apex-charts"
      />
    </React.Fragment>
  );
};

export { JobWidgetCharts, StatisticsApplicationsChart, ReceivedTimeCharts };
