import http from './http.common';
import httpMulti from './http.upload.common';

export default class RidesAPI {
  // Request a ride
  static async requestRide(rideDetails, selfie, photoId, story) {
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
    formData.append('storyText', story.story);
    formData.append('storySharable', story.shareStory);

    const response = await postRequestMulti(
      formData,
      'api/v1/rides/',
      rideDetails.gResponse
    );

    if (response) {
      return response;
    }
  }

  // Get many rides, ability to search by param
  static async getRides(urlParams = null, token) {
    let url = 'api/v1/rides';

    if (urlParams) {
      url += '?' + urlParams;
    }

    const response = await getRequest(url, token);
    if (response) {
      const rides = response.data;
      return rides;
    }
  }

  // Get ride details by ObjectID
  static async getRideById(id, token) {
    const url = 'api/v1/rides/getById?id=' + id;

    const response = await getRequest(url, token);
    if (response) {
      return response.data;
    }
  }

  // Get ride details by shortId
  static async getRideByShortId(shortId, token) {
    const url = 'api/v1/rides/getByShortId?shortId=' + shortId;

    const response = await getRequest(url, token);
    if (response) {
      return response.data;
    }
  }

  // Edit ride details
  static async editRideById(ride, token) {
    const url = 'api/v1/rides';

    const response = await putRequest(ride, url, token);
    if (response) {
      return response;
    }
  }

  // Get general stats about rides e.g. by status
  static async getStats(urlParams = null, token) {
    let url = 'api/v1/rides/getStats';

    if (urlParams) {
      url += '?' + urlParams;
    }

    const response = await getRequest(url, token);
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

    const response = await postRequest(url, body, user.token);
    if (response) {
      return response.data;
    }
  }

  // Set in progress rides to new (cancel action in ApproveRides)
  static async unsetInProgress(userId, token) {
    const url = 'api/v1/rides/unsetInProgress';
    const body = {
      approverId: userId,
    };

    const response = await postRequest(url, body, token);
    if (response) {
      return response.data;
    }
  }

  // Approve rides by ID and append notes
  static async approveRides(toApprove, notesToAppend, token) {
    const url = 'api/v1/rides/approve';
    const body = {
      rides: toApprove,
      notes: notesToAppend,
    };

    const response = await postRequest(url, body, token);

    if (response) {
      return response.data;
    }
  }

  // Get rides OBJ to send codes to
  static async sendCodes(fromDate = null, toDate = null, token) {
    const url = 'api/v1/rides/sendCodes';
    let params;
    let response;

    if (fromDate && toDate) {
      params = '?fromDate=' + fromDate + '&toDate=' + toDate;
      response = await getCsvRequest(url + params, token);
    } else {
      // No dates specified
      response = await getCsvRequest(url, token);
    }

    if (response) {
      return response.data;
    }
  }

  // Upload CSV for marking rides as done
  static async markAsDone(csvFile, token) {
    var formData = new FormData();
    formData.append('csvFile', csvFile);

    const response = await postCSVMulti(
      formData,
      'api/v1/rides/markAsDone',
      token
    );

    if (response) {
      return response.data;
    }
  }

  // Archive rejected rides for this week
  static async archiveRejected(token) {
    const url = 'api/v1/rides/archiveRejected';
    const response = await postRequest(url, {}, token);
    if (response) {
      return response.data;
    }
  }

  // General dowload rides as CSV
  static async downloadRides(searchTerms, token) {
    const url = 'api/v1/rides/download';
    const params = '?' + searchTerms;
    const response = await getCsvRequest(url + params, token);

    if (response) {
      return response.data;
    }
  }
}

// POST request for multipart content - used for requesting rides
async function postRequestMulti(body, url, gResponse) {
  try {
    const payload = body;
    // Set reCAPTCHA response to header for validation
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

// POST request for CSV file uploads
async function postCSVMulti(body, url, token) {
  try {
    const payload = body;
    const response = await httpMulti.post(url, payload, {
      headers: { token: token },
    });

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

// GET request for downloading CSV files
async function getCsvRequest(url, token) {
  try {
    const response = await http.get(url, {
      headers: { token: token },
      responseType: 'blob',
    });

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

// General GET request
async function getRequest(url, token) {
  try {
    const response = await http.get(url, { headers: { token: token } });

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
async function postRequest(url, body, token) {
  try {
    const payload = body;
    const response = await http.post(url, payload, {
      headers: { token: token },
    });

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
async function putRequest(body, url, token) {
  try {
    const payload = body;
    const response = await http.put(url, payload, {
      headers: { token: token },
    });

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
