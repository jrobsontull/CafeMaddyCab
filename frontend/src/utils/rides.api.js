import http from './http.common';
import httpMulti from './http.upload.common';

export default class RidesAPI {
  // Request a ride
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

  // Get many rides, ability to search by param
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

  // Get ride details by ObjectID
  static async getRideById(id) {
    const url = 'api/v1/rides/getById?id=' + id;

    const response = await getRequest(url);
    if (response) {
      return response.data;
    }
  }

  // Edit ride details
  static async editRideById(ride) {
    const url = 'api/v1/rides';

    const response = await putRequest(ride, url);
    if (response) {
      return response;
    }
  }

  // Get general stats about rides e.g. by status
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

  // Set rides to in progress
  static async setInProgress(num, user) {
    const url = 'api/v1/rides/setInProgress';
    const body = {
      ridesToApprove: num,
      approver: { commonName: user.commonName, id: user._id },
    };

    const response = await postRequest(url, body);
    if (response) {
      return response.data;
    }
  }

  // Set in progress rides to new (cancel action in ApproveRides)
  static async unsetInProgress(userId) {
    const url = 'api/v1/rides/unsetInProgress';
    const body = {
      approverId: userId,
    };

    const response = await postRequest(url, body);
    if (response) {
      return response.data;
    }
  }

  // Approve rides by ID and append notes
  static async approveRides(toApprove, notesToAppend) {
    const url = 'api/v1/rides/approve';
    const body = {
      rides: toApprove,
      notes: notesToAppend,
    };

    const response = await postRequest(url, body);

    if (response) {
      return response.data;
    }
  }
}

// POST request for multipart content - used for requesting rides
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
    return e.response.data;
  }
}

// General GET request
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
    return e.response;
  }
}

// General POST request
async function postRequest(url, body) {
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
    return e.response;
  }
}

// General PUT request
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
    return e.response;
  }
}
