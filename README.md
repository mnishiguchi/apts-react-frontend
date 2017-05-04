# Apts react frontend

In this app, I will build a Redfin-like React app.

---

## Demo
- [load data and search](https://apts-react-frontend.surge.sh)
- [map features](https://mnishiguchi-react-mapboxgl.surge.sh)

---

## Get started

```
npm install
npm start
```

Visit [localhost:3000](localhost:3000)

---

## React resources

- [`React.createClass` versus `extends React.Component`](https://toddmotto.com/react-create-class-versus-component/)
- [react lifecycle](http://qiita.com/kawachi/items/092bfc281f88e3a6e456)
- [https://css-tricks.com/learning-react-router/](https://css-tricks.com/learning-react-router/)
- [ReactTraining/react-router](https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [https://react-bootstrap.github.io/](https://react-bootstrap.github.io/)
- [https://github.com/facebookincubator/create-react-app](https://github.com/facebookincubator/create-react-app)

---

## Mapbox resources

- [Studio](https://www.mapbox.com/studio/)
- [Turf](http://turfjs.org/)
- [https://www.mapbox.com/analysis/](https://www.mapbox.com/analysis/)
- [CLI](https://github.com/mapbox/mapbox-cli-py)
- [SDK-JS](https://github.com/mapbox/mapbox-sdk-js/)

---

## Libraries

- [alex3165/react-mapbox-gl](https://github.com/alex3165/react-mapbox-gl)


---

## Some useful techniques

#### Redirection

```
import { browserHistory }  from 'react-router';
browserHistory.push('/some/path');
```

#### How to pass props to {this.props.children}
- [How to pass props to {this.props.children}](http://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children)

#### Conversion between a LngLatBounds object and an array of LngLat
- [https://www.mapbox.com/mapbox-gl-js/api/#LngLatBounds#toArray](https://www.mapbox.com/mapbox-gl-js/api/#LngLatBounds#toArray)

```js
aLngLatBounds.toArray()
```

- [https://www.mapbox.com/mapbox-gl-js/api/#LngLatBounds.convert](https://www.mapbox.com/mapbox-gl-js/api/#LngLatBounds.convert)

```js
mapboxgl.LngLatBounds.convert([[-73.9876, 40.7661], [-73.9397, 40.8002]])
```

#### Walkscore

- [https://www.redfin.com/how-walk-score-works](https://www.redfin.com/how-walk-score-works)
