import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import avatar from '../assets/images/avatar.jpg'; // ✅ Import your local image

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          {/* ✅ Use the imported local image */}
          <img src={avatar} alt="Avatar" className="avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/YassineMabrou" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/yassinemabroukkk/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>

          <h1>Yassine Mabrouk</h1>
          <p>MERN Stack & AI Enthusiast</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/YassineMabrou" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/yassinemabroukkk/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
