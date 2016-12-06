import React, { Component } from 'react';

// Components
import AppHeader    from '../../layout/AppHeader/AppHeader';

// Styles
import './LoginPage.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const HelpPage = (props) => {

	const { item } = props;

  return (
    <div className="HelpPage">
			<AppHeader />

			<div className="container">
				<h2>Login page</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
    </div>
  );
} // end class

export default HelpPage;
