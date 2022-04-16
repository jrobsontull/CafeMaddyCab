import axios from 'axios';

let baseU = 'http://localhost:8080/';
if (process.env.NODE_ENV === 'production') {
  baseU = 'https://localhost:8080/';
  console.log('Drive API URL set to PROD.');
} else {
  console.log('Drive API URL set to DEV.');
}

export default axios.create({
  baseURL: baseU,
  headers: {
    'Content-type': 'multipart/form-data',
  },
});
