import React, { Fragment } from 'react'
import "../About/About.css"
import MetaData from '../layout/MetaData'
import logo from "../../images/Mini-Logo.png"
import { Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';


const About = () => {
  return (
   <Fragment>
    <MetaData title="About -- MiniStore"/>
    <h2 className='aboutHeading'>Our Story</h2>
    <div className="img-view">
      <img src={logo} alt="MiniStore" />
      <Button variant="outlined" color='inherit'>
      <a href="http://instagram.com/ankita_itis" target="_blank"><InstagramIcon/> Visit Instagram</a>
</Button>
    </div>
    
    <p className='story-lines'>
Welcome to MiniStore, where every product is crafted with the utmost care and love for your little ones. Founded with a mission to provide only the best for your baby, MiniStore has become a trusted name for parents seeking high-quality essentials. From nourishing baby food and gentle diapers to delightful toys and adorable clothing, we offer a comprehensive range of products designed to meet every need. Our commitment to quality and reliability ensures that each item is carefully selected and delivered to your doorstep within days, because we understand that your time is precious. At MiniStore, we cherish the trust that moms have placed in us, and we are dedicated to supporting you through every step of your parenting journey. Join our family and discover the joy of shopping with a brand that truly cares about your baby’s well-being.</p>
{/* <div className="img-view">
     <img src="https://media.istockphoto.com/id/1212764689/photo/happy-family-doing-online-shopping-at-home.jpg?s=612x612&w=0&k=20&c=iz34-KU_ueYEDdnvTiqJjR5vMS1UG8P-nTf1gQDzrW0=" alt="1st-image" /> 
       </div> */}
   </Fragment>
  )
}

export default About
