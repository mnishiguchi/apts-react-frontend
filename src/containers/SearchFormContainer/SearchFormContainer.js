import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { browserHistory }   from 'react-router';
import { EventEmitter }     from 'fbemitter';

import listingActions  from '../../actions/listing'

// Components
import SearchBar from './SearchBar/SearchBar';

// Styles
import './SearchFormContainer.css';

class SearchFormContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="SearchFormContainer">
        <SearchBar {...this.props} emitter={this.emitter} />
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  // https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
  // http://qiita.com/mizchi/items/6a3500e598ec36746509
  componentWillMount() {
    // Create a emitter for this container.
    this.emitter = new EventEmitter();

    // Register and listen for our custom events that will be emitted by children.
    this.emitter.addListener( 'SearchBar:submit', payload => {
      const { dispatch } = this.props;

      dispatch(listingActions.fetchListingsByKeyword(payload.q));

      // Redirect to the search page.
      browserHistory.push('/');
    });
  }
}

const mapStateToProps    = null;
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFormContainer);
