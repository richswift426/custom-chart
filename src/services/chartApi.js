import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_HOST}/rest/0.1/`;
const username = process.env.REACT_APP_USER_NAME;
const password = process.env.REACT_APP_PASSWORD;
const auth = btoa(`${username}:${password}`);

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

class historyService {
  getHistoricalData() {
    let historyData = axios.get(API_URL + "unit/e661640843792f2d/sensor/3,50,60/history", config)
      .then((response) => {
        return response;
      })
      .catch(err => console.log(err));
    return historyData;
  }
}

export default new historyService();