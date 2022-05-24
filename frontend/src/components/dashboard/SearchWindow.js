import { useState } from 'react';
import PropTypes from 'prop-types';
import Arrow from '../../assets/img/arrow_right.svg';

function Search({ onClose }) {
  const [errorOnSubmit, setErrorOnSubmit] = useState({
    state: false,
    message: null,
  });

  const [shortId, setShortId] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [statuses, setStatuses] = useState({
    new: false,
    inProgress: false,
    approved: false,
    rejected: false,
    unsure: false,
    done: false,
  });

  function updateStatus(key) {
    const currentBool = statuses[key];
    setStatuses((prevStatuses) => ({ ...prevStatuses, [key]: !currentBool }));
  }

  function submitHandler() {
    let searchTerms = [];

    if (shortId !== '') {
      searchTerms.push('shortId=' + shortId);
    }
    if (email !== '') {
      searchTerms.push('email=' + email);
    }
    if (firstName !== '') {
      searchTerms.push('firstName=' + firstName);
    }
    if (lastName !== '') {
      searchTerms.push('lastName=' + lastName);
    }

    let statusesToSearch = [];
    for (var key in statuses) {
      if (statuses[key]) {
        if (key === 'new') {
          statusesToSearch.push(1);
        } else if (key === 'inProgress') {
          statusesToSearch.push(2);
        } else if (key === 'approved') {
          statusesToSearch.push(3);
        } else if (key === 'rejected') {
          statusesToSearch.push(4);
        } else if (key === 'unsure') {
          statusesToSearch.push(5);
        } else if (key === 'done') {
          statusesToSearch.push(6);
        }
      }
    }

    if (statusesToSearch.length > 0) {
      let tmp = 'statuses=';
      for (const status of statusesToSearch) {
        tmp += status + ',';
      }
      searchTerms.push(tmp.slice(0, -1));
    }

    // Compile final string
    let finalTerm = '';
    if (searchTerms.length > 0) {
      for (const term of searchTerms) {
        finalTerm += term + '&';
      }
      onClose(finalTerm.slice(0, -1));
    } else {
      setErrorOnSubmit({
        state: true,
        message: "You gotta give me some search terms first :'(",
      });
    }
  }

  return (
    <div className="react-container view-entry">
      <div className="view-entry-window search-window">
        <div className="header">
          <div className="title">
            <div className="back-btn" onClick={() => onClose(null)}>
              <img className="nav-arrow" src={Arrow} alt="arrow" />
            </div>
            <p>Search Requests</p>
          </div>
        </div>
        <div className="entry-content">
          {errorOnSubmit.state ? (
            <div className="error">
              {errorOnSubmit.message
                ? errorOnSubmit.message
                : 'An unknown error occurred.'}
            </div>
          ) : (
            ''
          )}
          <p>
            Write search terms here and press search. You can select multiple
            status values!
          </p>

          <div className="input-row">
            <label htmlFor="shortId">ID:</label>
            <input
              type="text"
              id="shortId"
              onChange={(e) => setShortId(e.target.value)}
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="first-name">First name:</label>
            <input
              type="text"
              id="first-name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
          </div>
          <div className="input-row">
            <label htmlFor="last-name">Last name:</label>
            <input
              type="text"
              id="last-name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>

          <p className="status-title">Status fields to look in:</p>

          <div className="status-checks">
            <div className="check-item">
              <input
                type="checkbox"
                name="understand-1"
                id="status-1"
                onChange={() => updateStatus('new')}
              ></input>
              <label htmlFor="status-1">New</label>
            </div>
            <div className="check-item">
              <input
                type="checkbox"
                name="understand-1"
                id="status-2"
                onChange={() => updateStatus('inProgress')}
              ></input>
              <label htmlFor="status-2">In progress</label>
            </div>
            <div className="check-item">
              <input
                type="checkbox"
                name="understand-1"
                id="status-3"
                onChange={() => updateStatus('approved')}
              ></input>
              <label htmlFor="status-3">Approved</label>
            </div>
            <div className="check-item">
              <input
                type="checkbox"
                name="understand-1"
                id="status-4"
                onChange={() => updateStatus('rejected')}
              ></input>
              <label htmlFor="status-4">Rejected</label>
            </div>
            <div className="check-item">
              <input
                type="checkbox"
                name="understand-1"
                id="status-5"
                onChange={() => updateStatus('unsure')}
              ></input>
              <label htmlFor="status-5">Unsure</label>
            </div>
            <div className="check-item">
              <input
                type="checkbox"
                name="understand-1"
                id="status-6"
                onChange={() => updateStatus('done')}
              ></input>
              <label htmlFor="status-6">Done</label>
            </div>
          </div>

          <div className="search-btn" onClick={() => submitHandler()}>
            Search
          </div>
        </div>
      </div>
    </div>
  );
}

Search.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Search;
