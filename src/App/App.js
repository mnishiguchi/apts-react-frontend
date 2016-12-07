import React from 'react';

// Components
import AppHeader  from './AppHeader/AppHeader';
import AppFooter  from './AppFooter/AppFooter';

// Styles
import './App.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const App = (props) => {
  return (
    <div className="App">
      <AppHeader />
      <main>
        {props.children}
      </main>
      <AppFooter />
    </div>
  );
} // end App

export default App;
