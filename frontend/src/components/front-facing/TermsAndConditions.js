import Navbar from './Navbar';

function TermsAndConditions() {
  return (
    <div className="react-container">
      <div className="content frontend">
        <Navbar />

        <h1 className="page-title-no-logo">Terms and Conditions</h1>
        <p className="terms-and-conditions">
          I, by requesting financial aid from CafeMaddyCab (hereafter
          &quot;CMC&quot;), agree that (i) all information I have provided to
          CMC and/or its moderators is accurate and complete; (ii) CMC will not
          disburse funds until I have provided any and all information requested
          and until CMC completes timely review of all requested information;
          (iii) all decisions made by CMC regarding the disbursement or
          non-disbursement of funds are final (including decline of a request
          upon CMC&apos;s sole discretion); (iv) I will not make a claim
          against, sue, demand compensation or indemnity from CMC for any
          decision it makes regarding disbursement or non-disbursement of funds
          nor any accidents or incidents that occur during a ride funded by CMC;
          (v) I will not infringe, impinge, or encroach on the rights of others
          (including, but not limited to, the constitutional rights of others);
          (vi) I will comply with all relevant and applicable laws related to
          rideshare and/or taxi rides in the state of New York; (vii) any
          personal data (including name, email, phone number, etc.) I submit or
          share with CMC will be utilized only to confirm my identity and the
          legitimacy of my request, which will be determined by CMC and/or its
          moderators based on CMC&apos;s purpose and objectives; and (viii) I
          acknowledge that my request for financial aid will not be fulfilled
          upon depletion of rideshare codes allotted to CMC.
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
