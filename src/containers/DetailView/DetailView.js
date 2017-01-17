import React, {Component}        from 'react'
import { connect }               from 'react-redux'
import { Link }                  from 'react-router'

import placeActions from '../../actions/place'

class DetailView extends Component {
  render() {
    const { currentPlace } = this.props

    return (
      <div className="DetailView">
        <div className="container">

          <h4>
            {
              (currentPlace) ? currentPlace.marketing_name || '' : 'Error'
            }
          </h4>
          <p>
            { (currentPlace) ? `
                ${currentPlace.street || ''}
                ${currentPlace.city || ''}
                ${currentPlace.state || ''}
                ${currentPlace.zip || ''}
              ` : 'Error'
            }
          </p>

          <Link to='/' className='btn btn-default'>Back to search</Link>

          <hr></hr>

          <div id="mapDest" style={{
              position: 'relative',
              height: 300,
              overflow: 'hidden'
            }}>

              {/* map is embedded here */}
          </div>
        </div>
      </div>
    )
  }


  // ---
  // LIFECYCLE HOOKS
  // ---


  componentDidMount() {
    const { dispatch, currentPlace } = this.props

    // Load the place if it has not already.
    if ( !currentPlace ) {
      dispatch(
        placeActions.fetchPlaceById(this.props.params.id)
      )
    }

    this.props.positionMapComponent()

    // Adjust the map's vertical positon because we change the height.
    document.querySelector('.mapboxgl-map').style.marginTop = '-150px'
  }

  componentWillUnmount() {
    this.props.unpositionMapComponent()

    // Undo the adjustment for map's vertical position.
    document.querySelector('.mapboxgl-map').style.marginTop = '0'
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
  }
}

const mapDispatchToProps = null

export default connect( mapStateToProps, mapDispatchToProps )( DetailView )
