import Insta from '../../assets/img/insta_icon.svg';
import Share from '../../assets/img/share_icon.svg';

function Footer() {
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
          <img src={Share} alt="Share" />
          <p>Share</p>
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
