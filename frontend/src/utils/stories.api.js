import http from './http.common';

export default class StoriesAPI {
  static async submitStory(story) {
    const response = await postRequest(story, '/api/v1/stories/submit');
    if (response) {
      return response;
    }
  }

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
