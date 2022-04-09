import http from './http.common';

export default class FeedbackAPI {
  static async submitFeedback(feedbackText) {
    console.log('reached submit feedback in API');
    const response = await postRequest(feedbackText, '/api/v1/feedback/submit');
    if (response) {
      return response;
    }
  }

  static async getFeedback(urlParams = null) {
    let url = 'api/v1/feedback';

    if (urlParams) {
      url += '?' + urlParams;
    }

    const response = await getRequest(url);
    if (response) {
      const rides = response.data;
      return rides;
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
