import React from "react";
import "../css/home.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const userName = localStorage.getItem("firstName");
  return (
    <footer className="footer">
      <div>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/blogs">Blogs</Link>
        </div>
        <div>
          <Link to={`/${userName}/savedArticles`}>Saved articles</Link>
          <Link to="/write">Write</Link>
        </div>
        <div className="social-media-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
