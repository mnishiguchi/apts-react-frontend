import React from 'react';

// Images
import logo_src from './mn_logo.png';

// Styles
import './Logo.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const Logo = (props) => {
  return (
    <img
      src={logo_src}
      className="Logo"
      alt="logo"
    />
  );
}

export default Logo;
