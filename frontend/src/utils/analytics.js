import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

export default function useGA() {
  // Initialise analytics
  useEffect(() => {
    ReactGA.initialize('G-WDWLN3S2WB');
  }, []);

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    ReactGA.send({ hitType: 'pageview', page: currentPath });
  }, [location]);
}
