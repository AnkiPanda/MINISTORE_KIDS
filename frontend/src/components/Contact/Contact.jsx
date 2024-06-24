import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import "../Contact/Contact.css"
import facebook from "../../images/facebook.png"
import instagram from "../../images/instagram.png"
import twitter from "../../images/twitter.png"
import ankiImage from "../../images/ankita_passport.png"
import gmail from "../../images/gmail-logo.png"
import call from "../../images/call.png"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';



const Contact = () => {
  return (
    <Fragment>
        <MetaData title="Contact -- MiniStore"/>
        <div className="contact">
        <h2 className='contactHeading'>Get in touch</h2>
        <div className="customer-support">
        <h3> If you have any query feel free to ask</h3> 
        <p className="cust-sup-head">Customer Support -</p>
        <p className='contact-info'><img src={gmail} alt="gmail" /><span>customer.support@ministore.com</span></p>
        <p className='contact-info'><img src={call} alt="call" /><span>033-2345-6789</span></p>
  
        </div>
        <div className="contact-card">
        <div className="card">
            <div className="photo" style={{"backgroundImage": `url(${ankiImage})`}}></div>
            <div className="banner-contact"></div>
            <div className='bodyPart'>
            <ul>
                <li><b>Ankita Saha</b></li>
                <li>Sales Manager</li>
                <li>ankitasaha70443@gmail.com</li>
                {/* <li>7044308886</li> */}
            </ul>
                <div className="social-media-banner">
                <a href="">  <img src={facebook} alt="facebook" /></a>
                <a href="">  <img src={instagram} alt="instagram" /></a>
                <a href="">  <img src={twitter} alt="twitter" /></a>
                {/* <FontAwesomeIcon icon={['fab', 'facebook']} style={{ color: 'white', fontSize: '24px' }} />
                <FontAwesomeIcon icon={['fab', 'instagram']} style={{ color: 'white', fontSize: '24px' }} /> */}

                {/* <a href=""><i className="fa fa-twitter"></i></a>
                <a href=""><i className="fa fa-facebook"></i></a>
                <a href=""><i className="fa fa-instagram"></i></a>
                <a href=""><i className="fa fa-linkedin"></i></a> */}
            </div>
            </div>
          </div>
          <div className="card">
            <div className="photo"></div>
            <div className="banner-contact"></div>
            <div className='bodyPart'>
            <ul>
                <li><b>Saurav Dutta</b></li>
                <li>Customer Support Executive</li>
                <li>sauravd6219@gmail.com</li>
                {/* <li>9903030227</li> */}
            </ul>
                <div className="social-media-banner">
                <a href="">  <img src={facebook} alt="facebook" /></a>
                <a href="">  <img src={instagram} alt="instagram" /></a>
                <a href="">  <img src={twitter} alt="twitter" /></a>
                {/* <FontAwesomeIcon icon={['fab', 'facebook']} style={{ color: 'white', fontSize: '24px' }} />
                <FontAwesomeIcon icon={['fab', 'instagram']} style={{ color: 'white', fontSize: '24px' }} /> */}

                {/* <a href=""><i className="fa fa-twitter"></i></a>
                <a href=""><i className="fa fa-facebook"></i></a>
                <a href=""><i className="fa fa-instagram"></i></a>
                <a href=""><i className="fa fa-linkedin"></i></a> */}
            </div>
            </div>
          </div>
          <div className="card">
            <div className="photo" style={{backgroundImage:`url("https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg")`}}></div>
            <div className="banner-contact"></div>
            <div className='bodyPart'>
            <ul>
                <li><b>T Mohan</b></li>
                <li>Support Team Member</li>
                <li>tmohan@ministore.com</li>
                {/* <li>+919831739179</li> */}
            </ul>
                <div className="social-media-banner">
                <a href="">  <img src={facebook} alt="facebook" /></a>
                <a href="">  <img src={instagram} alt="instagram" /></a>
                <a href="">  <img src={twitter} alt="twitter" /></a>
                {/* <FontAwesomeIcon icon={['fab', 'facebook']} style={{ color: 'white', fontSize: '24px' }} />
                <FontAwesomeIcon icon={['fab', 'instagram']} style={{ color: 'white', fontSize: '24px' }} /> */}

                {/* <a href=""><i className="fa fa-twitter"></i></a>
                <a href=""><i className="fa fa-facebook"></i></a>
                <a href=""><i className="fa fa-instagram"></i></a>
                <a href=""><i className="fa fa-linkedin"></i></a> */}
            </div>
            </div>
          </div>
          </div>
          </div>
    </Fragment>
  )
}

export default Contact
