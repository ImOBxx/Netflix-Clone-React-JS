import React from "react";
import styles from "./styles.module.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer2() {
  return (
    <div className={styles.footerWrapper}>
      <div className="bg- p-2">
        <footer className={styles.footer}>
          <div className={styles.containerFooter}>
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mb-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f text-white text-sm hover:opacity-75"></i>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-white text-sm hover:opacity-75"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-white text-sm hover:opacity-75"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube text-white text-sm hover:opacity-75"></i>
              </a>
            </div>

            {/* Footer Links */}
            <ul className={styles.details}>
              <li>Audio Description</li>
              <li>Help Centre</li>
              <li>Gift Cards</li>
              <li>Media Centre</li>
              <li>Investor Relations</li>
              <li>Jobs</li>
              <li>Terms of Use</li>
              <li>Privacy</li>
              <li>Legal Notices</li>
              <li>Cookie Preferences</li>
              <li>Corporate Information</li>
              <li>Contact Us</li>
              <li>       </li>
              <li>       </li>

            </ul>

            {/* Language and Copyright */}
            <div className={styles.security}>
              <div>Service Code</div>
              <span>© 1997-2024 Netflix, Inc.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer2;
