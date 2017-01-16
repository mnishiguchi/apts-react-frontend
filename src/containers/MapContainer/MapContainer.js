import React from 'react'

class MapContainer extends React.Component {
  render() {
    return (
      <div className="MapContainer">
        <h1>
          Map container
          {this.props.children}
        </h1>
      </div>
    )
  }
}

const mapStateToProps    = null
const mapDispatchToProps = null

export default connect( mapStateToProps, mapDispatchToProps )( MapContainer )
