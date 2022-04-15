import http from './http.common';
import httpMulti from './http.upload.common';

export default class RidesAPI {
  static async requestRide(rideDetails, selfie, photoId) {
    var formData = new FormData();
    formData.append('selfie', selfie);
    formData.append('photoId', photoId);
    formData.append('firstName', rideDetails.firstName);
    formData.append('lastName', rideDetails.lastName);
    formData.append('email', rideDetails.email);
    formData.append('identity', rideDetails.identity);
    formData.append('income', rideDetails.income);
    formData.append('purpose', rideDetails.purpose.value);
    formData.append('purposeText', rideDetails.purpose.text);

    const response = postRequestMulti(
      formData,
      '/api/v1/rides/',
      rideDetails.gResponse
    );

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

  static async getStats(urlParams = null) {
    let url = 'api/v1/rides/getStats';

    if (urlParams) {
      url += '?' + urlParams;
    }

    const response = await getRequest(url);
    if (response) {
      const stats = response.data;
      return stats;
    }
  }
}

async function postRequestMulti(body, url, gResponse) {
  try {
    const payload = body;
    /* Set reCAPTCHA response to header for validation */
    const config = { headers: { 'g-response': gResponse } };
    const response = await httpMulti.post(url, payload, config);

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
