import { useEffect, useState, useContext } from 'react';
import FeedbackAPI from '../../utils/feedback.api';
import AuthContext from '../../utils/auth.context';

import Navbar from './Navbar';
import ViewFeedback from './ViewFeedback';

function Feedback() {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [feedbackData, setFeedbackData] = useState({
    totalEntries: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const entiresPerPage = 15;

  const [selectedRideId, setSelectedRideId] = useState('');
  const [selectedFeedbackText, setSelectedFeedbackText] = useState('');
  const [openFeedbackEntryView, setOpenFeedbackEntryView] = useState(false);

  function calculateTotalPageNums(numPerPage, totalEntries) {
    let count = 1;
    let tracker = totalEntries;
    while (tracker > numPerPage) {
      tracker -= numPerPage;
      count += 1;
    }
    return count;
  }

  function nextPage() {
    if (
      feedbackData.totalPages > 1 &&
      feedbackData.totalPages - 1 !== feedbackData.currentPage
    ) {
      const pageToScrollTo = feedbackData.currentPage + 1;
      FeedbackAPI.getFeedback('page=' + pageToScrollTo, user.user.token).then(
        (response) => {
          setEntries(response.entries);
          setFeedbackData((prevData) => ({
            ...prevData,
            currentPage: pageToScrollTo,
          }));
        }
      );
    }
  }

  function prevPage() {
    if (feedbackData.currentPage > 0) {
      const pageToScrollTo = feedbackData.currentPage - 1;
      FeedbackAPI.getFeedback('page=' + pageToScrollTo, user.user.token).then(
        (response) => {
          setEntries(response.entries);
          setFeedbackData((prevData) => ({
            ...prevData,
            currentPage: pageToScrollTo,
          }));
        }
      );
    }
  }

  function viewFeedbackEntry(rideId, text) {
    setSelectedRideId(rideId);
    setSelectedFeedbackText(text);
    setOpenFeedbackEntryView(true);
  }

  function closeFeedbackEntryView() {
    setOpenFeedbackEntryView(false);
  }

  useEffect(() => {
    FeedbackAPI.getFeedback(null, user.user.token).then((response) => {
      setEntries(response.entries);
      setFeedbackData({
        totalEntries: response.totalResults,
        currentPage: 0,
        totalPages: calculateTotalPageNums(
          entiresPerPage,
          response.totalResults
        ),
      });
    });
  }, [user.user.token]);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        {openFeedbackEntryView && (
          <ViewFeedback
            onClose={closeFeedbackEntryView}
            rideId={selectedRideId}
            feedbackText={selectedFeedbackText}
          />
        )}

        <div className="feedback">
          <div className="menu">
            <div className="search-options">
              <ul>
                <li>All feedback (X)</li>
                <li>Filter by date</li>
                <li>Search for feedback</li>
              </ul>
            </div>
            <div className="action-btns">
              <div className="action" id="last-child">
                Delete feedback
              </div>
            </div>
          </div>

          <div className="table-content">
            <div className="table-headings">
              <ul>
                <li id="col-1">Entry #</li>

                <li id="col-2">Feedback</li>
              </ul>
            </div>

            <div className="table-entries">
              {entries ? (
                entries.map((entry, index) => (
                  <div className="entry" key={entry._id}>
                    <ul
                      onClick={() =>
                        viewFeedbackEntry(entry.rideId, entry.text)
                      }
                    >
                      <li id="col-1">
                        {feedbackData.currentPage * entiresPerPage +
                          (index + 1)}
                      </li>
                      <li id="col-2">{entry.text}</li>
                    </ul>
                  </div>
                ))
              ) : (
                <div className="entry">
                  <ul>
                    <li id="col-1">No data.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="table-footer">
              {feedbackData.totalPages > 1 ? (
                <div className="nav">
                  {feedbackData.currentPage === 0 ? (
                    <div
                      className="arrow left disabled"
                      onClick={() => prevPage()}
                    ></div>
                  ) : (
                    <div
                      className="arrow left"
                      onClick={() => prevPage()}
                    ></div>
                  )}

                  <div>
                    Page {feedbackData.currentPage + 1} of{' '}
                    {feedbackData.totalPages}
                  </div>

                  {feedbackData.currentPage === feedbackData.totalPages - 1 ? (
                    <div
                      className="arrow right disabled"
                      onClick={() => nextPage()}
                    ></div>
                  ) : (
                    <div
                      className="arrow right"
                      onClick={() => nextPage()}
                    ></div>
                  )}
                </div>
              ) : (
                <div className="nav">
                  <div
                    className="arrow left disabled"
                    onClick={() => prevPage()}
                  ></div>
                  <div>
                    Page {feedbackData.currentPage + 1} of{' '}
                    {feedbackData.totalPages}
                  </div>
                  <div
                    className="arrow right disabled"
                    onClick={() => nextPage()}
                  ></div>
                </div>
              )}
              <div className="download-btn">Download CSV</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
