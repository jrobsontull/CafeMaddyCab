import { useEffect, useState, useContext, useCallback } from 'react';
import RidesAPI from '../../utils/rides.api';
import AuthContext from '../../utils/auth.context';

import Navbar from './Navbar';
import ViewEntry from './ViewEntry';
import ApprovalWindow from './ApprovalWindow';
import SendCodes from './SendCodes';
import MarkAsDone from './MarkAsDone';

function Dashboard() {
  // Global vars
  const { user } = useContext(AuthContext);
  const [rides, setRides] = useState([]);
  const [ridesData, setRidesData] = useState({
    totalRides: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const entiresPerPage = 15;

  // Edit ride window states
  const [selectedRideId, setSelectedRideId] = useState();
  const [openRideEntryView, setOpenRideEntryView] = useState(false);

  // Other window states
  const [openApprovalWindow, setOpenApprovalWindow] = useState(false);
  const [openSendCodesWindow, setOpenSendCodesWindow] = useState(false);
  const [openDoneWindow, setOpenDoneWindow] = useState(false);

  // Counts for status types
  const [statusCount, setStatusCount] = useState({
    all: 0,
    new: 0,
    inProgress: 0,
    approved: 0,
    rejected: 0,
    unsure: 0,
    done: 0,
  });

  // For tracking search to refresh to when close windows
  const [currentSearch, setCurrentSearch] = useState('');

  // For admin function visibility
  const [isAdmin, setIsAdmin] = useState(false);

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
      ridesData.totalPages > 1 &&
      ridesData.totalPages - 1 !== ridesData.currentPage
    ) {
      const pageToScrollTo = ridesData.currentPage + 1;

      let searchExpression = 'page=' + pageToScrollTo;
      if (currentSearch !== '') {
        searchExpression = 'page=' + pageToScrollTo + '&' + currentSearch;
      }

      RidesAPI.getRides(searchExpression, user.user.token).then((response) => {
        setRides(response.rides);
        setRidesData((prevData) => ({
          ...prevData,
          currentPage: pageToScrollTo,
        }));
      });
    }
  }

  function prevPage() {
    if (ridesData.currentPage > 0) {
      const pageToScrollTo = ridesData.currentPage - 1;

      let searchExpression = 'page=' + pageToScrollTo;
      if (currentSearch !== '') {
        searchExpression = 'page=' + pageToScrollTo + '&' + currentSearch;
      }

      RidesAPI.getRides(searchExpression, user.user.token).then((response) => {
        setRides(response.rides);
        setRidesData((prevData) => ({
          ...prevData,
          currentPage: pageToScrollTo,
        }));
      });
    }
  }

  // Window open and close functions
  function viewRideEntry(rideId) {
    window.scrollTo(0, 0);
    setSelectedRideId(rideId);
    setOpenRideEntryView(true);
  }

  function closeRideEntryView() {
    setOpenRideEntryView(false);
    searchRides(currentSearch);
  }

  function openApproval() {
    window.scrollTo(0, 0);
    setOpenApprovalWindow(true);
  }

  function closeApproval() {
    setOpenApprovalWindow(false);
  }

  function openSendCodes() {
    window.scrollTo(0, 0);
    setOpenSendCodesWindow(true);
  }

  function closeSendCodes() {
    setOpenSendCodesWindow(false);
  }

  function openMarkAsDone() {
    window.scrollTo(0, 0);
    setOpenDoneWindow(true);
  }

  function closeMarkAsDone() {
    setOpenDoneWindow(false);
    // Reset to all rides view
    searchRides();
  }

  const searchRides = useCallback(
    (params = null) => {
      if (params) {
        // Update current search
        setCurrentSearch(params);
        // Perform search
        RidesAPI.getRides(params, user.user.token).then((response) => {
          var { error } = response;
          if (error) {
            alert(error);
          } else {
            setRides(response.rides);
            setRidesData({
              totalRides: response.totalResults,
              currentPage: 0,
              totalPages: calculateTotalPageNums(
                entiresPerPage,
                response.totalResults
              ),
            });
          }
        });
      } else {
        // Update current search
        setCurrentSearch('');
        // Perform search
        RidesAPI.getRides(null, user.user.token).then((response) => {
          var { error } = response;
          if (error) {
            alert(error);
          } else {
            setRides(response.rides);
            setRidesData({
              totalRides: response.totalResults,
              currentPage: 0,
              totalPages: calculateTotalPageNums(
                entiresPerPage,
                response.totalResults
              ),
            });
          }
        });
      }
    },
    [user.user.token]
  );

  useEffect(() => {
    // Populate table with all rides
    searchRides();

    // Set status quantities in left menu - might be a CPU intensive process so be WARNED
    RidesAPI.getStats(null, user.user.token).then((response) => {
      var { error } = response;
      if (error) {
        alert(error);
      } else {
        // Everything was all good
        setStatusCount(response.count);
      }
    });

    // Check if admin for displaying elements
    if (user.user.role === 'admin') {
      setIsAdmin(true);
    }
  }, [user.user, searchRides]);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        {openRideEntryView ? (
          <ViewEntry onClose={closeRideEntryView} rideId={selectedRideId} />
        ) : (
          ''
        )}

        {openApprovalWindow ? <ApprovalWindow onClose={closeApproval} /> : ''}

        {openSendCodesWindow ? <SendCodes onClose={closeSendCodes} /> : ''}

        {openDoneWindow ? <MarkAsDone onClose={closeMarkAsDone} /> : ''}

        <div className="dashboard">
          <div className="menu">
            <div className="search-options">
              <ul>
                <li onClick={() => searchRides()}>
                  All ride requests ({statusCount.all})
                </li>
                <li onClick={() => searchRides('status=1')}>
                  New requests ({statusCount.new})
                </li>
                <li onClick={() => searchRides('status=2')}>
                  In progress requests ({statusCount.inProgress})
                </li>
                <li onClick={() => searchRides('status=3')}>
                  Approved ({statusCount.approved})
                </li>
                <li onClick={() => searchRides('status=4')}>
                  Rejected ({statusCount.rejected})
                </li>
                <li onClick={() => searchRides('status=5')}>
                  Unsure ({statusCount.unsure})
                </li>
                <li onClick={() => searchRides('isDuplicate=true')}>
                  Incomplete Duplicates ({statusCount.duplicates})
                </li>
                <li onClick={() => searchRides('status=6')}>
                  Done ({statusCount.done})
                </li>
              </ul>
            </div>
            <div className="action-btns">
              <div className="action">Search requests</div>
              <div className="action">Edit request</div>

              {isAdmin ? (
                <div className="action" onClick={() => openApproval()}>
                  Approve requests
                </div>
              ) : (
                <div
                  className="action approver-end"
                  onClick={() => openApproval()}
                >
                  Approve requests
                </div>
              )}

              {isAdmin ? (
                <div className="action" onClick={() => openSendCodes()}>
                  Send codes
                </div>
              ) : (
                ''
              )}

              {isAdmin ? (
                <div
                  className="action"
                  id="last-child"
                  onClick={() => openMarkAsDone()}
                >
                  Mark as done
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="table-content">
            <div className="table-headings">
              <ul>
                <li id="col-1">Date Requested</li>
                <li id="col-2">ID</li>
                <li id="col-3">First Name</li>
                <li id="col-4">Last Name</li>
                <li id="col-5">Email</li>
                <li id="col-6">Identity</li>
                <li id="col-7">Low Income</li>
                <li id="col-8">Ride Purpose</li>
                <li id="col-9">ID Verification</li>
                <li id="col-10">Approver</li>
                <li id="col-11">Ride Coupon</li>
                <li id="col-12">Status</li>
              </ul>
            </div>

            <div className="table-entries">
              {rides ? (
                rides.map((ride) => (
                  <div className="entry" key={ride._id}>
                    <ul onClick={() => viewRideEntry(ride._id)}>
                      <li id="col-1">
                        {new Date(ride.dateRequested).toLocaleDateString(
                          'en-us'
                        )}
                      </li>
                      <li id="col-2">{ride.shortId}</li>
                      <li id="col-3">{ride.firstName}</li>
                      <li id="col-4">{ride.lastName}</li>
                      {ride.isDuplicate ? (
                        <li id="col-5" className="is-duplicate">
                          {ride.email}
                          <div className="tooltip">
                            <span className="tooltip-text">
                              This email is already used for another ride
                              requesting a code. We only allow 2 rides a week so
                              double check this!
                            </span>
                          </div>
                        </li>
                      ) : (
                        <li id="col-5">{ride.email}</li>
                      )}
                      <li id="col-6">{ride.identity.text}</li>
                      <li id="col-7">{ride.income ? 'yes' : 'no'}</li>
                      <li id="col-8">{ride.purpose.text}</li>
                      <li id="col-9">
                        {ride.verified ? 'Verified' : 'Unverified'}
                      </li>
                      <li id="col-10">
                        {ride.approver ? ride.approver.commonName : 'N/A'}
                      </li>
                      <li id="col-11">{ride.coupon ? ride.coupon : 'N/A'}</li>
                      <li id="col-12">{ride.status.text}</li>
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
              {ridesData.totalPages > 1 ? (
                <div className="nav">
                  {ridesData.currentPage === 0 ? (
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
                    Page {ridesData.currentPage + 1} of {ridesData.totalPages}
                  </div>

                  {ridesData.currentPage === ridesData.totalPages - 1 ? (
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
                    Page {ridesData.currentPage + 1} of {ridesData.totalPages}
                  </div>
                  <div
                    className="arrow right disabled"
                    onClick={() => nextPage()}
                  ></div>
                </div>
              )}

              {isAdmin ? <div className="download-btn">Download CSV</div> : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
