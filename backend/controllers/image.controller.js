import ImageDAO from '../dao/imageDAO.js';

export default class ImageController {
  static async apiGetImageStream(req, res, next) {
    try {
      if (!req.params || !req.params.folder || !req.params.id) {
        res.status(400).json({ error: 'Invalid request params.' });
      } else {
        const path = './uploads/' + req.params.folder + '/' + req.params.id;
        const readStream = await ImageDAO.getImageStream(path);
        if (readStream) {
          readStream.pipe(res);
        } else {
          res.status(400).json({ error: 'Image does not exist.' });
        }
      }
    } catch (e) {
      console.log('ImageController: ' + e.message);
      res.status(500).json({ error: e.message });
    }
  }
}
