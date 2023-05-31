import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import historyService from "../services/chartApi";
import LoadingSpinner from "./LoadingSpinner";

const ZoomableChart = () => {
  const [spinner, setSpinner] = useState(false);
  const [options, setOptions] = useState({
    chart: {
      id: "zoomable-chart",
      zoom: {
        enabled: true,
        type: "xy"
      }
    },
    xaxis: {
      categories: []
    }
  });

  const [series, setSeries] = useState([
    {
      name: "Sales",
      data: []
    },
    {
      name: "Expenses",
      data: []
    }
  ]);

  const getHistoryData = async () => {
    await historyService.getHistoricalData()
    .then(
      result => {
        console.log('result: ', result);
        setOptions({
          chart: {
            id: "zoomable-chart",
            zoom: {
              enabled: true,
              type: "xy"
            }
          },
          xaxis: {
            categories: result.data.data[0]
          }
        });
        setSeries([
          {
            name: "History Data1",
            data: result.data.data[1]
          },
          {
            name: "History Data2",
            data: result.data.data[2]
          },
          {
            name: "History Data3",
            data: result.data.data[3]
          }
        ]);
        setSpinner(false);
      }
    )
  }

  const handleClick = () => {
    setSpinner(true);
    getHistoryData();
  }

  return (
    <div className="chart">
      <Chart options={options} series={series} type="line" height={350} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-28 flex justify-center items-center" onClick={()=>handleClick()}>
        {spinner ? <LoadingSpinner /> : "Load Data"}
      </button>
    </div>
  );
};

export default ZoomableChart;