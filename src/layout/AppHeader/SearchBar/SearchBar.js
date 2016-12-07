import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      q: "",
    }
  }

  updateQ = (q) => {
    this.setState({ q });
  };

  render() {
    const searchTermNode = (q) => (q.length > 0) ?
      <p style={{color: "salmon", fontSize: "1rem", padding: 0, margin: 0}}>
        You are searching for <em>{q}</em>...
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
            onChange={(e) => this.updateQ(e.target.value)}
          />
        </div>
        {' '}
        <button className="hidden-xs btn btn-default" type="submit">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

export default SearchBar;
