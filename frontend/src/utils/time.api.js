import http from './http.common';

export default class TimeAPI {
  static async isFormOpen() {
    try {
      const response = await http.get('api/v1/time/formOpen');

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (e) {
      console.log('Error: ' + e.message);
      return e.response;
    }
  }
}
