import http from './http.common';

export default class FeedbackAPI {
  static async submitFeedback(feedback) {
    const response = await postRequest(feedback, '/api/v1/feedback/submit');
    if (response) {
      return response;
    }
  }

  static async getFeedback(urlParams = null, token) {
    let url = 'api/v1/feedback';

    if (urlParams) {
      url += '?' + urlParams;
    }

    const response = await getRequest(url, token);
    if (response) {
      const feedback = response.data;
      return feedback;
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
    return null;
  }
}
