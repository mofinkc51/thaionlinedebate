// Footer.js
import React from 'react';
import './Footer.css'; // Make sure to import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          {/* <img src="/path-to-your-logo.png" alt="Flowbite Logo" /> */}
          <h3>Thai Online Debate</h3>
          {/* <span>Flowbite</span> */}
        </div>
        <div className="footer-links    ">
          <a href="#">เกี่ยวกับ</a>
          <a href="https://pdpa.pro/policies/view/th/qaKroJW3nfKLKKQ9Bw2w2C5r" target='_blank'>นโยบายความเป็นส่วนตัว</a>
          < a href="mailto:thaionlinedebate.staff@gmail.com">ติดต่อเรา</a>
        </div>
        <div className="footer-copy">
          © 2023 Thai Online Debate™. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
