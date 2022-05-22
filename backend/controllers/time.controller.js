export default class TimeController {
  // Return bool for whether form should be open
  static async apiIsFormOpen(req, res, next) {
    try {
      const utcNow = new Date();
      const dateLocale = utcNow.toLocaleDateString('en-US', {
        timeZone: 'America/New_York',
      });
      const nycCurrentDay = new Date(dateLocale).getDay();
      if (nycCurrentDay > 0 && nycCurrentDay < 4) {
        res.json({ open: true });
      } else {
        res.json({ open: false });
      }
    } catch (e) {
      console.error(
        'TimeController: Failed to check if form should be open. ' + e
      );
      res.status(500).json({ error: e.message });
    }
  }
}
