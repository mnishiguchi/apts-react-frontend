import React from 'react';

// Components
import AppHeader  from '../../components/AppHeader/AppHeader';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './MainLayout.css';

const MainLayout = (props) =>  {
  return (
    <div className="MainLayout">

      <AppHeader />

      <main>
        {props.children}
      </main>

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
    </div>
  );
};

export default MainLayout;
