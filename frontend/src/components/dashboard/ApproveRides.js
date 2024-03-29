import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../utils/auth.context';
import RidesAPI from '../../utils/rides.api';

import Navbar from './Navbar';
import PhotoView from './PhotoView';
import Spinner from '../general/Spinner';

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

  const [openPhotoView, setOpenPhotoView] = useState(false);
  const [photoView, setPhotoView] = useState({
    firstName: null,
    lastName: null,
    selfie: null,
    photoId: null,
    windowLocation: null,
  });
  const [showSpinner, setShowSpinner] = useState(false);

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
      // Start spinner
      setShowSpinner(true);
      // Do work
      const pageToScrollTo = ridesData.currentPage + 1;
      RidesAPI.getRides(
        'status=2&approverId=' + user.user._id + '&page=' + pageToScrollTo,
        user.user.token
      ).then((response) => {
        setShowSpinner(false);
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
      // Start spinner
      setShowSpinner(true);
      // Do work
      const pageToScrollTo = ridesData.currentPage - 1;
      RidesAPI.getRides(
        'status=2&approverId=' + user.user._id + '&page=' + pageToScrollTo,
        user.user.token
      ).then((response) => {
        setShowSpinner(false);
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
      windowLocation: window.scrollY,
    });
    setOpenPhotoView(true);
  }

  // Close handler for PhotoView
  function closeVerificationView() {
    setOpenPhotoView(false);
    window.scrollTo(0, photoView.windowLocation);
  }

  // Cancel button handler - unset in progress state on rides
  function cancelHandler() {
    window.scrollTo(0, 0);
    setShowSpinner(true);
    RidesAPI.unsetInProgress(user.user._id, user.user.token).then(
      (response) => {
        setShowSpinner(false);
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
    setShowSpinner(true);
    RidesAPI.approveRides(approvalStates, notes, user.user.token).then(
      (response) => {
        setShowSpinner(false);
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
    setShowSpinner(true);
    RidesAPI.getRides(
      'status=2&approverId=' + user.user._id,
      user.user.token
    ).then((response) => {
      setShowSpinner(false);
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
  }, [user.user]);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        {showSpinner ? <Spinner /> : ''}

        {openPhotoView ? (
          <PhotoView
            onClose={() => closeVerificationView()}
            photoViewRide={photoView}
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
              {rides.length > 0 ? (
                rides.map((ride, index) => (
                  <ul key={ride._id}>
                    <li id="col-1">
                      {new Date(ride.dateRequested).toLocaleString('en-US', {
                        timeZone: 'America/New_York',
                        month: '2-digit',
                        day: '2-digit',
                        year: '2-digit',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </li>
                    <li id="col-2">{ride.firstName}</li>
                    <li id="col-3">{ride.lastName}</li>
                    {ride.isDuplicate ? (
                      <li id="col-4" className="is-duplicate">
                        {ride.email}
                        {ride.duplicateNum
                          ? ` (` + ride.duplicateNum + `)`
                          : ''}
                        <div className="tooltip">
                          <span className="tooltip-text">
                            This email is already in use by another ride request
                            for this week.
                            {ride.duplicateNum ? (
                              <strong id="duplicate-num">
                                <br />
                                Duplicate number: {ride.duplicateNum}
                              </strong>
                            ) : (
                              ''
                            )}
                          </span>
                        </div>
                      </li>
                    ) : (
                      <li id="col-4">{ride.email}</li>
                    )}
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
              ) : (
                <div className="no-rides-message">
                  <span>You have no rides to approve.</span>
                  <p>
                    To begin approving rides, go to the{' '}
                    <Link to={'/dashboard'}>dashboard</Link> and click the
                    Approve Rides button. You can then specify the number of
                    rides that you wish to approve.
                  </p>
                </div>
              )}
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
