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
