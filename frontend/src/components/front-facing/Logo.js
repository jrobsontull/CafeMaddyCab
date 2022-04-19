import CMCLogo from '../../assets/img/logo.svg';

function Logo() {
  return (
    <div className="title-logo">
      <img src={CMCLogo} alt="Cafe Maddy Cab" />
      <div className="title">
        <h1>Cafe Maddy Cab</h1>
        <p>NYC cab rides for Asian women, LGBTQ+ and elderly in need</p>
      </div>
    </div>
  );
}

export default Logo;
