import React, { Component } from 'react';

// Images
import logo_svg from './logo.svg';

// Styles
import './Logo.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const Logo = (props) => {
  return (
    <div className="Logo">
      <img
        src={logo_svg}
        className="AppHeader-logo"
        alt="logo"
      />
    </div>
  );
}

export default Logo;
