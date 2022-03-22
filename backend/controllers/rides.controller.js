import RidesDAO from "../dao/ridesDAO.js";
import { UUID } from "bson";

export default class RidesController {
  /* Post request for ride */
  static async apiRequestRide(req, res, next) {
    try {
      const userId = new UUID().toString();
      const dateRequested = new Date();
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const identity = req.body.identity;
      const income = req.body.income;
      const purpose = req.body.purpose;
      const photo = req.body.photo;
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
        photo,
        photoId
      );
      res.json(ridesResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
