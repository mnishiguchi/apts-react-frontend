import React from 'react';

// Components
import MapControl   from '../../../components/MapControl/MapControl';
import Map          from '../../../components/Map/Map';
import ListingTable from '../../../components/ListingTable/ListingTable';

// Styles
import './SearchPage.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const SearchPage = (props) => {
  return (
    <div className="SearchPage">
      <div
        className="alert alert-info"
        style={{'margin':0}}>
        <MapControl {...props} />
      </div>

      <section className="grid">
        <div className="flexible">
          <Map {...props} />
        </div>
        <div className="flexible">
          <ListingTable {...props} />
        </div>
      </section>
    </div>
  );
} // end component


// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
SearchPage.propTypes = {};
SearchPage.defaultProps = {};

export default SearchPage;
