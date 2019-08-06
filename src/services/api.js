import axios from 'axios';
import OneSignalCredentials from '../../credentials/onesignal';

const api = axios.create({
  baseURL: 'https://onesignal.com/api/v1',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Basic ${OneSignalCredentials.apiKey}`,
  },
});

export default api;
