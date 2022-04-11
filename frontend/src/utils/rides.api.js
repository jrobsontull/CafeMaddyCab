import http from './http.common';

export default class RidesAPI {
  static async requestRide(rideDetails) {
    const response = await postRequest(rideDetails, '/api/v1/rides/request');
    if (response) {
      return response;
    }
  }

  static async getRides(urlParams = null) {
    let url = 'api/v1/rides';

    if (urlParams) {
      url += '?' + urlParams;
    }

    const response = await getRequest(url);
    if (response) {
      const rides = response.data;
      return rides;
    }
  }

  static async getRideById(id) {
    const url = 'api/v1/rides/getById?id=' + id;

    const response = await getRequest(url);
    if (response) {
      const ride = response.data;
      return ride;
    }
  }

  static async editRideById(ride) {
    const url = 'api/v1/rides';

    const response = await putRequest(ride, url);
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

async function getRequest(url) {
  try {
    const response = await http.get(url);

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

async function putRequest(body, url) {
  try {
    const payload = body;
    const response = await http.put(url, payload);

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
