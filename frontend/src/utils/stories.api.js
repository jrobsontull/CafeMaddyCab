import http from './http.common';

export default class StoriesAPI {
  static async getStories(urlParams = null, token) {
    let url = 'api/v1/stories';

    if (urlParams) {
      url += '?' + urlParams;
    }

    const response = await getRequest(url, token);
    if (response) {
      const stories = response.data;
      return stories;
    }
  }

  // Edit story details
  static async editStoryById(story, token) {
    const url = 'api/v1/stories';

    const response = await putRequest(story, url, token);
    if (response) {
      return response;
    }
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
