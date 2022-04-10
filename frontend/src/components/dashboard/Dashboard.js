import { useEffect, useState } from 'react';
import RidesAPI from '../../utils/rides.api';

import Navbar from './Navbar';
import ViewEntry from './ViewEntry';

function Dashboard() {
  const [rides, setRides] = useState([]);
  const [ridesData, setRidesData] = useState({
    totalRides: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const entiresPerPage = 15;

  const [selectedRideId, setSelectedRideId] = useState();
  const [openRideEntryView, setOpenRideEntryView] = useState(false);

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
      RidesAPI.getRides('page=' + pageToScrollTo).then((response) => {
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
      RidesAPI.getRides('page=' + pageToScrollTo).then((response) => {
        setRides(response.rides);
        setRidesData((prevData) => ({
          ...prevData,
          currentPage: pageToScrollTo,
        }));
      });
    }
  }

  function viewRideEntry(rideId) {
    setSelectedRideId(rideId);
    setOpenRideEntryView(true);
  }

  function closeRideEntryView() {
    setOpenRideEntryView(false);
  }

  function searchRides(status = null) {
    if (status) {
      RidesAPI.getRides('status=' + status).then((response) => {
        setRides(response.rides);
        setRidesData({
          totalRides: response.totalResults,
          currentPage: 0,
          totalPages: calculateTotalPageNums(
            entiresPerPage,
            response.totalResults
          ),
        });
      });
    } else {
      RidesAPI.getRides().then((response) => {
        setRides(response.rides);
        setRidesData({
          totalRides: response.totalResults,
          currentPage: 0,
          totalPages: calculateTotalPageNums(
            entiresPerPage,
            response.totalResults
          ),
        });
      });
    }
  }

  useEffect(() => {
    RidesAPI.getRides().then((response) => {
      setRides(response.rides);
      setRidesData({
        totalRides: response.totalResults,
        currentPage: 0,
        totalPages: calculateTotalPageNums(
          entiresPerPage,
          response.totalResults
        ),
      });
    });
  }, []);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        {openRideEntryView ? (
          <ViewEntry onClose={closeRideEntryView} rideId={selectedRideId} />
        ) : (
          ''
        )}

        <div className="dashboard">
          <div className="menu">
            <div className="search-options">
              <ul>
                <li onClick={() => searchRides()}>All ride requests (X)</li>
                <li onClick={() => searchRides('New')}>New requests (X)</li>
                <li onClick={() => searchRides('In progress')}>
                  In progress requests (X)
                </li>
                <li>Approved (X)</li>
                <li>Rejected (X)</li>
                <li>Done (X)</li>
                <li>Search for request</li>
              </ul>
            </div>
            <div className="action-btns">
              <div className="action">Approve requests</div>
              <div className="action">Edit request</div>
              <div className="action">Send codes</div>
              <div className="action" id="last-child">
                Mark as done
              </div>
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
                      <li id="col-2">{ride.userId}</li>
                      <li id="col-3">{ride.firstName}</li>
                      <li id="col-4">{ride.lastName}</li>
                      <li id="col-5">{ride.email}</li>
                      <li id="col-6">{ride.identity.text}</li>
                      <li id="col-7">{ride.income ? 'yes' : 'no'}</li>
                      <li id="col-8">{ride.purpose.text}</li>
                      <li id="col-9">
                        {ride.verified ? 'verified' : 'unverified'}
                      </li>
                      <li id="col-10">
                        {ride.approver ? ride.approver : 'N/A'}
                      </li>
                      <li id="col-11">{ride.coupon ? ride.coupon : 'N/A'}</li>
                      <li id="col-12">{ride.status}</li>
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

              <div className="download-btn">Download CSV</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
