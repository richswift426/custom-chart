import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-zoom';
import axios from "axios";

const MyChart = () => {
  const [flag, setFlag] = useState(0);
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [{
            label: 'Traffic',
            data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
          }],
        },
        options: {
          plugins: {
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
        },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartRef]);

  const getHistoricalData = async () => {
    let username = process.env.REACT_APP_USER_NAME;
    let password = process.env.REACT_APP_PASSWORD;
    const auth = btoa(`${username}:${password}`);
    let url = `${process.env.REACT_APP_API_HOST}/rest/0.1/unit/e661640843792f2d/sensor/3,50,60/history`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        // 'Access-Control-Allow-Origin': `*`
      },
      params: {
        start: '2023-05-28T17:53:44.344Z',
        end: '2023-05-28T18:55:44.344Z'
      }
    };

    let apiReturn = await axios.get(url, config)
      .then((response) => {
        console.log('here: ', response);
        return response;
      })
      .catch(err => console.log(err));
    return apiReturn;
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (chartInstance) {
      chartInstance.zoom(event.deltaY > 0 ? -1 : 1);
    }
  };

  const handleClick = () => {
    getHistoricalData();
  }

  return (
    <div className="mx-auto w-3/5 overflow-hidden items-center" onWheel={handleWheel}>
      <canvas ref={chartRef} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" onClick={()=>handleClick()}>
        Load Data
      </button>
    </div>
  );
};

export default MyChart;