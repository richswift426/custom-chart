import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import historyService from "../services/chartApi";
import LoadingSpinner from "./LoadingSpinner";
import { XMarkIcon } from '@heroicons/react/20/solid'

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
      categories: [],
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return val*1;
        }
      }
    },
    stroke: {
      curve: "smooth"
    },
    markers: {
      size: 0
    },
    zoom: {
      enabled: true,
      zoomedArea: {
        stroke: {
          width: 0.5,
          color: "#444"
        }
      }
    },
    title: {
      text: 'Historical Data',
      align: 'center'
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
        if(result == "error") {
          alert("something went wrong!");
          setSpinner(false);
          return;
        }
        setOptions({
          chart: {
            id: "zoomable-chart",
            zoom: {
              enabled: true,
              type: "xy"
            }
          },
          xaxis: {
            categories: result.data.data[0],
          },
          yaxis: {
            labels: {
              formatter: function(val) {
                return val*1;
              }
            }
          },
          stroke: {
            curve: "smooth"
          },
          markers: {
            size: 0
          },
          zoom: {
            enabled: true,
            zoomedArea: {
              stroke: {
                width: 0.5,
                color: "#444"
              }
            }
          },
          title: {
            text: 'Historical Data',
            align: 'center'
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
    <div className="chart justify-content">
      <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
          />
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
            }}
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">Apex Chart</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            Graphing time series data from REST API & time scrolling scrubber, zoom functionality
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Chart options={options} series={series} type="line" height={350} className="mt-8 w-vw" />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-28 flex justify-center items-center" onClick={()=>handleClick()}>
        {spinner ? <LoadingSpinner /> : "Load Data"}
      </button>
    </div>
  );
};

export default ZoomableChart;