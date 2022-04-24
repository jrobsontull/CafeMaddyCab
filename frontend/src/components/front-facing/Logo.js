import CMCLogo from '../../assets/img/logo.svg';

function Logo() {
  return (
    <div className="title-logo">
      <img src={CMCLogo} alt="Cafe Maddy Cab" />
      <h1 className="title">
        NYC cab rides for Asian women, LGBTQ+ and elderly in need
      </h1>
    </div>
  );
}

export default Logo;
