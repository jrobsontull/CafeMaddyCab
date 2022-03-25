import http from './http.common';

export default class RidesAPI {
  static async requestRide(rideDetails) {
    const response = await postRequest(rideDetails, '/api/v1/rides/request');
    if (response) {
      return response;
    }
  }
}

async function postRequest(body, url) {
  try {
    const payload = body;
    const response = await http.post(url, payload);

    if (response.status === 200) {
      return response;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error: ' + e.message);
    return null;
  }
}
