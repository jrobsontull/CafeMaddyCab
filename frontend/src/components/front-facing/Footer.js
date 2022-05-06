import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Insta from '../../assets/img/insta_icon.svg';
import Share from '../../assets/img/share_icon.svg';

function Footer() {
  const location = useLocation();
  const [openShare, setOpenShare] = useState(false);

  const shareData = {
    title: 'Cafe Maddy Cab',
    text: 'Check out Cafe Maddy Cab',
    url: 'https://cafemaddycab.org' + location.pathname,
  };

  const share = async () => {
    if (navigator.share) {
      // navigator share feature
      try {
        await navigator.share(shareData);
      } catch (e) {
        console.warn(e);
      }
    } else if (navigator.clipboard) {
      // copy link to clipboard
      try {
        await navigator.clipboard.writeText(
          'https://cafemaddycab.org' + location.pathname
        );

        setOpenShare(true);
        setTimeout(function () {
          setOpenShare(false);
        }, 5000);
      } catch (e) {
        console.warn(e);
      }
    } else {
      // browser is not compatible with web share api
      console.log('browser is not compatible with our share feature');
      // TODO: add alternate way to show share feature incompatible browsers
    }
  };
  return (
    <div className="footer">
      <ul>
        <li>
          <a href="https://www.instagram.com/cafemaddycab/">
            <img src={Insta} alt="Instagram" />
            <p>@cafemaddycab</p>
          </a>
        </li>
        <li>
          {!openShare ? (
            <button onClick={share}>
              <img src={Share} alt="Share" />
              <p>Share</p>
            </button>
          ) : (
            <p>Link to page copied to clipboard!</p>
          )}
        </li>
      </ul>
      <p>
        All donations are a tax-deductible contribution to Cafe Maddy Cab. Cafe
        Maddy Cab is fiscally sponsored by APCF, a tax-exempt 501(c)(3) public
        charity; EIN: 95-4257997
      </p>
    </div>
  );
}

export default Footer;
