import React from 'react'
import blackLogo from './blackLogo.png'
import './Banner.css'
import videoBanner from './masa.mp4'
const Banner =()=>{
    return(
        <div className="logoPositionBanner">
            <video autoPlay loop muted className="videoPositionBanner">
                <source src={videoBanner} type="video/mp4"/>
            </video>
            <img className="logoAdjustmentBanner" alt='logo'src={blackLogo}/>
        </div>
    )
}

export default Banner;