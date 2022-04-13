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
        Maddy Cab is a 501(c)(3) tax-exempt organisation for both federal and
        state purposes. Federal tax ID: XX-XXXXXXX.
      </p>
    </div>
  );
}

export default Footer;
