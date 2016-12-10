import React, {Component} from 'react';
import { browserHistory, Link }  from 'react-router';

// Styles
import './ListingPage.css';

class ListingPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listing: props.currentListing || this._getListingById(this.props.listingId),
    }
  }

  _getListingById = (id) => {
    return this.props.listings.filter(listing => id === this.props.listing.id)[0];
  }

  // FIXME: Antipattern?
  //
  componentWillMount() {
    if (!this.state.listing) {
      browserHistory.push('/');
      return;
    }
  }

  render() {
    return (
      <div className="ListingPage">
        <div className="container">
          <div style={{maxWidth:'1000px', 'height':'auto', overflow:'hidden'}}>
            <img
              role="presentation"
              src="http://lorempixel.com/g/400/200/city/"
              width="100%"
            />
          </div>
        </div>
        <br />

        <div className="container">
          <p>
            {
              (this.state.listing) ? [
                this.state.listing.street,
                this.state.listing.city,
                this.state.listing.state,
                this.state.listing.zip,
              ].join(' ') : ''
            }
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <Link to='/search' className='btn btn-default'>Back to search</Link>
        </div>
        <br />
      </div>
    );
  }
} // end class

export default ListingPage;
