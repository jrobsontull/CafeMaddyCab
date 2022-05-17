import StoriesDAO from '../dao/storiesDAO.js';

export default class StoriesController {
  /* GET stories from DB and return JSON response */
  static async apiGetStories(req, res, next) {
    try {
      const entriesPerPage = req.query.entriesPerPage
        ? parseInt(req.query.entriesPerPage, 10)
        : 15;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;

      let filters = {};
      if (req.query.bookmark) {
        filters.bookmark = req.query.bookmark;
      }
      if (req.query.share) {
        filters.share = req.query.share;
      }

      const { storiesList, totalNumEntries } = await StoriesDAO.getStories(
        filters,
        page,
        entriesPerPage
      );

      const response = {
        entries: storiesList,
        page: page,
        filters: filters,
        entiresPerPage: entriesPerPage,
        totalResults: totalNumEntries,
      };
      res.json(response);
    } catch (e) {
      console.log('StoriesController: Failed to get stories. ' + e.message);
      res.status(500).json({ error: e });
    }
  }

  /* POST stories to MongoDB Stories collection */
  static async apiPostStory(story, rideId, shareable) {
    try {
      if (story.length > 800) {
        return { error: 'Story too long. Please shorten before resubmitting.' };
      } else {
        const re =
          /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
        if (re.test(story)) {
          const storiesResponse = await StoriesDAO.postStory(
            story,
            rideId,
            shareable
          );
          return storiesResponse;
        } else {
          return {
            error:
              'Your story contains invalid characters. Remove these before resubmitting.',
          };
        }
      }
    } catch (e) {
      console.error(
        'StoriesController: Failed to post new story. ' + e.message
      );
      res.status(500).json({ error: e });
    }
  }
  catch(e) {
    console.log(
      'StoriesController: Failed to post new story from rideId ' +
        rideId +
        '. ' +
        e.message
    );
    res.status(500).json({ error: e });
  }

  /* PUT request for making edits to specific story */
  static async apiEditStoryById(req, res, next) {
    try {
      const id = req.body._id;
      const rideId = req.body.rideId;
      const text = req.body.text;
      const share = req.body.share;
      const bookmark = req.body.bookmark;

      const storyResponse = await StoriesDAO.editStoryById(
        id,
        rideId,
        text,
        share,
        bookmark
      );

      if (
        storyResponse.hasOwnProperty("'error'") ||
        storyResponse.hasOwnProperty('error')
      ) {
        res.status(400).json({ error: storyResponse.error });
        return;
      }

      if (storyResponse.value === null) {
        /* story not updated */
        throw new Error(
          'StoriesController: Unable to update the story. Might be an auth problem.'
        );
      } else {
        res.json({ status: 'success' });
      }
    } catch (e) {
      console.log(
        'StoriesController: Failed to edit story by ID. ' + e.message
      );
      res.status(500).json({ error: e });
    }
  }
}
