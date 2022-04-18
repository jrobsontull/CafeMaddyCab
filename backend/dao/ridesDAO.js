import mongodb from 'mongodb';

const ObjectId = mongodb.ObjectId;

let rides;

export default class RidesDAO {
  // Establish DB connection
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

  // Request a ride by POSTing to DB
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

  // Get all rides based on filters
  static async getRides(filters = null, page = 0, ridesPerPage = 15) {
    let query = {};

    if (filters) {
      if ('status' in filters) {
        /* Query documents by status */
        query = { 'status.value': filters['status'] };
      }

      if ('status' in filters && 'approverId' in filters) {
        /* Check for rides to approve */
        query = {
          'status.value': filters['status'],
          'approver.id': filters['approverId'],
        };
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

  // Get details about specific ride by ID
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

  // Get stats about all rides - this might take time to request and count
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

  // Edit rides by specific ID
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

  // Set new rides to in progress, ready for approving
  static async setRidesInProgress(toApprove, approver) {
    try {
      const query = { 'status.value': 1 };

      let cursor;

      try {
        cursor = await rides.find(query);
      } catch (e) {
        console.log('ridesDAO: Unable to issue find command. ' + e);
        return { error: e };
      }

      /* Limit search to number of rides to apporove */
      const ridesToSet = await cursor.limit(toApprove).toArray();

      /* Set rides by ID to correct status and approver fields */
      let responses = [];
      for (const ride of ridesToSet) {
        responses.push(
          await rides.findOneAndUpdate(
            { _id: ride._id },
            {
              $set: {
                status: { value: 2, text: 'In progress' },
                approver: approver,
              },
            }
          )
        );
      }

      if (responses.length === toApprove) {
        return { status: 'success' };
      } else {
        console.log(
          'ridesDAO: Failed to set all rides requested to in progress.'
        );
        return {
          error: 'Not all rides requested could be set to in progress.',
        };
      }
    } catch (e) {
      console.log('ridesDAO: Unable to set in progress state on rides. ' + e);
      return { error: e };
    }
  }

  // Set in progress rides back to new
  static async unsetRidesInProgress(approverId) {
    try {
      const query = { 'approver.id': approverId };

      let cursor;

      try {
        cursor = await rides.find(query);
      } catch (e) {
        console.log('ridesDAO: Unable to issue find command. ' + e);
        return { error: e };
      }

      const ridesToUpdate = await cursor.toArray();

      /* Set rides by ID to new status and null approver field */
      let responses = [];
      for (const ride of ridesToUpdate) {
        responses.push(
          await rides.findOneAndUpdate(
            { _id: ride._id },
            {
              $set: {
                status: { value: 1, text: 'New' },
                approver: null,
              },
            }
          )
        );
      }

      if (responses.length === ridesToUpdate.length) {
        return { status: 'success' };
      } else {
        console.log('ridesDAO: Failed to revert all in progress rides to new.');
        return {
          error: 'Not all rides requested could be set to new.',
        };
      }
    } catch (e) {
      console.log('ridesDAO: Unable to unset in progress state on rides. ' + e);
      return { error: e };
    }
  }

  // Set status of rides from in progress to either approved, rejected or unsure
  static async approveRides(ridesToUpdate, notesToUpdate) {
    try {
      let rideResponses = [];
      let notesResponses = [];

      // Update the status of rides
      if (ridesToUpdate) {
        for (const ride of ridesToUpdate) {
          let newStatusText;
          const newStatus = parseInt(ride.stateToSet, 10);
          switch (newStatus) {
            case 3:
              newStatusText = 'Approved';
              break;
            case 4:
              newStatusText = 'Rejected';
              break;
            case 5:
              newStatusText = 'Unsure';
              break;
          }

          rideResponses.push(
            await rides.findOneAndUpdate(
              { _id: ObjectId(ride._id) },
              {
                $set: {
                  status: { value: newStatus, text: newStatusText },
                },
              }
            )
          );
        }
      }

      // Update the notes fields separately
      if (notesToUpdate) {
        for (const ride of notesToUpdate) {
          notesResponses.push(
            await rides.findOneAndUpdate(
              { _id: ObjectId(ride._id) },
              {
                $set: {
                  notes: ride.notes,
                },
              }
            )
          );
        }
      }

      // Error checking
      if (ridesToUpdate && notesToUpdate) {
        if (
          rideResponses.length === ridesToUpdate.length &&
          notesResponses.length === notesToUpdate.length
        ) {
          // All good
          return { status: 'success' };
        } else if (rideResponses.length !== ridesToUpdate.length) {
          // Rides not all updated
          console.log('ridesDAO: Failed to set approval status of all rides.');
          return {
            error:
              'Not all rides requested could be set to their approval states.',
          };
        } else if (notesResponses.length !== notesToUpdate.length) {
          // Notes not all updated
          console.log(
            'ridesDAO: Failed to update approval notes on all rides.'
          );
          return {
            error: 'Not all rides could be updated with approval notes.',
          };
        }
      } else if (
        ridesToUpdate &&
        rideResponses.length === ridesToUpdate.length
      ) {
        // All good
        return { status: 'success' };
      } else if (
        notesToUpdate &&
        notesResponses.length === notesToUpdate.length
      ) {
        // All good
        return { status: 'success' };
      } else {
        // Else return error as no info provided
        return { error: 'No information provided to update.' };
      }
    } catch (e) {
      console.log('ridesDAO: Failed to approve rides. ' + e);
      return { error: e };
    }
  }
}
