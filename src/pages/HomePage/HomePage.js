import React, { Component } from 'react';

import Button           from 'react-bootstrap/lib/Button';
import FormControl      from 'react-bootstrap/lib/FormControl';

// Components
import AppHeader    from '../../layout/AppHeader/AppHeader';

// Styles
import './HomePage.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const HomePage = (props) => {

	const { item } = props;

	const jumbotronStyle = {
		backgroundImage: "url('http://lorempixel.com/1000/600/city/')",
		minHeight: '65vh',
		color: 'white',
	}

  return (
    <div className="HomePage">
			<AppHeader />

			<div className="jumbotron" style={jumbotronStyle} >
				<div className="container" style={{width: '65vw'}}>
					<h2>Welcome to my website!!!</h2>
					<br />
					<form>
						<FormControl
							type="text"
							placeholder="City, Address, Zip"
						/>
					</form>
					<br />
					<small>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</small>
					<br />
					<br />
					<Button>Learn more</Button>
				</div>
			</div>

			<div className="container">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
    </div>
  );
} // end class

export default HomePage;
