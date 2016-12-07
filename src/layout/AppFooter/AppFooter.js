import React from 'react';

// Styles
import './AppFooter.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const AppFooter = (props) => {
  return (
    <footer className="AppFooter">
      <div className="container">
        <div className="contact-info">
          Masatoshi Nishiguchi &middot;
          <a href="http://www.mnishiguchi.com/">
            mnishiguchi.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
