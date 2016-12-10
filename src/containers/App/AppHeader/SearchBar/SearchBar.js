import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);
  }

  // The ref Callback Attribute
  // https://facebook.github.io/react/docs/refs-and-the-dom.html
  // NOTE: The ref will not work with stateless functional component.
  render() {
    return (
      <div className="navbar-form navbar-left">
        <div className="form-group">
          <input
            id="q"
            className="form-control"
            type="text"
            placeholder="Search"
            ref={ input => { this.textInput = input; }}
          />
        </div>
        {' '}
        <button
          className="hidden-xs btn btn-default"
          type="submit"
          onClick={(event) => this._onSubmit(event)}
        >
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    );
  }


  // ---
  // PRIVATE METHODS
  // ---


  _onSubmit = (event) => {
    this.props.emitter.emit( 'SearchBar:submit', { q: this.textInput.value } );
  }
} // end class

export default SearchBar;
