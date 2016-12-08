import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      q: "",
    }
  }

  render() {
    const searchTermNode = (q) => (q.length > 0) ?
      <p style={{color: "#aaa", fontSize: "1rem", padding: 0, margin: 0}}>
        You are searching for <em style={{color: "#fff"}}>{q}</em>...
      </p> : null

    return (
      <div className="navbar-form navbar-left">

        {searchTermNode(this.state.q)}

        <div className="form-group">
          <input
            id="q"
            className="form-control"
            type="text"
            placeholder="Search"
            value={this.state.q}
            onChange={(e) => this._updateQ(e.target.value)}
          />
        </div>
        {' '}
        <button
          className="hidden-xs btn btn-default"
          type="submit"
          onClick={(e) => this._onSubmit(e)}
        >
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    );
  }


  // ---
  // PRIVATE METHODS
  // ---


  _updateQ = (q) => {
    this.setState({ q });
  };

  _onSubmit = (event) => {
    // console.log('Emitting SearchBar:submit')
    this.props.emitter.emit( 'SearchBar:submit', {q: this.state.q} );
  }
} // end class

export default SearchBar;
