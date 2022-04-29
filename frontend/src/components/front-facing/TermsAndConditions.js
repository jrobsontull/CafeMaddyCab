import Navbar from './Navbar';

function TermsAndConditions() {
  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />
        <h1 className="page-title-no-logo">Terms and Conditions</h1>

        <p className="terms-and-conditions">
          You, as recipient of financial aid from @cafemaddyCAB account,
          represent, warrant, and covenant that (i) all information you provide
          in connection to Cafemaddy CAB is accurate, complete, and note likely
          to deceive reasonable moderators; (ii) you will not receive the aid
          unless you provide requested information and Cafemaddy CAB moderators
          approve disbursement of funds; (iii) all decisions related to fare
          distribution made by Cafemaddy CAB moderators are final and you will
          hold Cafemaddy CAB, its moderators, its donors, and any associated
          volunteers harmless for any distribution decisions (iv) you will not
          infringe the rights of others; (v) you will comply with all relevant
          and applicable law and regulations on taxi rides (vi) to the extend
          you share with us any personal data for any purpose, including names,
          emai addresses, you have the authority (including any necessary
          consents) as required under applicable law, to provide us with such
          personal data and allow us to use such personal data to validate
          identity and purposed use of funds (vii) you understand that
          submissions may cease to be approved once the number of codes have
          been depleted.
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
