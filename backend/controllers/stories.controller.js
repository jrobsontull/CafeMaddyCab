import StoriesDAO from '../dao/storiesDAO.js';

export default class StoriesController {
  /* GET stories from DB and return JSON response */
  static async apiGetStories(req, res, next) {
    try {
      const entriesPerPage = req.query.entriesPerPage
        ? parseInt(req.query.entriesPerPage, 10)
        : 15;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;
      const { storiesList, totalNumEntries } = await StoriesDAO.getStories(
        page,
        entriesPerPage
      );

      let response = {
        entries: storiesList,
        page: page,
        entiresPerPage: entriesPerPage,
        totalResults: totalNumEntries,
      };
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  /* POST stories to MongoDB Stories collection */
  static async apiPostStory(req, res, next) {
    const rideId = req.body.rideId;
    const storyText = req.body.text;
    const share = req.body.share;
    const storiesResponse = await StoriesDAO.postStory(
      rideId,
      storyText,
      share
    );
    res.json(storiesResponse);
  }
  catch(e) {
    res.status(500).json({ error: e.message });
  }
}
