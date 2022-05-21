import RidesDAO from '../dao/ridesDAO.js';
import ImageDAO from '../dao/imageDAO.js';
import StoriesController from './stories.controller.js';
import { nanoid } from 'nanoid/async';
import { parseAsync } from 'json2csv';
import { parse } from 'csv-parse';

export default class RidesController {
  // POST request for single ride request
  static async apiRequestRide(req, res, next) {
    try {
      // Async generate short ID for reference
      const shortId = await nanoid(10);

      // POST story if present
      try {
        const storyText = req.body.storyText;
        if (storyText && storyText !== '') {
          const shareable = req.body.storySharable;
          const storyResponse = await StoriesController.apiPostStory(
            storyText,
            shortId || 'Error',
            shareable
          );
          if (
            storyResponse.hasOwnProperty("'error'") ||
            storyResponse.hasOwnProperty('error')
          ) {
            res.status(400).json({ error: storyResponse.error });
            return;
          }
        }
      } catch (storyError) {
        console.error('RidesDAO: Failed to post story. ' + storyError);
      }

      // Continue with rest of POST req elsewise
      // Get NYC current date/time
      const dateRequested = new Date();

      const firstName = req.body.firstName.trim();
      const lastName = req.body.lastName.trim();
      const email = req.body.email.trim().toLowerCase();

      const identityOption = parseInt(req.body.identity, 10);
      let identity;
      switch (identityOption) {
        case 1:
          identity = { value: 1, text: 'Asian female' };
          break;
        case 2:
          identity = { value: 2, text: 'Asian LGBTQ+' };
          break;
        case 3:
          identity = { value: 3, text: 'Asian elderly person' };
          break;
        case 4:
          identity = {
            value: 4,
            text: 'I am submitting on behalf of an Asian Elderly person',
          };
          break;
      }

      const income = req.body.income;

      const purposeOption = parseInt(req.body.purpose, 10);
      let purpose;
      switch (purposeOption) {
        case 1:
          purpose = { value: 1, text: 'Medical appointment' };
          break;
        case 2:
          purpose = { value: 2, text: 'Vaccination' };
          break;
        case 3:
          purpose = { value: 3, text: 'Work (going to/from home)' };
          break;
        case 4:
          purpose = {
            value: 4,
            text: 'Care taking for an Asian elderly person',
          };
          break;
        case 5:
          purpose = {
            value: 5,
            text: 'Academic reasons (university, school, mandatory meeting)',
          };
          break;
        case 6:
          purpose = {
            value: 6,
            text: req.body.purposeText.trim().toLowerCase(),
          };
          break;
      }

      const selfieFile = req.files.selfie[0];
      const photoIdFile = req.files.photoId[0];

      const selfie = {
        fileName: selfieFile.filename,
        mimeType: selfieFile.mimetype,
        path: selfieFile.path.replace('uploads\\', '').replace('uploads/', ''),
        size: selfieFile.size,
        exists: true,
      };
      const photoId = {
        fileName: photoIdFile.filename,
        mimeType: photoIdFile.mimetype,
        path: photoIdFile.path.replace('uploads\\', '').replace('uploads/', ''),
        size: photoIdFile.size,
        exists: true,
      };

      // Check for duplicate
      let isDuplicate = false;
      if (await RidesDAO.checkForDuplicate(email)) {
        isDuplicate = true;
      }

      const ridesResponse = await RidesDAO.requestRide(
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
      );

      res.json(ridesResponse);
    } catch (e) {
      console.log('RidesController: Failed to push ride. ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }

  // General GET request for ride quieries
  static async apiGetRides(req, res, next) {
    try {
      const ridesPerPage = req.query.ridesPerPage
        ? parseInt(req.query.ridesPerPage, 10)
        : 15;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;

      let filters = {};
      if (req.query.status) {
        filters.status = parseInt(req.query.status, 10);
      }
      if (req.query.approverId) {
        filters.approverId = req.query.approverId;
      }
      if (req.query.isDuplicate) {
        filters.isDuplicate = req.query.isDuplicate;
      }
      if (req.query.email) {
        filters.email = req.query.email;
      }
      if (req.query.firstName) {
        filters.firstName = req.query.firstName;
      }
      if (req.query.lastName) {
        filters.firstName = req.query.lastName;
      }

      const { ridesList, totalNumRides } = await RidesDAO.getRides(
        filters,
        page,
        ridesPerPage
      );

      let response = {
        rides: ridesList,
        page: page,
        filters: filters,
        entiresPerPage: ridesPerPage,
        totalResults: totalNumRides,
      };

      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // GET request to get ride by _id
  static async apiGetRideById(req, res, next) {
    try {
      let id = req.query.id || {};
      let ride = await RidesDAO.getRideById(id);

      if (ride.hasOwnProperty("'error'") || ride.hasOwnProperty('error')) {
        res.status(400).json({ error: ride.error });
      } else {
        if (!ride.ride) {
          res.status(404).json({ error: 'Ride not found.' });
        } else {
          res.json(ride);
        }
      }
    } catch (e) {
      console.log('RidesController: Failed to get ride by ID. ' + e.message);
      res.status(500).json({ error: e });
    }
  }

  // GET request for general DB stats on rides
  static async apiGetStats(req, res, next) {
    try {
      let filters = {};
      if (req.query.status) {
        filters.status = parseInt(req.query.status, 10);
      }

      const statsResponse = await RidesDAO.getStats(filters);

      if (
        statsResponse.hasOwnProperty("'error'") ||
        statsResponse.hasOwnProperty('error')
      ) {
        res.status(400).json({ error: statsResponse.error });
        return;
      }

      res.json(statsResponse);
    } catch (e) {
      console.log('RidesController: Failed to get stats. ' + e.message);
      res.status(500).json({ error: e });
    }
  }

  // PUT request for making edits to specific ride
  static async apiEditRideById(req, res, next) {
    try {
      const id = req.body._id;
      const lastEditedBy = req.body.lastEditedBy;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const identity = req.body.identity;
      const status = req.body.status;
      const approver = req.body.approver;
      const coupon = req.body.coupon || null;
      const notes = req.body.notes || null;
      let photoId = req.body.photoId;
      let selfie = req.body.selfie;
      let verified = req.body.verified;

      // Delete image if status set to Approved or Rejected and photo exists
      const newStatus = parseInt(status.value, 10);
      let isPhotoIdDeleted = false;
      let isSelfieDeleted = false;

      if (newStatus === 3 || newStatus === 4) {
        if (photoId.exists === true) {
          const photoIdDeletion = await ImageDAO.deleteImage(
            './uploads/' + photoId.path
          );

          if (
            photoIdDeletion.hasOwnProperty('error') ||
            photoIdDeletion.hasOwnProperty("'error'")
          ) {
            console.warn(
              'RidesController: Failed to delete image on ride edit. ' +
                photoIdDeletion.error
            );
          } else {
            isPhotoIdDeleted = true;
          }
        }

        if (selfie.exists === true) {
          const selfieDeletion = await ImageDAO.deleteImage(
            './uploads/' + selfie.path
          );

          if (
            selfieDeletion.hasOwnProperty('error') ||
            selfieDeletion.hasOwnProperty("'error'")
          ) {
            console.warn(
              'RidesController: Failed to delete image on ride edit. ' +
                selfieDeletion.error
            );
          } else {
            isSelfieDeleted = true;
          }
        }
      }

      // And update photo OBJs
      if (isPhotoIdDeleted) {
        photoId.exists = false;
        verified = true;
      }

      if (isSelfieDeleted) {
        selfie.exists = false;
        verified = true;
      }

      // Edit ride details
      const rideResponse = await RidesDAO.editRideById(
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
      );

      // Return JSON after ride edit
      if (
        rideResponse.hasOwnProperty("'error'") ||
        rideResponse.hasOwnProperty('error')
      ) {
        res.status(400).json({ error: rideResponse.error });
        return;
      }

      if (rideResponse.value === null) {
        /* Ride not updated */
        throw new Error(
          'RidesController: Unable to update the ride. Might be an auth problem.'
        );
      } else {
        res.json({ status: 'success' });
      }
    } catch (e) {
      console.log('RidesController: Failed to edit ride by ID. ' + e.message);
      res.status(500).json({ error: e });
    }
  }

  // Set status of rides to in progress and get rides back
  static async apiSetRidesInProgress(req, res, next) {
    try {
      const newRides = await RidesDAO.getStats({ status: 1 });
      const ridesToApprove = req.body.ridesToApprove;
      const approver = req.body.approver;
      if (ridesToApprove) {
        const toApprove = parseInt(ridesToApprove, 10);
        if (toApprove <= newRides.count) {
          const response = await RidesDAO.setRidesInProgress(
            toApprove,
            approver
          );

          if (
            response.hasOwnProperty("'error'") ||
            response.hasOwnProperty('error')
          ) {
            res.status(500).json({ error: response.error });
            return;
          }

          res.json(response);
        } else {
          res.status(400).json({
            error: "Can't approve more rides than there are new ride requests.",
          });
        }
      } else {
        res
          .status(400)
          .json({ error: 'Number of rides to approve not specified.' });
      }
    } catch (e) {
      console.log(
        'RidesController: Failed to set rides to in progress. ' + e.message
      );
      res.status(500).json({ error: e });
    }
  }

  static async apiUnsetRidesInProgress(req, res, next) {
    try {
      const approverId = req.body.approverId;

      const response = await RidesDAO.unsetRidesInProgress(approverId);

      if (
        response.hasOwnProperty("'error'") ||
        response.hasOwnProperty('error')
      ) {
        res.status(500).json({ error: response.error });
        return;
      }

      res.json(response);
    } catch (e) {
      console.log(
        'RidesController: Failed to unset rides in progress status. ' +
          e.message
      );
      res.status(500).json({ error: e });
    }
  }

  static async apiApproveRides(req, res, next) {
    try {
      const ridesObj = req.body.rides;
      const notesObj = req.body.notes;
      const approver = req.body.approver;

      let ridesArr = [];
      let notesArr = [];

      // Catching errors and bad input
      if (isObjEmpty(ridesObj)) {
        ridesArr = null;
      }

      if (isObjEmpty(notesObj)) {
        notesArr = null;
      }

      if (ridesArr === null && notesArr === null) {
        // Return error
        res.status(400).json({
          error: 'No rides set for approval or notes to update.',
        });
      } else {
        // Parse data into arrays for easier handling
        for (var key in ridesObj) {
          ridesArr.push({
            _id: key,
            stateToSet: ridesObj[key].stateToSet,
          });
        }

        for (var key in notesObj) {
          notesArr.push({ _id: key, notes: notesObj[key].notes });
        }

        const response = await RidesDAO.approveRides(
          ridesArr,
          notesArr,
          approver
        );

        if (
          response.hasOwnProperty("'error'") ||
          response.hasOwnProperty('error')
        ) {
          res.status(500).json({ error: response.error });
          return;
        }

        res.json(response);
      }
    } catch (e) {
      console.log('RidesController: Failed to approve rides. ' + e.message);
      res.status(500).json({ error: e });
    }
  }

  // API controller for getting a rides OBJ containing rides with approved status
  static async apiSendCodes(req, res, next) {
    try {
      let fromDate;
      let toDate;
      let response;

      if (req.query.fromDate && req.query.toDate) {
        fromDate = new Date(req.query.fromDate);
        toDate = new Date(req.query.toDate);
        // Increment toDate by 24 hours and account for UTC time difference
        toDate.setHours(toDate.getHours() + 24 + 5);

        response = await RidesDAO.sendCodes(fromDate, toDate);
      } else {
        response = await RidesDAO.sendCodes();
      }

      if (
        response.hasOwnProperty("'error'") ||
        response.hasOwnProperty('error')
      ) {
        res.status(500).json({ error: response.error });
        return;
      }

      // Format dates in response to NYC date
      let ridesObj = [];
      for (var ride in response) {
        const currentNycLocale = response[ride].dateRequested.toLocaleString(
          'en-US',
          {
            timeZone: 'America/New_York',
          }
        );

        let formatedLocale = currentNycLocale.split(',')[0];
        response[ride].dateRequested = formatedLocale;
        ridesObj.push(response[ride]);
      }

      // Convert JSON array to CSV
      const fields = [
        '_id',
        'dateRequested',
        'firstName',
        'lastName',
        'email',
        'coupon',
      ];
      const opts = { fields };
      const csv = await parseAsync(response, opts);

      // Send response
      res.attachment('rides.csv');
      res.send(csv);
    } catch (e) {
      console.log(
        'RidesController: Failed to get rides for sending codes to. ' +
          e.message
      );
      res.status(500).json({ error: e });
    }
  }

  // API controller for marking rides as done and appending coupons
  static async apiMarkAsDone(req, res, next) {
    try {
      const csvString = await req.file.buffer.toString();
      let parsedCsv = await parseCsvString(csvString);
      parsedCsv.shift(); // remove headers

      const response = await RidesDAO.markAsDone(parsedCsv);

      if (
        response.hasOwnProperty("'error'") ||
        response.hasOwnProperty('error')
      ) {
        res.status(500).json({ error: response.error });
      } else {
        res.json(response);
      }
    } catch (e) {
      console.log(
        'RidesController: Failed to mark rides as done and append ride coupons. ' +
          e.message
      );
      res.status(500).json({ error: e });
    }
  }

  // API controller for getting all rides and converting to CSV for download
  static async apiDownloadRides(req, res, next) {
    try {
    } catch (e) {
      console.log(
        'RidesController: Failed to get rides to download. ' + e.message
      );
      res.status(500).json({ error: e });
    }
  }
}

// Check if obj is empty and return bool
function isObjEmpty(obj) {
  for (var key in obj) return false;
  return true;
}

// Parse UTF-8 string to CSV asynchronously
function parseCsvString(input) {
  return new Promise((resolve, reject) => {
    function callback(err, output) {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    }
    parse(input, callback);
  });
}
