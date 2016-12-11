import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { browserHistory }   from 'react-router';
import { EventEmitter }     from 'fbemitter';

import listingActions  from '../../actions/listing'

// https://react-bootstrap.github.io/components.html#navigation
import Navbar    from 'react-bootstrap/lib/Navbar';

// Components
import Logo      from './Logo/Logo';
import NavLink   from './NavLink/NavLink';
import SearchBar from './SearchBar/SearchBar';

// Styles
import './AppHeader.css';

class AppHeader extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="AppHeader">
        <Navbar bsStyle="inverse">
          <Navbar.Header>
            <Navbar.Brand>
              <NavLink to="/"><Logo /></NavLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <SearchBar {...this.props} emitter={this.emitter} />

            {this.props.children}

            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink to="/search">Search</NavLink>
              </li>
              <li>
                <NavLink to="/help">Help</NavLink>
              </li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
    // Create a emitter.
    this.emitter = new EventEmitter();

    // Register and listen for our custom events that will be emitted by children.
    this._listenForChildren();
  }


  // ---
  // PRIVATE METHODS
  // ---


  /**
   * Registers all the events that children will emit and listens for them.
   */
  _listenForChildren = () => {
    this.emitter.addListener( 'SearchBar:submit', payload => {
      const { dispatch } = this.props;
      dispatch(listingActions.fetchByKeyword(payload.q));

      // Redirect to the search page.
      browserHistory.push('/');
    });
  }
}

// connect(
//   (state)    => {...}, // optional
//   (dispatch) => {...}  // optional, by default dispatch function is provided
// )(container)
export default connect()(AppHeader);
