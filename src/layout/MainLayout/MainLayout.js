import React from 'react';

// Components
import AppHeader    from '../../layout/AppHeader/AppHeader';

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
    </div>
  );
} // end class

export default MainLayout;
