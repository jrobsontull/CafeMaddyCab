import axios from 'axios';

let baseU = 'http://localhost:5000/';
if (process.env.NODE_ENV === 'production') {
  //baseU = 'https://cafemaddycab.herokuapp.com/';
  console.log('Base API URL set to PROD.');
} else {
  console.log('Base API URL set to DEV.');
}

export default axios.create({
  baseURL: baseU,
  headers: {
    'Content-type': 'application/json',
  },
});
