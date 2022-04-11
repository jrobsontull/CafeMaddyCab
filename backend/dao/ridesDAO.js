import e from 'cors';
import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;

let rides;

export default class RidesDAO {
  static async injectRidesDB(conn) {
    if (rides) {
      return;
    }
    try {
      // Check if production environment
      let db_uri = process.env.CAFEMADDYCAB_NS_DEV;
      if (process.env.NODE_ENV === 'production') {
        console.log('Enabling ridesDAO production mode.');
        db_uri = process.env.CAFEMADDYCAB_NS_PRODUCTION;
      }

      rides = await conn.db(db_uri).collection('rides');
    } catch (e) {
      console.error(
        'Unable to establish a connection handle in ridesDAO: ' + e
      );
    }
  }

  static async requestRide(
    userId,
    dateRequested,
    firstName,
    lastName,
    email,
    identity,
    income,
    purpose,
    selfie,
    photoId
  ) {
    try {
      const rideDoc = {
        userId: userId,
        dateRequested: dateRequested,
        firstName: firstName,
        lastName: lastName,
        email: email,
        identity: identity,
        income: income,
        purpose: purpose,
        selfie: selfie,
        photoId: photoId,
        verified: false,
        approver: null,
        notes: '',
        coupon: null,
        status: 'New',
      };

      return await rides.insertOne(rideDoc);
    } catch (e) {
      console.log('Unable to post ride: ' + e);
      return { error: e };
    }
  }

  static async getRides(filters = null, page = 0, ridesPerPage = 15) {
    let query = {};

    console.log(filters);

    if (filters) {
      if ('status' in filters) {
        /* Query documents by status */
        query = { status: filters['status'] };
      }
    }

    let cursor;

    try {
      cursor = await rides.find(query);
    } catch (e) {
      console.log('Unable to issue find command: ' + e);
      return { ridesList: [], totalNumRides: 0 };
    }

    const displayCursor = cursor.limit(ridesPerPage).skip(ridesPerPage * page);

    try {
      const ridesList = await displayCursor.toArray();
      const totalNumRides = await rides.countDocuments(query);

      return { ridesList, totalNumRides };
    } catch (e) {
      console.log(
        'Unable to convert cursor to array or problem counting documents.\n' + e
      );
      return { ridesList: [], totalNumRides: 0 };
    }
  }

  static async getRideById(id) {
    try {
      const query = { _id: ObjectId(id) };
      let cursor;

      try {
        cursor = await rides.find(query);
      } catch (e) {
        console.log(
          'Unable to issue find command with query: ' + query + '\n' + e.message
        );
        return { error: e };
      }

      const rideList = await cursor.toArray();
      return { ride: rideList[0] };
    } catch (e) {
      console.log('Error getting recipe by ID: ' + e.message);
      return { error: e };
    }
  }

  static async editRideById(
    id,
    editUser,
    firstName,
    lastName,
    email,
    identity,
    status,
    coupon,
    notes
  ) {
    try {
      const updateResponse = await rides.findOneAndUpdate(
        {
          _id: ObjectId(id),
        },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            identity: identity,
            status: status,
            lastEditedBy: editUser,
            coupon: coupon,
            notes: notes,
          },
        },
        { returnNewDocument: true }
      );

      return updateResponse;
    } catch (e) {
      console.log('Unable to update ride (' + id + '): ' + e);
      return { error: e };
    }
  }
}
