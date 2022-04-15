import RidesDAO from '../dao/ridesDAO.js';
import { nanoid } from 'nanoid/async';

export default class RidesController {
  /* POST request for single ride request */
  static async apiRequestRide(req, res, next) {
    try {
      // Async generate short ID for reference
      const shortId = await nanoid(10);

      const dateRequested = new Date();
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;

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
          purpose = { value: 6, text: req.body.purposeText };
          break;
      }

      const selfieFile = req.files.selfie[0];
      const photoIdFile = req.files.photoId[0];

      const selfie = {
        fileName: selfieFile.filename,
        mimeType: selfieFile.mimetype,
        path: selfieFile.path.replace('uploads\\', ''),
        size: selfieFile.size,
      };
      const photoId = {
        fileName: photoIdFile.filename,
        mimeType: photoIdFile.mimetype,
        path: photoIdFile.path.replace('uploads\\', ''),
        size: photoIdFile.size,
      };

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
        photoId
      );

      res.json(ridesResponse);
    } catch (e) {
      console.log('RidesController: Failed to push ride. ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }

  /* General GET request for ride quieries */
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

  /* GET request to get ride by _id */
  static async apiGetRideById(req, res, next) {
    try {
      let id = req.query.id || {};
      let ride = await RidesDAO.getRideById(id);

      var { error } = ride;
      if (error) {
        res.status(400).json({ error: error.message });
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

  /* GET request for general DB stats on rides */
  static async apiGetStats(req, res, next) {
    try {
      let filters = {};
      if (req.query.status) {
        filters.status = parseInt(req.query.status, 10);
      }

      const statsResponse = await RidesDAO.getStats(filters);

      var { error } = statsResponse;
      if (error) {
        res.status(400).json({ error: error.message });
      }

      res.json(statsResponse);
    } catch (e) {
      console.log('RidesController: Failed to get stats. ' + e.message);
      res.status(500).json({ error: e });
    }
  }

  /* PUT request for making edits to specific ride */
  static async apiEditRideById(req, res, next) {
    try {
      const id = req.body._id;
      const lastEditedBy = req.body.lastEditedBy;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const identity = req.body.identity;
      const status = req.body.status;
      const coupon = req.body.coupon || null;
      const notes = req.body.notes || null;

      const rideResponse = await RidesDAO.editRideById(
        id,
        lastEditedBy,
        firstName,
        lastName,
        email,
        identity,
        status,
        coupon,
        notes
      );

      var { error } = rideResponse;
      if (error) {
        res.status(400).json({ error: error.message });
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

  /* Set status of rides to in progress and get rides back */
  static async apiSetInProgress(req, res, next) {}
}
