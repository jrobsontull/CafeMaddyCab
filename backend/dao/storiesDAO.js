import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;

let stories;

export default class StoriesDAO {
  static async injectStoriesDB(conn) {
    if (stories) {
      return;
    }

    try {
      // Check if production environment
      let db_uri = process.env.CAFEMADDYCAB_NS_DEV;
      if (process.env.NODE_ENV === 'production') {
        console.log('Enabling storiesDAO production mode.');
        db_uri = process.env.CAFEMADDYCAB_NS_PRODUCTION;
      }

      stories = await conn.db(db_uri).collection('stories');
    } catch (e) {
      console.error(
        'Unable to establish a connection handle in storiesDAO: ' + e
      );
    }
  }

  static async getStories(filters = null, page = 0, entriesPerPage = 15) {
    let query = {};

    if (filters) {
      if ('bookmark' in filters) {
        /* Query documents by bookmark status */
        query = { bookmark: filters['bookmark'] === 'true' };
      }

      if ('share' in filters) {
        /* Query documents by bookmark status */
        query = { share: filters['share'] === 'true' };
      }
    }

    let cursor;
    try {
      cursor = await stories.find(query);
    } catch (e) {
      console.error('Unable to find command: ' + e);
      return { storiesList: [], totalNumEntries: 0 };
    }

    const displayCursor = cursor
      .limit(entriesPerPage)
      .skip(entriesPerPage * page);
    try {
      const storiesList = await displayCursor.toArray();
      const totalNumEntries = await stories.countDocuments(query);

      return { storiesList, totalNumEntries };
    } catch (e) {
      console.error(
        'Unable to convert cursor to array or problem counting documents.\n' + e
      );
      return { storiesList: [], totalNumEntries: 0 };
    }
  }

  static async postStory(rideId, storyText, share) {
    try {
      const storiesResponse = {
        rideId: rideId,
        text: storyText,
        share: share,
        bookmark: false,
      };

      return stories.insertOne(storiesResponse);
    } catch (e) {
      console.error('Unable to post stories: ' + e);
      return { error: e };
    }
  }

  // Edit rides by specific ID
  static async editStoryById(id, rideId, text, share, bookmark) {
    try {
      const updateResponse = await stories.findOneAndUpdate(
        {
          _id: ObjectId(id),
        },
        {
          $set: {
            rideId: rideId,
            text: text,
            share: share,
            bookmark: bookmark,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error('storiesDAO: Unable to update story (' + id + '). ' + e);
      return { error: e };
    }
  }
}
