import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../utils/auth.context';
import RidesAPI from '../../utils/rides.api';

import Navbar from './Navbar';
import MissingPhoto from '../../assets/img/missing_photo_icon.svg';

function ApproveRides() {
  const { user } = useContext(AuthContext);
  const [rides, setRides] = useState([]);
  const [ridesData, setRidesData] = useState({
    totalRides: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const entiresPerPage = 15;

  let baseImgUrl = 'http://localhost:8080/api/v1/image/';
  if (process.env.NODE_ENV === 'production') {
    baseImgUrl = 'https://localhost:8080/api/v1/image/';
  }

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
      RidesAPI.getRides(
        'status=2&approverId=' + user.user._id + '&page=' + pageToScrollTo
      ).then((response) => {
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
      RidesAPI.getRides(
        'status=2&approverId=' + user.user._id + '&page=' + pageToScrollTo
      ).then((response) => {
        setRides(response.rides);
        setRidesData((prevData) => ({
          ...prevData,
          currentPage: pageToScrollTo,
        }));
      });
    }
  }

  useEffect(() => {
    RidesAPI.getRides('status=2&approverId=' + user.user._id).then(
      (response) => {
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
    );
  }, []);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        <div className="dashboard approve-rides">
          <div className="table-content">
            <div className="table-headings">
              <ul>
                <li id="col-1">Date Requested</li>
                <li id="col-2">First Name</li>
                <li id="col-3">Last Name</li>
                <li id="col-4">Email</li>
                <li id="col-5">Identity</li>
                <li id="col-6">Low Income</li>
                <li id="col-7">Ride Purpose</li>
                <li id="col-8">ID Verification</li>
                <li id="col-9">Approval</li>
              </ul>
            </div>

            <div className="table-entries">
              {rides
                ? rides.map((ride) => (
                    <ul key={ride._id}>
                      <li id="col-1">
                        {new Date(ride.dateRequested).toLocaleDateString(
                          'en-us'
                        )}
                      </li>
                      <li id="col-2">{ride.firstName}</li>
                      <li id="col-3">{ride.lastName}</li>
                      <li id="col-4">{ride.email}</li>
                      <li id="col-5">{ride.identity.text}</li>
                      <li id="col-6">{ride.income ? 'yes' : 'no'}</li>
                      <li id="col-7">{ride.purpose.text}</li>
                      <li id="col-8">
                        <div className="titles">
                          <p>Selfie</p>
                          <p id="last-child">Photo ID</p>
                        </div>
                        <div className="photo-boxes">
                          <div className="photo-box">
                            <img
                              src={
                                ride.selfie.exists
                                  ? baseImgUrl + ride.selfie.path
                                  : MissingPhoto
                              }
                              alt="Loading..."
                            ></img>
                          </div>
                          <div className="photo-box" id="last-child">
                            <img
                              src={
                                ride.photoId.exists
                                  ? baseImgUrl + ride.photoId.path
                                  : MissingPhoto
                              }
                              alt="Loading..."
                            ></img>
                          </div>
                        </div>
                      </li>
                      <li id="col-9">
                        <div className="approve-btns">
                          <div className="approve-btn accept">Y</div>
                          <div className="approve-btn deny">N</div>
                          <div className="approve-btn unsure">?</div>
                        </div>
                        <div className="notes">
                          <p>Notes:</p>
                          <textarea
                            placeholder="
                          Write notes here..."
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  ))
                : ''}
            </div>

            <div className="table-footer">
              <div className="cancel-btn">Cancel</div>

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

              <div className="save-changes-btn">Save changes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveRides;
