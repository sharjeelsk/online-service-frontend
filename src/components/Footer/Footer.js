import React from 'react';
import "./Footer.scss"
import {Link} from 'react-router-dom'

function Footer() {
  return <footer className="footer row m-auto">
      <div className="fcol">
          <Link to="selectservice"><h3>Create Service</h3></Link>
      </div>

      <div className="fcol">
          <h3>Contact Us</h3>
      </div>

      <div className="fcol">
          <Link to="aboutus"><h3>About Us</h3></Link>
      </div>

      <div className="fcol">
          <Link to="pendingpayments"><h3>Pending Payments</h3></Link>
      </div>
  </footer>;
}

export default Footer;
