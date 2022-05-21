import mongodb from 'mongodb';
import ImageDAO from './imageDAO.js';

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
    photoId,
    isDuplicate
  ) {
    try {
      let rideDoc = {
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
        isDuplicate: isDuplicate,
      };

      return await rides.insertOne(rideDoc);
    } catch (e) {
      console.error('ridesDAO: Unable to post ride. ' + e);
      return { error: e };
    }
  }

  // Get all rides based on filters
  static async getRides(
    filters = null,
    page = 0,
    ridesPerPage = 15,
    returnCursor = false
  ) {
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

      if ('isDuplicate' in filters) {
        query = {
          isDuplicate: filters['isDuplicate'] === 'true',
          $or: [
            { 'status.value': 1 },
            { 'status.value': 2 },
            { 'status.value': 3 },
            { 'status.value': 4 },
            { 'status.value': 5 },
          ],
        };
      }

      // For searching rides with search window
      if ('email' in filters) {
        query.email = filters['email'];
      }
      if ('firstName' in filters) {
        query.firstName = filters['firstName'];
      }
      if ('lastName' in filters) {
        query.lastName = filters['lastName'];
      }
    }

    let cursor;

    if (returnCursor) {
      // Return search cursor for further processing
      try {
        cursor = await rides.find(query);
        const displayCursor = cursor.toArray();
        return displayCursor;
      } catch (e) {
        console.error('ridesDAO: Unable to issue find command. ' + e);
        return null;
      }
    } else {
      // Return array of rides
      try {
        cursor = await rides.find(query);
      } catch (e) {
        console.error('ridesDAO: Unable to issue find command. ' + e);
        return { ridesList: [], totalNumRides: 0 };
      }

      const displayCursor = cursor
        .limit(ridesPerPage)
        .skip(ridesPerPage * page);

      try {
        const ridesList = await displayCursor.toArray();
        const totalNumRides = await rides.countDocuments(query);

        return { ridesList, totalNumRides };
      } catch (e) {
        console.error(
          'ridesDAO: Unable to convert cursor to array or problem counting documents.\n' +
            e
        );
        return { ridesList: [], totalNumRides: 0 };
      }
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
        console.error(
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
      console.error('ridesDAO: Error getting recipe by ID. ' + e.message);
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
          console.error('ridesDAO: Unable to issue count in getStats. ' + e);
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

        count = await rides.count({
          isDuplicate: true,
          $or: [
            { 'status.value': 1 },
            { 'status.value': 2 },
            { 'status.value': 3 },
            { 'status.value': 4 },
            { 'status.value': 5 },
          ],
        });
        result.duplicates = count;
      } catch (e) {
        console.error('ridesDAO: Unable to issue count in getStats. ' + e);
        return { error: e };
      }

      return { filters: {}, count: result };
    } catch (e) {
      console.error('ridesDAO: Error getting stats. ' + e.message);
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
    approver,
    coupon,
    notes,
    photoId,
    selfie,
    verified
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
            approver: approver,
            lastEditedBy: lastEditedBy,
            coupon: coupon,
            notes: notes,
            photoId: photoId,
            selfie: selfie,
            verified: verified,
          },
        }
      );

      return updateResponse;
    } catch (e) {
      console.error('ridesDAO: Unable to update ride (' + id + '). ' + e);
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
        console.error('ridesDAO: Unable to issue find command. ' + e);
        return { error: e };
      }

      // Limit search to number of rides to apporove
      const ridesToSet = await cursor.limit(toApprove).toArray();

      // Set rides by ID to correct status and approver fields
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
        console.warn(
          'ridesDAO: Failed to set all rides requested to in progress.'
        );
        return {
          error: 'Not all rides requested could be set to in progress.',
        };
      }
    } catch (e) {
      console.error('ridesDAO: Unable to set in progress state on rides. ' + e);
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
        console.error('ridesDAO: Unable to issue find command. ' + e);
        return { error: e };
      }

      const ridesToUpdate = await cursor.toArray();

      /* Set rides by ID to new status and null approver field */
      let responses = [];
      for (const ride of ridesToUpdate) {
        responses.push(
          await rides.findOneAndUpdate(
            { _id: ride._id, 'status.value': 2 },
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
        console.warn(
          'ridesDAO: Failed to revert all in progress rides to new.'
        );
        return {
          error: 'Not all rides requested could be set to new.',
        };
      }
    } catch (e) {
      console.error(
        'ridesDAO: Unable to unset in progress state on rides. ' + e
      );
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
        let imagePaths = [];

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

          const foundRide = await rides.findOne({ _id: ObjectId(ride._id) });

          if (newStatus === 3 || newStatus === 4) {
            // Marked as Approved or Rejected
            rideResponses.push(
              await rides.findOneAndUpdate(
                { _id: ObjectId(ride._id) },
                {
                  $set: {
                    status: { value: newStatus, text: newStatusText },
                    verified: true,
                    'selfie.exists': false,
                    'photoId.exists': false,
                  },
                }
              )
            );

            // Mark these images for deletion
            if (foundRide.photoId.exists) {
              imagePaths.push('./uploads/' + foundRide.photoId.path);
            }
            if (foundRide.selfie.exists) {
              imagePaths.push('./uploads/' + foundRide.selfie.path);
            }
          } else {
            // Marked as unsure and don't mark images for deletion
            rideResponses.push(
              await rides.findOneAndUpdate(
                { _id: ObjectId(ride._id) },
                {
                  $set: {
                    status: { value: newStatus, text: newStatusText },
                    verified: true,
                  },
                }
              )
            );
          }
        }

        // Now delete images
        const deleteResponse = await ImageDAO.bulkDelete(imagePaths);

        // And log any errors
        for (const response of deleteResponse) {
          if (
            response[1].hasOwnProperty('error') ||
            response[1].hasOwnProperty("'error'")
          ) {
            console.warn(
              'RideDAO: Failed to delete image ' +
                response[0] +
                '. ' +
                response[1].error
            );
          }
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
          console.warn('ridesDAO: Failed to set approval status of all rides.');
          return {
            error:
              'Not all rides requested could be set to their approval states.',
          };
        } else if (notesResponses.length !== notesToUpdate.length) {
          // Notes not all updated
          console.warn(
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
      console.error('ridesDAO: Failed to approve rides. ' + e);
      return { error: e };
    }
  }

  // Get rides OBJ with approved status to then send codes to
  static async sendCodes(fromDate = null, toDate = null) {
    try {
      let query = { 'status.value': 3 };

      if (fromDate && toDate) {
        // Date specified
        query = {
          'status.value': 3,
          dateRequested: { $gt: fromDate, $lt: toDate },
        };
      }

      let cursor;

      try {
        cursor = await rides.find(query);
      } catch (e) {
        console.error('ridesDAO: Unable to issue find command. ' + e);
        return { error: e };
      }

      const displayCursor = cursor.toArray();
      return displayCursor;
    } catch (e) {
      console.error(
        'ridesDAO: Failed to find approved rides for sending codes to. ' + e
      );
      return { error: e };
    }
  }

  // Mark rides as done and attach coupon codes
  static async markAsDone(ridesToUpdate) {
    try {
      let responses = [];
      for (const ride of ridesToUpdate) {
        const _id = ride[0];
        const coupon = ride[5];

        responses.push(
          await rides.findOneAndUpdate(
            { _id: ObjectId(_id) },
            { $set: { status: { value: 6, text: 'Done' }, coupon: coupon } }
          )
        );
      }

      // Error checking
      if (responses.length === ridesToUpdate.length) {
        return { status: 'success' };
      } else {
        console.warn(
          'ridesDAO: Failed to mark all rides as done and attach coupons.'
        );
        return {
          error: 'Failed to mark all rides as done and attach coupons.',
        };
      }
    } catch (e) {
      console.error(
        'ridesDAO: Failed to mark rides as done and attach coupons. ' + e
      );
      return { error: e };
    }
  }

  // Check for possible ride duplicates before saving new ride to DB
  static async checkForDuplicate(email) {
    try {
      const query = {
        email: email,
        $or: [
          { 'status.value': 1 },
          { 'status.value': 2 },
          { 'status.value': 3 },
          { 'status.value': 4 },
          { 'status.value': 5 },
        ],
      };
      let cursor;

      try {
        cursor = await rides.find(query);
      } catch (e) {
        console.error(
          'ridesDAO: Unable to issue find command with query ' +
            query +
            '\n' +
            e.message
        );
        return false;
      }

      const foundRides = await cursor.toArray();
      if (foundRides.length > 0) {
        try {
          // Set found rides to duplicate status
          for (const ride of foundRides) {
            await rides.findOneAndUpdate(
              { _id: ObjectId(ride._id) },
              { $set: { isDuplicate: true } }
            );
          }
        } catch (e) {
          console.error(
            'ridesDAO: Failed to update found duplicates with isDuplicate = true. ' +
              e
          );
        }
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error('ridesDAO: Failed to find duplicates. ' + e);
      return false;
    }
  }
}
