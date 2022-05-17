import FeedbackDAO from '../dao/feedbackDAO.js';

export default class FeedbackController {
  /* GET feedback from DB and return JSON response */
  static async apiGetFeedback(req, res, next) {
    try {
      const entriesPerPage = req.query.entriesPerPage
        ? parseInt(req.query.entriesPerPage, 10)
        : 15;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;
      const { feedbackList, totalNumEntries } = await FeedbackDAO.getFeedback(
        page,
        entriesPerPage
      );

      let response = {
        entries: feedbackList,
        page: page,
        entiresPerPage: entriesPerPage,
        totalResults: totalNumEntries,
      };
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  /* POST feedback to MongoDB Feedback collection */
  static async apiPostFeedback(req, res, next) {
    const rideId = req.body.rideId;
    const feedbackText = req.body.feedbackText;
    const re =
      /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-+!?"]+$/u;

    if (re.test(feedbackText)) {
      const feedbackResponse = await FeedbackDAO.postFeedback(
        rideId,
        feedbackText
      );
      res.json(feedbackResponse);
    } else {
      res.status(400).json({
        error:
          'Invalid characters in the feedback text. Please remove before submitting again.',
      });
    }
  }
  catch(e) {
    res.status(500).json({ error: e.message });
  }
}
