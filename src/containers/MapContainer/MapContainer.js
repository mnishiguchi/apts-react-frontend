import React from 'react'

class MapContainer extends React.Component {
  render() {
    return (
      <div className="MapContainer">
        <h1>
          Map container
        </h1>

        <div style={{border: "4px solid red"}}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const mapStateToProps    = null
const mapDispatchToProps = null

export default MapContainer
