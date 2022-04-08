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

  function calculateTotalPageNums(numPerPage, totalEntries) {
    let count = 1;
    let tracker = totalEntries;
    while (tracker > numPerPage) {
      tracker -= numPerPage;
      count += 1;
    }
    return count;
  }

  useEffect(() => {
    RidesAPI.getRides().then((response) => {
      setRides(response.rides);

      setRidesData({
        totalRides: response.totalResults,
        currentPage: 0,
        totalPages: calculateTotalPageNums(15, response.totalResults),
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

              {/* <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div>
              <div className="entry">
                <ul>
                  <li id="col-1">John</li>
                  <li id="col-2">Doe</li>
                  <li id="col-3">jdoe@gmail.com</li>
                  <li id="col-4">Asian LGBTQ+</li>
                  <li id="col-5">Yes</li>
                  <li id="col-6">Vaccination</li>
                  <li id="col-7">Verified</li>
                  <li id="col-8">jake</li>
                  <li id="col-9">No notes.</li>
                  <li id="col-10">N/A</li>
                  <li id="col-11">Awaiting code</li>
                </ul>
              </div> */}
            </div>

            <div className="table-footer">
              <div className="nav">
                <div>Page 1 of 5</div>
              </div>
              <div className="download-btn">Download CSV</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
