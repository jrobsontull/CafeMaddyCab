import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../utils/auth.context';
import RidesAPI from '../../utils/rides.api';

import Navbar from './Navbar';
import PhotoView from './PhotoView';

import MissingPhoto from '../../assets/img/missing_photo_icon.svg';

function ApproveRides() {
  // Global variables
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
    baseImgUrl = 'https://cafemaddycab.org:443/api/v1/image/';
  }

  const [openPhotoView, isOpenPhotoView] = useState(false);
  const [photoView, setPhotoView] = useState({
    firstName: null,
    lastName: null,
    selfie: null,
    photoId: null,
  });

  const navigate = useNavigate();

  // States for keeping track of approval state and notes
  const [approvalStates, setApprovalStates] = useState({});
  const [notes, setNotes] = useState({});

  // For keeping track with page nav functions
  function calculateTotalPageNums(numPerPage, totalEntries) {
    let count = 1;
    let tracker = totalEntries;
    while (tracker > numPerPage) {
      tracker -= numPerPage;
      count += 1;
    }
    return count;
  }

  // Go forward a page in the table
  function nextPage() {
    if (
      ridesData.totalPages > 1 &&
      ridesData.totalPages - 1 !== ridesData.currentPage
    ) {
      const pageToScrollTo = ridesData.currentPage + 1;
      RidesAPI.getRides(
        'status=2&approverId=' + user.user._id + '&page=' + pageToScrollTo,
        user.user.token
      ).then((response) => {
        setRides(response.rides);
        setRidesData((prevData) => ({
          ...prevData,
          currentPage: pageToScrollTo,
        }));
        window.scrollTo(0, 0);
      });
    }
  }

  // Go backward a page in the table
  function prevPage() {
    if (ridesData.currentPage > 0) {
      const pageToScrollTo = ridesData.currentPage - 1;
      RidesAPI.getRides(
        'status=2&approverId=' + user.user._id + '&page=' + pageToScrollTo,
        user.user.token
      ).then((response) => {
        setRides(response.rides);
        setRidesData((prevData) => ({
          ...prevData,
          currentPage: pageToScrollTo,
        }));
        window.scrollTo(0, 0);
      });
    }
  }

  // For updating approval states
  function setApproval(target) {
    const id = target.name;
    if (target.checked && target.value) {
      setApprovalStates((prevStates) => ({
        ...prevStates,
        [id]: { rideId: id, stateToSet: target.value },
      }));
    }
  }

  // For appending notes to approval states
  function updateNotes(target) {
    const id = target.name;
    const notesToSet = target.value;

    setNotes((prevState) => ({
      ...prevState,
      [id]: { id: id, notes: notesToSet },
    }));
  }

  // Open handler for PhotoView
  function openVerificationView(firstName, lastName, selfie, photoId) {
    setPhotoView({
      firstName: firstName,
      lastName: lastName,
      selfie: selfie,
      photoId: photoId,
    });
    isOpenPhotoView(true);
  }

  // Cancel button handler - unset in progress state on rides
  function cancelHandler() {
    RidesAPI.unsetInProgress(user.user._id, user.user.token).then(
      (response) => {
        var { error } = response;
        if (error) {
          alert(error);
        } else {
          navigate('/dashboard');
        }
      }
    );
  }

  // Submit/save changes handler - push approvalState and notes to DB
  function submitHandler() {
    RidesAPI.approveRides(approvalStates, notes, user.user.token).then(
      (response) => {
        var { error } = response;
        if (error) {
          alert(error);
        } else {
          navigate('/dashboard');
        }
      }
    );
  }

  // Run once when render complete - populate table
  useEffect(() => {
    RidesAPI.getRides(
      'status=2&approverId=' + user.user._id,
      user.user.token
    ).then((response) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        {openPhotoView ? (
          <PhotoView
            onClose={() => isOpenPhotoView(false)}
            firstName={photoView.firstName}
            lastName={photoView.lastName}
            selfie={photoView.selfie}
            photoId={photoView.photoId}
          />
        ) : (
          ''
        )}

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
                ? rides.map((ride, index) => (
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
                      <li
                        id="col-8"
                        onClick={() =>
                          openVerificationView(
                            ride.firstName,
                            ride.lastName,
                            ride.selfie,
                            ride.photoId
                          )
                        }
                      >
                        <div className="titles">
                          <p>Selfie</p>
                          <p id="last-child">Photo ID</p>
                        </div>
                        <div className="photo-boxes">
                          <div className="photo-box">
                            {ride.selfie.exists ? (
                              <img
                                src={baseImgUrl + ride.selfie.path}
                                alt="Loading..."
                              />
                            ) : (
                              <img
                                src={MissingPhoto}
                                alt="Missing"
                                className="missing"
                              />
                            )}
                          </div>
                          <div className="photo-box" id="last-child">
                            {ride.photoId.exists ? (
                              <img
                                src={baseImgUrl + ride.photoId.path}
                                alt="Loading..."
                              />
                            ) : (
                              <img
                                src={MissingPhoto}
                                alt="Missing"
                                className="missing"
                              />
                            )}
                          </div>
                        </div>
                      </li>
                      <li id="col-9">
                        <div
                          className="approve-btns"
                          onChange={(e) => setApproval(e.target)}
                        >
                          <input
                            type="radio"
                            id={(index + 1) * 3 - 2}
                            value="3"
                            name={ride._id}
                            className="accept"
                            defaultChecked={
                              approvalStates[ride._id]
                                ? approvalStates[ride._id].stateToSet === '3'
                                : false
                            }
                          ></input>
                          <label htmlFor={(index + 1) * 3 - 2}></label>
                          <input
                            type="radio"
                            id={(index + 1) * 3 - 1}
                            value="4"
                            name={ride._id}
                            className="deny"
                            defaultChecked={
                              approvalStates[ride._id]
                                ? approvalStates[ride._id].stateToSet === '4'
                                : false
                            }
                          ></input>
                          <label htmlFor={(index + 1) * 3 - 1}></label>
                          <input
                            type="radio"
                            id={(index + 1) * 3}
                            value="5"
                            name={ride._id}
                            className="unsure"
                            defaultChecked={
                              approvalStates[ride._id]
                                ? approvalStates[ride._id].stateToSet === '5'
                                : false
                            }
                          ></input>
                          <label htmlFor={(index + 1) * 3}></label>
                        </div>
                        <div className="notes">
                          <p>Notes:</p>
                          <textarea
                            name={ride._id}
                            placeholder="
                          Write notes here..."
                            defaultValue={
                              notes[ride._id]
                                ? notes[ride._id].notes
                                : ride.notes
                                ? ride.notes
                                : ''
                            }
                            onChange={(e) => updateNotes(e.target)}
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  ))
                : ''}
            </div>

            <div className="table-footer">
              <div className="cancel-btn" onClick={() => cancelHandler()}>
                Cancel
              </div>

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

              <div className="save-changes-btn" onClick={() => submitHandler()}>
                Save changes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveRides;
