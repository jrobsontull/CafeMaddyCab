import RidesDAO from '../dao/ridesDAO.js';
import { nanoid } from 'nanoid/async';

export default class RidesController {
  /* POST request for single ride request */
  static async apiRequestRide(req, res, next) {
    try {
      // Async generate short ID for reference
      const userId = await nanoid(10);

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

      const purposeOption = parseInt(req.body.purpose.value, 10);
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
          purpose = req.body.purpose;
          break;
      }

      //const purpose = req.body.purpose;
      let selfie = req.body.selfie;

      let selfieAltMediaView = selfie.webContentLink.replace(
        'export=download',
        'alt=media'
      );
      selfie.altMediaView = selfieAltMediaView;

      let photoId = req.body.photoId;

      let photoIdAltMediaView = photoId.webContentLink.replace(
        'export=download',
        'alt=media'
      );
      photoId.altMediaView = photoIdAltMediaView;

      const ridesResponse = await RidesDAO.requestRide(
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
      );
      res.json(ridesResponse);
    } catch (e) {
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
        filters.status = req.query.status;
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
      console.log('Failed to get ride by ID: ' + e.message);
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
      console.log(rideResponse);

      var { error } = rideResponse;
      if (error) {
        res.status(400).json({ error: error.message });
      }

      if (rideResponse.value === null) {
        /* Ride not updated */
        throw new Error('Unable to update the ride. Might be an auth problem.');
      } else {
        res.json({ status: 'success' });
      }
    } catch (e) {
      console.log('Failed to edit ride by ID: ' + e.message);
      res.status(500).json({ error: e });
    }
  }
}
