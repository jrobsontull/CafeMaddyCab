import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import RidesDAO from './dao/ridesDAO.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;
let db_uri = process.env.CAFEMADDYCAB_DB_URI_DEV;

if (process.env.NODE_ENV === 'production') {
  db_uri = process.env.CAFEMADDYCAB_DB_URI_PRODUCTION;
  console.log('Production mode enabled.');
}

MongoClient.connect(db_uri, {
  maxPoolSize: 50,
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

    app.listen(port, () => {
      console.log('Listening on port ' + port);
    });
  });
