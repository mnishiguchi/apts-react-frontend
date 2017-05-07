import React                from 'react'
import { connect }          from 'react-redux'

import actions              from '../actions'
import MapComponent         from '../components/MapComponent'
import { onStyleLoadMixin } from '../lib/mapboxglUtils'

class PlaceScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      place: undefined
    }
  }

  render() {
    const { place } = this.state
    return (
      <div className="Place container">
        <h1 className="display-4">
          {place.marketing_name}
        </h1>

        <p>
          {
            [
              place.street,
              place.city,
              place.state,
              place.zip,
            ].join(' ')
          }
        </p>

        <div className="jumbotron">
          <div className="container">
            <p className="lead">
              {place.description}
            </p>
          </div>
        </div>

        <p>
          If wandered relation no surprise of screened doubtful. Overcame no insisted ye of trifling husbands. Might am order hours on found. Or dissimilar companions friendship impossible at diminution. Did yourself carriage learning she man its replying. Sister piqued living her you enable mrs off spirit really. Parish oppose repair is me misery. Quick may saw style after money mrs.
        </p>
        <p>
          Behind sooner dining so window excuse he summer. Breakfast met certainty and fulfilled propriety led. Waited get either are wooded little her. Contrasted unreserved as mr particular collecting it everything as indulgence. Seems ask meant merry could put. Age old begin had boy noisy table front whole given.
        </p>
        <p>
          Extremely we promotion remainder eagerness enjoyment an. Ham her demands removal brought minuter raising invited gay. Contented consisted continual curiosity contained get sex. Forth child dried in in aware do. You had met they song how feel lain evil near. Small she avoid six yet table china. And bed make say been then dine mrs. To household rapturous fulfilled attempted on so.
        </p>

        <div>
          <MapComponent
            {...this.props}
            center={[ place.longitude, place.latitude ]}
            zoom={11}
            containerStyle={{ width: '100%', height: '200px' }}
            onStyleLoad={this.onStyleLoad.bind(this)}
            places={[place]}
          />
        </div>
      </div>
    )
  }

  componentWillMount() {
    const { places, params } = this.props
    const placeId = parseInt(params.id, 10)

    // Get a place for this page based on the id.
    const place = this.props.places.filter(place => (place && place.id) === placeId)[0]

    // Set up the place data for this page before the component is mounted.
    this.setState({ place })
  }

  // https://github.com/alex3165/react-mapbox-gl/blob/master/docs/API.md#reactmapboxgl
  onStyleLoad(map, event) {
    onStyleLoadMixin(map)

    // Initial map fitting.
    fitMap()

    // Map fitting on resize.
    window.addEventListener('resize', fitMap)

    // Fit the map appropriately for this page.
    function fitMap() {
      window.resizeMap({ width: '100%', height: '200px' })
    }
  }
} // end class

function mapStateToProps(store) {
  const { places, currentPlace } = store.place
  const { bounds, center, zoom } = store.map

  return {
    bounds,
    center,
    currentPlace,
    places,
    zoom,
  }
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( PlaceScreen )
