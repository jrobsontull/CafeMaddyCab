import { useEffect, useState, useContext, useCallback } from 'react';
import StoriesAPI from '../../utils/stories.api';
import AuthContext from '../../utils/auth.context';

import Navbar from './Navbar';
import ViewStory from './ViewStory';
import Spinner from '../general/Spinner';

function Stories() {
  const { user } = useContext(AuthContext);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [entries, setEntries] = useState([]);
  const [storiesData, setStoriesData] = useState({
    totalEntries: 0,
    currentPage: 0,
    totalPages: 0,
  });
  const entiresPerPage = 15;

  // For tracking search to refresh to when close windows
  const [currentSearch, setCurrentSearch] = useState('');
  const [selectedStoryEntry, setSelectedStoryEntry] = useState(null);
  const [openStoryEntryView, setOpenStoryEntryView] = useState(false);

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
      storiesData.totalPages > 1 &&
      storiesData.totalPages - 1 !== storiesData.currentPage
    ) {
      const pageToScrollTo = storiesData.currentPage + 1;

      let searchExpression = 'page=' + pageToScrollTo;
      if (currentSearch !== '') {
        searchExpression = 'page=' + pageToScrollTo + '&' + currentSearch;
      }

      setCurrentSearch(searchExpression);
      searchStories(searchExpression, pageToScrollTo);
    }
  }

  function prevPage() {
    if (storiesData.currentPage > 0) {
      const pageToScrollTo = storiesData.currentPage - 1;

      let searchExpression = 'page=' + pageToScrollTo;
      if (currentSearch !== '') {
        searchExpression = 'page=' + pageToScrollTo + '&' + currentSearch;
      }

      setCurrentSearch(searchExpression);
      searchStories(searchExpression, pageToScrollTo);
    }
  }

  function viewStoryEntry(entry) {
    setSelectedStoryEntry(entry);
    setLastScrollPos(window.scrollY);
    window.scrollTo(0, 0);
    setOpenStoryEntryView(true);
  }

  function closeStoryEntryView() {
    setOpenStoryEntryView(false);
    window.scrollTo(0, lastScrollPos);
    searchStories(currentSearch, storiesData.currentPage);
  }

  const searchStories = useCallback(
    (params = null, updatePage = null) => {
      if (params) {
        // Update current search
        setCurrentSearch(params);
        // Show spinner
        setShowSpinner(true);
        // Perform search with filter
        StoriesAPI.getStories(params, user.user.token).then((response) => {
          setShowSpinner(false);
          var { error } = response;
          if (error) {
            alert(error);
          } else {
            setEntries(response.entries);
            if (updatePage) {
              setStoriesData({
                totalEntries: response.totalResults,
                currentPage: updatePage,
                totalPages: calculateTotalPageNums(
                  entiresPerPage,
                  response.totalResults
                ),
              });
            } else {
              setStoriesData({
                totalEntries: response.totalResults,
                currentPage: 0,
                totalPages: calculateTotalPageNums(
                  entiresPerPage,
                  response.totalResults
                ),
              });
            }
          }
        });
      } else {
        // Update current search
        setCurrentSearch('');
        // Show spinner
        setShowSpinner(true);
        // Perform search for all entries
        StoriesAPI.getStories(null, user.user.token).then((response) => {
          setShowSpinner(false);
          var { error } = response;
          if (error) {
            alert(error);
          } else {
            setEntries(response.entries);
            setStoriesData({
              totalEntries: response.totalResults,
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

  // Search stories on load
  useEffect(() => {
    searchStories();
  }, [searchStories]);

  return (
    <div className="react-container">
      <div className="content backend">
        <Navbar />

        {showSpinner ? <Spinner /> : ''}

        {openStoryEntryView && (
          <ViewStory onClose={closeStoryEntryView} entry={selectedStoryEntry} />
        )}

        <div className="stories">
          <div className="menu">
            <div className="search-options">
              <ul>
                <li onClick={() => searchStories()}>All stories</li>
                <li onClick={() => searchStories('bookmark=true')}>
                  Filter by bookmarked
                </li>
                <li onClick={() => searchStories('share=true')}>
                  Filter by share approved
                </li>
              </ul>
            </div>
          </div>

          <div className="table-content">
            <div className="table-headings">
              <ul>
                <li id="col-1">Entry #</li>

                <li id="col-2">Stories</li>

                <li id="col-3">Share</li>
              </ul>
            </div>

            <div className="table-entries">
              {entries ? (
                entries.map((entry, index) => (
                  <div className="entry" key={entry._id}>
                    <ul onClick={() => viewStoryEntry(entry)}>
                      <li id="col-1">
                        {storiesData.currentPage * entiresPerPage + (index + 1)}
                      </li>
                      <li id="col-2">{entry.text}</li>
                      <li id="col-3">{entry.share ? 'Yes' : 'No'}</li>
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
              {storiesData.totalPages > 1 ? (
                <div className="nav">
                  {storiesData.currentPage === 0 ? (
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
                    Page {storiesData.currentPage + 1} of{' '}
                    {storiesData.totalPages}
                  </div>

                  {storiesData.currentPage === storiesData.totalPages - 1 ? (
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
                    Page {storiesData.currentPage + 1} of{' '}
                    {storiesData.totalPages}
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

export default Stories;
