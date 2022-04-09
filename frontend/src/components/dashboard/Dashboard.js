import { useEffect, useState } from 'react';
import RidesAPI from '../../utils/rides.api';

import Navbar from './Navbar';

function Dashboard() {
  const [rides, setRides] = useState([]);
  const [ridesData, setRidesData] = useState({
    totalRides: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const entiresPerPage = 15;

  function calculateTotalPageNums(numPerPage, totalEntries) {
    let count = 1;
    let tracker = totalEntries;
    while (tracker > numPerPage) {
      tracker -= numPerPage;
      count += 1;
    }
    return count;
  }

  function nextPage(target) {
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

  function prevPage(target) {
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

        <div className="dashboard">
          <div className="menu">
            <div className="search-options">
              <ul>
                <li>All ride requests (X)</li>
                <li>New requests (X)</li>
                <li>In progress requests (X)</li>
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
                <li id="col-1">First Name</li>
                <li id="col-2">Last Name</li>
                <li id="col-3">Email</li>
                <li id="col-4">Identity</li>
                <li id="col-5">Low Income</li>
                <li id="col-6">Ride Purpose</li>
                <li id="col-7">ID Verification</li>
                <li id="col-8">Approver</li>
                <li id="col-9">Notes</li>
                <li id="col-10">Ride Coupon</li>
                <li id="col-11">Status</li>
              </ul>
            </div>

            <div className="table-entries">
              {rides ? (
                rides.map((ride) => (
                  <div className="entry" key={ride._id}>
                    <ul>
                      <li id="col-1">{ride.firstName}</li>
                      <li id="col-2">{ride.lastName}</li>
                      <li id="col-3">{ride.email}</li>
                      <li id="col-4">{ride.identity}</li>
                      <li id="col-5">{ride.income}</li>
                      <li id="col-6">{ride.purpose.text}</li>
                      <li id="col-7">{ride.verified}</li>
                      <li id="col-8">{ride.approver}</li>
                      <li id="col-9">{ride.notes}</li>
                      <li id="col-10">{ride.coupon}</li>
                      <li id="col-11">{ride.status}</li>
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
                      onClick={(e) => prevPage(e.target)}
                    ></div>
                  ) : (
                    <div
                      className="arrow left"
                      onClick={(e) => prevPage(e.target)}
                    ></div>
                  )}

                  <div>
                    Page {ridesData.currentPage + 1} of {ridesData.totalPages}
                  </div>

                  {ridesData.currentPage === ridesData.totalPages - 1 ? (
                    <div
                      className="arrow right disabled"
                      onClick={(e) => nextPage(e.target)}
                    ></div>
                  ) : (
                    <div
                      className="arrow right"
                      onClick={(e) => nextPage(e.target)}
                    ></div>
                  )}
                </div>
              ) : (
                <div className="nav">
                  <div
                    className="arrow left disabled"
                    onClick={(e) => prevPage(e.target)}
                  ></div>
                  <div>
                    Page {ridesData.currentPage + 1} of {ridesData.totalPages}
                  </div>
                  <div
                    className="arrow right disabled"
                    onClick={(e) => nextPage(e.target)}
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
