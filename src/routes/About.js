import React from 'react';
import './About.css';
import sankalp from '../components/images/sankalp.jpg';
import pratik from '../components/images/pratik.jpg';
import abhishek from '../components/images/abhishek.jpg';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div className='about-background'>
      <Navbar />
      <div className="about-container">
        <h1 className="about-title">About Our Project</h1>
        <p className="about-description">
          Welcome to DSAlizer, an interactive algorithm visualizer designed to make complex algorithms accessible and understandable. 
          Through dynamic animations and step-by-step visualizations, we help students, developers, and algorithm enthusiasts gain 
          deeper insights into how various sorting and searching algorithms work under the hood.
        </p>

        <div className="gradient-divider"></div>

        <h2 className="tech-stack-title">Tech Stack</h2>
        <p className="tech-stack-description">
          Built with modern web technologies including React for the interactive UI, CSS for beautiful styling, and JavaScript 
          for powering the algorithm logic and animations. Our architecture focuses on performance and clarity to deliver 
          a seamless learning experience.
        </p>

        <div className="github-section">
          <h2>Open Source Project</h2>
          <p className="github-description">
            DSAlizer is proudly open source! We believe in collaborative learning and welcome contributions from the community. 
            Whether you want to add new algorithms, improve visualizations, or enhance the UI, your contributions can help make 
            algorithm learning more accessible to everyone.
          </p>
          <a href="https://github.com/Abhi951197/DSAlizer" target="_blank" rel="noopener noreferrer" className="github-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Project on GitHub
          </a>
        </div>

        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-cards">
            <div className="team-member">
              <div className="team-img-container">
                <img src={sankalp} alt="Sankalp Wani" className="team-img"/>
              </div>
              <h3>Sankalp Wani</h3>
              <p>TE INFT-A</p>
              <p>22101A0028</p>
              <a href="https://www.linkedin.com/in/sankalp-wani-5a1040274/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>
            
            <div className="team-member">
              <div className="team-img-container">
                <img src={pratik} alt="Pratik Sawant" className="team-img"/>
              </div>
              <h3>Pratik Sawant</h3>
              <p>TE INFT-A</p>
              <p>22101A0029</p>
              <a href="https://www.linkedin.com/in/pratik-sawant-340801273" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>
            
            <div className="team-member">
              <div className="team-img-container">
                <img src={abhishek} alt="Abhishek Pal" className="team-img"/>
              </div>
              <h3>Abhishek Pal</h3>
              <p>TE INFT-A</p>
              <p>22101A0067</p>
              <a href="https://www.linkedin.com/in/abhishek-pal-0677ab2a3/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;