import React from 'react'

const ListingPreview = ({ currentPlace }) => {
  return (
    currentPlace ? (
      <div className="ListingPreview" style={{
        position: 'relative',
        top: 0,
        left: 0,
        background: getRandomColor(),
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

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  const useHowManyLetters = 6

  let color = ['#']
  let letter
  for (let i = 0; i < 6; i++) {
    letter = letters[ Math.floor(Math.random() * useHowManyLetters) ]
    color.push(letter)
  }
  return color.join('')
}

export default ListingPreview
