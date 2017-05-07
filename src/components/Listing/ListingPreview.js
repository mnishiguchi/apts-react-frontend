import React from 'react'

/**
 * An information box that displays information on the currently selected place.
 */
const ListingPreview = ({ currentPlace }) => {
  return (
    currentPlace ? (
      <div className="ListingPreview" style={{
        position: 'relative',
        top: 0,
        left: 0,
        background: '#666',
        width: '100%',
        height: '100px',
        color: 'white',
        padding: '1rem',
        overflow: 'auto'
      }}>
        <p>{currentPlace.marketing_name}</p>
        <p>
          {
            [
              currentPlace.street,
              currentPlace.city,
              currentPlace.state,
              currentPlace.zip,
            ].join(' ')
          }
        </p>
      </div>
    ) : (
      <div style={{display:'none'}}></div>
    )
  )
}

export default ListingPreview
