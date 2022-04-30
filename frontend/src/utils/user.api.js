import http from './http.common';

export default class UserAPI {
  static async getName(user) {
    const url = 'api/v1/auth/getName?id=' + user._id;
    const response = await getRequest(url, user.token);

    if (response) {
      return response.data;
    } else {
      return null;
    }
  }

  static async changePassword(currentPass, newPass, user) {
    const url = 'api/v1/auth/changePassword';
    const body = {
      currentPass: currentPass,
      newPass: newPass,
      _id: user._id,
    };
    const response = await putRequest(body, url, user.token);

    if (response) {
      return response.data;
    } else {
      return null;
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
