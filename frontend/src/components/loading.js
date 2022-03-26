function Loading() {
  return (
    <div className="content">
      <div className="titles">
        <h2>CAFE MADDY CAB</h2>
        <h3>Ride Reimbursment</h3>
      </div>
      <div className="loading">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="info-box">
          We're sending your request right now! This page will automatically
          refresh when your request has sent.
        </div>
      </div>
    </div>
  );
}

export default Loading;
