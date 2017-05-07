import React                from 'react'
import { connect }          from 'react-redux'

import actions              from '../actions'

/**
 * Wrap the whole app. Load place data.
 */
class AppContainer extends React.Component {
  render() {
    return (
      <div className="AppContainer">
        {this.props.children}
      </div>
    )
  }

  componentWillMount() {
    this.props.dispatch(
      actions.place.fetchAllPlaces()
    )
  }
} // end class

function mapStateToProps(store) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return { dispatch }
}

export default connect( mapStateToProps, mapDispatchToProps )( AppContainer )
