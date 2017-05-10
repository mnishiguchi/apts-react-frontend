/**
 * Makes utility functions for mapboxgl globally available.
 * Must be invoked within the onStyleLoad callback.
 */
export function onStyleLoadMixin(map) {
  // Store ref to the map instance so that we can use original mapbox-gl API through window.
  window.map       = map
  window.mapCanvas = document.querySelector('.mapboxgl-canvas')
  window.mapDiv    = document.querySelector('.mapboxgl-map')

  // Expose global functions
  window.getMapData = getMapData
  window.resizeMap  = resizeMap

  // A utility to get our desired information about current map.
  // In other words, convert map instance to usable data structure.
  function getMapData() {
    return {
      bounds: map.getBounds().toArray(),
      center: [map.getCenter().lng, map.getCenter().lat],
      zoom:   map.getZoom(),
    }
  }

  // A utility to resize the map so that we can dynamically resize the map.
  // https://bl.ocks.org/danswick/fc56f37c10d40be62e4feac5984250d2
  function resizeMap({width, height}) {
    if (width && height) {
      setMapWidth(width)
      setMapHeight(height)
      window.map.resize()
    } else if (width) {
      setMapWidth(width)
      window.map.resize()
    } else {
      setMapHeight(height)
      window.map.resize()
    }
  }

  function setMapWidth(width) {
    window.mapCanvas.style.width = width
    window.mapDiv.style.width    = width
  }

  function setMapHeight(height) {
    window.mapCanvas.style.height = height
    window.mapDiv.style.height    = height
  }
}

/**
 * NOTE: This function mutates the places array.
 * @param {array} places
 * @param {any}   placeId
 */
export function setSpecialIconForCurrentPlace(places, placeId) {
  const defaultIconName = 'castle'
  const specialIconName = 'bar'

  return places.map(place => {
    place.map['icon'] = (place.id === placeId) ? specialIconName : defaultIconName
    return place
  })
}

/**
 * Build a geojson object based on places array.
 * Example geojson: https://www.mapbox.com/mapbox-gl-js/example/geojson-markers/
 * --
 * If there is an existing source in the map, we can obtain the source by just calling:
 *   map.getSource('source_id')._data
 * @param  {array<object>} places
 * @return {object}
 */
export function buildGeojson(places) {
  let features = places.map(place => {
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [ place.longitude, place.latitude ]
      },
      // Prepare information that can be used for manipulating a layer later on.
      properties: {
        ...place,
        "icon": "castle"
      },
    }
  })

  return {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": features
    }
  }
}
