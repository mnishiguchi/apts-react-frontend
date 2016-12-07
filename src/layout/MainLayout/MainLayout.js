import React from 'react';

// Components
import AppHeader    from '../../layout/AppHeader/AppHeader';
import AppFooter    from '../../layout/AppFooter/AppFooter';

// Styles
import './MainLayout.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const MainLayout = (props) => {
  return (
    <div className="MainLayout">
      <AppHeader />
      <main>
        {props.children}
      </main>
      <AppFooter />
    </div>
  );
} // end class

export default MainLayout;
