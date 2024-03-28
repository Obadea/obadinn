import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo1} alt="" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores,
            odit tempore nesciunt et, nulla fugit quibusdam dolores quas enim
            voluptate necessitatibus atque possimus est quod itaque praesentium,
            nihil ex nisi!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Poilcy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+2348088127274</li>
            <li>obadeagbenga@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Obadinn.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
