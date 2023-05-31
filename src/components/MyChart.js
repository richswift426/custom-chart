import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-zoom';
import historyService from "../services/chartApi";
import LoadingSpinner from "./LoadingSpinner";

const MyChart = () => {
  let chartInstance = null;

  const [dates, setDates] = useState([]);
  const [history, setHistory] = useState([]);
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);
  const [spinner, setSpinner] = useState(false);
  
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Traffic',
              data: history
            },
            {
              label: 'Traffic1',
              data: history1
            },
            {
              label: 'Traffic2',
              data: history2
            }
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Hello'
            },
            zoomEnabled: true,
            zoom: {
              pan: {
                enabled: true,
                mode: 'xy',
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'xy',
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
              cubicInterpolationMode: 'monotone',
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartRef, dates, history, history1, history2]);

  const getHistoryData = async () => {
    await historyService.getHistoricalData()
    .then(
      result => {
        console.log('result: ', result);
        setDates(result.data.data[0]);
        setHistory(result.data.data[1]);
        setHistory1(result.data.data[2]);
        setHistory2(result.data.data[3]);
        setSpinner(false);
      }
    )
  }

  const handleWheel = (event) => {
    event.preventDefault();
    if (chartInstance) {
      chartInstance.zoom(event.deltaY > 0 ? -1 : 1);
    }
  };

  const handleClick = () => {
    setSpinner(true);
    getHistoryData();
  }

  return (
    <div className="mx-auto w-3/5 overflow-hidden">
      <canvas ref={chartRef} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-28 flex justify-center items-center" onClick={()=>handleClick()}>
        {spinner ? <LoadingSpinner /> : "Load Data"}
      </button>
    </div>
  );
};

export default MyChart;