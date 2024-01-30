import axios from 'axios';
import { REACT_APP_IP_ADDRESS } from '@env';

const SERVER_PORT = 3001;
const IP_ADDRESS = `http://${REACT_APP_IP_ADDRESS}:${SERVER_PORT}`;

export const api = axios.create({
   baseURL: IP_ADDRESS,
});
