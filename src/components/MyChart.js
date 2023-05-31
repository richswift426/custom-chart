import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-zoom';
import axios from "axios";

const MyChart = () => {
  let chartInstance = null;

  const [dates, setDates] = useState([]);
  const [history, setHistory] = useState([]);
  const [history1, setHistory1] = useState([]);
  const [history2, setHistory2] = useState([]);
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

  const getHistoricalData = async () => {
    let username = process.env.REACT_APP_USER_NAME;
    let password = process.env.REACT_APP_PASSWORD;
    const auth = btoa(`${username}:${password}`);
    let url = `${process.env.REACT_APP_API_HOST}/rest/0.1/unit/e661640843792f2d/sensor/3,50,60/history`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
      params: {
        start: '2023-05-29T17:53:44.344Z',
        end: '2023-05-29T18:53:46.344Z'
      }
    };

    let apiReturn = await axios.get(url, config)
      .then((response) => {
        console.log('here: ', response.data.data[0]);
        setDates(response.data.data[0]);
        setHistory(response.data.data[1]);
        setHistory1(response.data.data[2]);
        setHistory2(response.data.data[3]);
        if (chartInstance) {
          chartInstance.data.labels = response.data.data[0];
          chartInstance.data.datasets[0].data = response.data.data[3];
          chartInstance.update();
        }
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
    <div className="mx-auto w-3/5 overflow-hidden">
      <canvas ref={chartRef} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5" onClick={()=>handleClick()}>
        Load Data
      </button>
    </div>
  );
};

export default MyChart;