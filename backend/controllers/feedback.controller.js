import FeedbackDAO from '../dao/feedbackDAO.js';

export default class FeedbackController {
  /* GET feedback from DB and return JSON response */
  static async apiGetFeedback() {
    console.log('Feedback GET request.');
  }

  /* POST feedback to MongoDB Feedback collection */
  static async apiPostFeedback(req, res, next) {
    const rideId = req.body.rideId;
    const feedbackText = req.body.text;
    const feedbackResponse = await FeedbackDAO.postFeedback(rideId, feedbackText);
    res.json(feedbackResponse);
  } catch (e) {
    res.status(500).json({error: e.message});
  }
}
