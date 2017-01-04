import React, {Component}        from 'react';
import { connect }               from 'react-redux';
import { Link }                  from 'react-router';

import actions from '../../actions'

class DetailView extends Component {

  constructor(props) {
    super(props);

    this._place = this._getPlace();
  }

  render() {
    return (
      <div className="DetailView" style={{color: '#7d87b9'}}>
        <div style={{ background:"#666", height:"300px", width:"100%" }}>
        </div>
        <br />

        <div className="container">
          <p>
            {
              (this._place) ?
              `${this._place.street} ${this._place.city} ${this._place.state} ${this._place.zip}` : 'Error'
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


  componentDidMount() {
    const { dispatch } = this.props;

    // Load the place if it has not already.
    if ( !this._place ) {
      dispatch(
        actions.place.fetchListingById(this.props.params['id'])
      );
    }
  }


  // ---
  // PRIVATE METHODS
  // ---


  _getPlace = () => {
    const { params, currentPlace } = this.props;

    if (currentPlace && currentPlace.id === params.id) {
      return currentPlace;
    } else {
      return this._getPlaceById(params.id);
    }
  }

  _getPlaceById = (id) => {
    if (!this.props.places.length) { return null; }

    const place = this.props.places.filter(place => {
      return id === place.id
    })[0];

    return place;
  }

} // end class


// ---
// CONNECT TO STORE
// ---


const mapStateToProps = function(store) {
  const { places, currentPlace } = store.place

  return {
    places,
    currentPlace,
  };
}

const mapDispatchToProps = null;

export default connect( mapStateToProps, mapDispatchToProps )( DetailView );
