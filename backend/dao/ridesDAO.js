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
        'ridesDAO: Unable to establish a connection handle in ridesDAO. ' + e
      );
    }
  }

  static async requestRide(
    shortId,
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
        shortId: shortId,
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
        status: { value: 1, text: 'New' },
      };

      return await rides.insertOne(rideDoc);
    } catch (e) {
      console.log('ridesDAO: Unable to post ride. ' + e);
      return { error: e };
    }
  }

  static async getRides(filters = null, page = 0, ridesPerPage = 15) {
    let query = {};

    if (filters) {
      if ('status' in filters) {
        /* Query documents by status */
        query = { 'status.value': filters['status'] };
      }
    }

    let cursor;

    try {
      cursor = await rides.find(query);
    } catch (e) {
      console.log('ridesDAO: Unable to issue find command. ' + e);
      return { ridesList: [], totalNumRides: 0 };
    }

    const displayCursor = cursor.limit(ridesPerPage).skip(ridesPerPage * page);

    try {
      const ridesList = await displayCursor.toArray();
      const totalNumRides = await rides.countDocuments(query);

      return { ridesList, totalNumRides };
    } catch (e) {
      console.log(
        'ridesDAO: Unable to convert cursor to array or problem counting documents.\n' +
          e
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
          'ridesDAO: Unable to issue find command with query ' +
            query +
            '\n' +
            e.message
        );
        return { error: e };
      }

      const rideList = await cursor.toArray();
      return { ride: rideList[0] };
    } catch (e) {
      console.log('ridesDAO: Error getting recipe by ID. ' + e.message);
      return { error: e };
    }
  }

  static async getStats(filters) {
    try {
      if ('status' in filters) {
        /* Query documents by status */
        const query = { 'status.value': filters['status'] };

        let count;

        try {
          count = await rides.count(query);
        } catch (e) {
          console.log('ridesDAO: Unable to issue count in getStats. ' + e);
          return { error: e };
        }

        return { filters: filters, count: count };
      }

      /* Else perform all counts */
      let result = {};
      let count;

      try {
        count = await rides.count();
        result.all = count;

        count = await rides.count({ 'status.value': 1 });
        result.new = count;

        count = await rides.count({ 'status.value': 2 });
        result.inProgress = count;

        count = await rides.count({ 'status.value': 3 });
        result.approved = count;

        count = await rides.count({ 'status.value': 4 });
        result.rejected = count;

        count = await rides.count({ 'status.value': 5 });
        result.unsure = count;

        count = await rides.count({ 'status.value': 6 });
        result.done = count;
      } catch (e) {
        console.log('ridesDAO: Unable to issue count in getStats. ' + e);
        return { error: e };
      }

      return { filters: {}, count: result };
    } catch (e) {
      console.log('ridesDAO: Error getting stats. ' + e.message);
      return { error: e };
    }
  }

  static async editRideById(
    id,
    lastEditedBy,
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
            lastEditedBy: lastEditedBy,
            coupon: coupon,
            notes: notes,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.log('ridesDAO: Unable to update ride (' + id + '). ' + e);
      return { error: e };
    }
  }
}
