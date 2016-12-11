import React from 'react';

// Components
import MapControl   from '../../../components/MapControl/MapControl';
import Map          from '../../../components/Map/Map';
import ListingTable from '../../../containers/ListingTable/ListingTable';

// Styles
import './SearchView.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const SearchView = (props) => {
  return (
    <div className="SearchView">
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
          <ListingTable />
        </div>
      </section>
    </div>
  );
} // end component


// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
SearchView.propTypes = {};
SearchView.defaultProps = {};

export default SearchView;
