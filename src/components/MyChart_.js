import React, { useRef, useEffect, useState } from 'react';
import axios from "axios";

const MyChart = () => {
  useEffect(() => {
    let url = `https://dev.app.tectio.net/rest/0.1/unit/e661640843792f2d/sensor/3,50,60/history?start=2023-05-28T17%3A53%3A44.344Z&end=2023-05-28T18%3A53%3A44.344Z`;
    let username = process.env.REACT_APP_USER_NAME;
    let password = process.env.REACT_APP_PASSWORD;
    const auth = btoa(`${username}:${password}`);
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'text/html',
      },
    })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
  });



  return (
    <div className="mx-auto w-3/5 overflow-hidden">
      Hello, world
    </div>
  );
};

export default MyChart;