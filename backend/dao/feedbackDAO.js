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
        console.log('Enabling feedbackDAO production mode.');
        db_uri = process.env.CAFEMADDYCAB_NS_PRODUCTION;
      }

      feedback = await conn.db(db_uri).collection('feedback');
    } catch (e) {
      console.error(
        'Unable to establish a connection handle in feedbackDAO: ' + e
      );
    }
  }

  static async getFeedback(page = 0, entriesPerPage = 15) {
    let query = {};
    let cursor;
    try {
      cursor = await feedback.find(query);
    } catch (e) {
      console.error('Unable to find command: ' + e);
      return { feedbackList: [], totalNumEntries: 0 };
    }

    const displayCursor = cursor
      .limit(entriesPerPage)
      .skip(entriesPerPage * page);
    try {
      const feedbackList = await displayCursor.toArray();
      const totalNumEntries = await feedback.countDocuments(query);

      return { feedbackList, totalNumEntries };
    } catch (e) {
      console.error(
        'Unable to convert cursor to array or problem counting documents.\n' + e
      );
      return { feedbackList: [], totalNumEntries: 0 };
    }
  }

  static async postFeedback(rideId, feedbackText) {
    try {
      const feedbackExists = await feedback.findOne({ rideId: rideId.id });
      if (feedbackExists) {
        return { error: 'You have already submitted a feedback response.' };
      }

      const newEntry = {
        rideId: rideId.id,
        text: feedbackText,
      };

      return await feedback.insertOne(newEntry);
    } catch (e) {
      console.error('FeedbackDAO: Unable to post feedback: ' + e.message);
      return { error: e.message };
    }
  }
}
