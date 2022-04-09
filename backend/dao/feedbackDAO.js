import mongodb from 'mongodb';

let feedback;

export default class FeedbackDAO {
  static async injectFeedbackDB(conn) {
    if (feedback) {
      return;
    }

    try {
      // Check if production environment
      let db_uri = process.env.CAFEMADDYCAB_NS_DEV;
      if (process.env.NODE_ENV === 'production') {
        console.log('Enabling ridesDAO production mode.');
        db_uri = process.env.CAFEMADDYCAB_NS_PRODUCTION;
      }

      feedback = await conn.db(db_uri).collection('feedback');
    } catch (e) {
      console.error(
        'Unable to establish a connection handle in feedbackDAO: ' + e
      );
    }
  }

  static async getFeedback() {}

  static async postFeedback(rideId, feedbackText) {
    try {
      const feedbackResponse = {
        rideId: rideId,
        text: feedbackText,
      };

      return feedback.insertOne(feedbackResponse);
    } catch (e) {
      console.log('Unable to post feedback: ' + e);
      return {error: e};
    }
  }
}
