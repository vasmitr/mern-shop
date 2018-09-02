import axios from 'axios';

export default function (token) {
  if (token) {
    axios.defaults.headers['Authorization'] = token;
  } else {
    delete axios.defaults.headers['Authorization'];
  }
}