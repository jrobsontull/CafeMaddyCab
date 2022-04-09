import FeedbackDAO from '../dao/feedbackDAO.js';

export default class FeedbackController {
  /* GET feedback from DB and return JSON response */
  static async apiGetFeedback() {
    console.log('Feedback GET request.');
  }

  /* POST feedback to MongoDB Feedback collection */
  static async apiPostFeedback() {
    console.log('Feedback POST request.');
  }
}
