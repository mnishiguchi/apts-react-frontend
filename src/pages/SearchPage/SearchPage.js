import React, { Component } from 'react';

// Components
import MapControl   from '../../components/MapControl/MapControl';
import Map          from '../../components/Map/Map';
import ListingTable from '../../components/ListingTable/ListingTable';

// Styles
import './SearchPage.css';

class SearchPage extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {}
  }

  render() {
    return (
      <div className="SearchPage">
        <div
          className="alert alert-info"
          style={{'margin':0}}
        >
          <MapControl {...this.props} />
        </div>

        <section className="grid">
          <div className="flexible">
            <Map {...this.props} />
          </div>
          <div className="flexible">
            <ListingTable {...this.props} />
          </div>
        </section>
      </div>
    );
  }

  componentDidMount() {
    console.log(`SearchPage::componentDidMount`);
  }

  componentWillUpdate() {
    console.log(`SearchPage::componentWillUpdate`);
  }

  componentWillUnmount() {
    console.log(`SearchPage::componentWillUnmount`);
  }
} // end class

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
SearchPage.propTypes = {};
SearchPage.defaultProps = {};

export default SearchPage;
