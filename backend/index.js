import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import RidesDAO from './dao/ridesDAO.js';
import AuthDAO from './dao/authDAO.js';
import FeedbackDAO from './dao/feedbackDAO.js';
import StoriesDAO from './dao/storiesDAO.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8080;
let db_uri = process.env.CAFEMADDYCAB_DB_URI_DEV;

if (process.env.NODE_ENV === 'production') {
  db_uri = process.env.CAFEMADDYCAB_DB_URI_PRODUCTION;
  console.log('Production mode enabled.');
}

MongoClient.connect(db_uri, {
  maxPoolSize: 60,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.log('MongoDB database connection error.');
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RidesDAO.injectRidesDB(client);
    await AuthDAO.injectAuthDB(client);
    await FeedbackDAO.injectFeedbackDB(client);
    await StoriesDAO.injectStoriesDB(client);
    await RidesDAO.loadRestrictedList();

    app.listen(port, () => {
      console.log('Listening on port ' + port);
    });
  });
