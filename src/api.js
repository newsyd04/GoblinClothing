// src/api.js
import axios from 'axios';

// Replace with your Elastic Beanstalk URL
const API_BASE_URL = 'http://GoblinClothing-backend-dev.eu-west-1.elasticbeanstalk.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
