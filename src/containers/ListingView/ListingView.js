import React, {Component}        from 'react';
import { connect }               from 'react-redux';
import { browserHistory, Link }  from 'react-router';

import actions from '../../actions'

// Styles
import './ListingView.css';

class ListingView extends Component {

  constructor(props) {
    super(props);

    this._listing = this._getListing();
  }

  render() {
    return (
      <div className="ListingView">
        <div style={{ background:"#666", height:"300px", width:"100%" }}>
        </div>
        <br />

        <div className="container">
          <p>
            {
              (this._listing) ? [
                this._listing.street,
                this._listing.city,
                this._listing.state,
                this._listing.zip,
              ].join(' ') : 'Error'
            }
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <Link to='/' className='btn btn-default'>Back to search</Link>
        </div>
        <br />
      </div>
    );
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentWillMount() {
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // Load the listing if it has not already.
    if ( !this._listing ) {
      dispatch(
        actions.listing.fetchById(this.props.params['id'])
      );
    }
  }


  // ---
  // PRIVATE METHODS
  // ---


  _getListing = () => {
    const { params, currentListing } = this.props;

    if (currentListing && currentListing.id === params.id) {
      return currentListing;
    } else {
      return this._getListingById(params.id);
    }
  }

  _getListingById = (id) => {
    if (!this.props.listings.length) { return null; }
    
    const listing = this.props.listings.filter(listing => {
      id === listing.id
    })[0];

    return listing;
  }

} // end class

const mapStateToProps = function(store) {
  return {
    listings      : store.listing['listings'],
    currentListing: store.listing['currentListing'],
  };
}

const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingView);
