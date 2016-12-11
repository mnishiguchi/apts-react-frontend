import React from 'react';

// Components
import Map          from '../../../components/Map/Map';
import ListingTable from '../../../containers/ListingTable/ListingTable';
import MapControl   from '../../../containers/MapControl/MapControl';

// Styles
import './SearchView.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const SearchView = (props) => {
  return (
    <div className="SearchView">
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
