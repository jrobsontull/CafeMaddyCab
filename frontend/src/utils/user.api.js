import http from './http.common';

export default class UserAPI {
  static async getName(user) {
    const response = await getRequest('/api/v1/user/getName');

    if (response) {
      return response;
    }
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
