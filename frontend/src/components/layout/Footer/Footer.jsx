import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore from '../../../images/appstore.png'
import "../Footer/Footer.css"
import logo from "../../../images/MiniStore-footer.png"
const Footer = () => {
  return (
    <footer id="footer" className='row'> 
    <div className="leftFooter col-sm-4 my-2">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS mobile phone</p>
      <img src={playStore} alt="playstore" />
      <img src={appStore} alt="Appstore" />
    </div>

    <div className="midFooter col-sm-4 my-2">
      <img src={logo} alt="MiniStore." />
      <p>High Quality is our first priority</p>

      <p>Copyrights 2024 &copy; AnkitaSaha</p>
    </div>

    <div className="rightFooter col-sm-4 my-2">
      <h4>Follow Us</h4>
      <a href="http://instagram.com/ankita_itis" target="_blank">Instagram</a>
      <a href="https://www.youtube.com/@ankitasahathehappysoul7439" target="_blank">Youtube</a>
      <a href="http://facebook.com/ankita.saha.988" target="_blank">Facebook</a>
    </div>
  </footer>
  )
}

export default Footer
