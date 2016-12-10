import React from 'react';

const SearchBar = (props) =>  {
  const { emitter } = props;

  // The ref Callback Attribute
  // https://facebook.github.io/react/docs/refs-and-the-dom.html
  let textInput = '';
  return (
    <div className="navbar-form navbar-left">
      <div className="form-group">
        <input
          id="q"
          className="form-control"
          type="text"
          placeholder="Search"
          ref={ input => { textInput = input; }}
        />
      </div>
      {' '}
      <button
        className="hidden-xs btn btn-default"
        type="submit"
        onClick={event => {
          emitter.emit( 'SearchBar:submit', { q: textInput.value } );
          textInput.value = '';
        }}>
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </div>
  );
} // end component

export default SearchBar;
