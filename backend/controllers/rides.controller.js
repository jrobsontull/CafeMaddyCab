import RidesDAO from '../dao/ridesDAO.js';

export default class RidesController {
  /* Post request for ride */
  static async apiRequestRide(req, res, next) {
    try {
      const dateRequested = new Date();
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const identity = req.body.identity;
      const income = req.body.income;
      const purpose = req.body.purpose;
      const selfie = req.body.selfie;
      const photoId = req.body.photoId;

      const ridesResponse = await RidesDAO.requestRide(
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
        entires_per_page: ridesPerPage,
        total_results: totalNumRides,
      };

      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
