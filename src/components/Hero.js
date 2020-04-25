import React from 'react';

const Hero = ({ children, backgroundImage }) => {
  const styles = {
    backgroundImage: `url(${backgroundImage})`
  }
  return (
    <div className="hero" style={styles}>
      <div className="hero-content">
        { children }
      </div>
    </div>
  )
}

export default Hero;