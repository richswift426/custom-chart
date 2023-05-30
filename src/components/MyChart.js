import React, { useRef, useEffect } from 'react';
import {
  Chart,
  initTE,
} from "tw-elements";

initTE({ Chart });

const MyChart = () => {
    return (
      <div className="mx-auto w-3/5 overflow-hidden">
        <canvas
          data-te-chart="line"
          data-te-dataset-label="Traffic"
          data-te-labels="['Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday' , 'Sunday ']"
          data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]">
        </canvas>
      </div>
    );
  };
  
  export default MyChart;