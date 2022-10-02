// Revalidate ride submission time window for submissions from cached pages
function validateTimeWindow(req, res, next) {
  try {
    const utcNow = new Date();
    const dateLocale = utcNow.toLocaleDateString('en-US', {
      timeZone: 'America/New_York',
    });
    const nycCurrentDay = new Date(dateLocale).getDay();
    if (nycCurrentDay > 0 && nycCurrentDay < 4) {
      next(); // move on with req
    } else {
      res.status(400).json({
        error:
          'Our submission form is currently closed. We take submissions from Monday to Wednesday each week. If you have any questions, please refer to our FAQ page.',
      });
    }
  } catch (e) {
    console.error(
      'validateTimeWindow: Failed to check if form window open during req. ' + e
    );
    res.status(500).json({ error: e.message });
  }
}

export default validateTimeWindow;
