import RidesDAO from '../dao/ridesDAO.js';
import { nanoid } from 'nanoid/async';

export default class RidesController {
  /* Post request for ride */
  static async apiRequestRide(req, res, next) {
    try {
      // Async generate short ID for reference
      const userId = await nanoid(10);

      const dateRequested = new Date();
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const identity = req.body.identity;
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
      const selfie = req.body.selfie;
      const photoId = req.body.photoId;

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

      let filters;

      const { ridesList, totalNumRides } = await RidesDAO.getRides({
        filters,
        page,
        ridesPerPage,
      });

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
}
