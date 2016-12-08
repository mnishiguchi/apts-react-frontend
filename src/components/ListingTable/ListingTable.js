import React, { PropTypes } from 'react';

// https://react-bootstrap.github.io/components.html#table-responsive
import Table       from 'react-bootstrap/lib/Table';

// Components
import Listing from './Listing/Listing';

// Styles
import './ListingTable.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const ListingTable = (props) => {

  const itemNodes = props.listings.map( listing =>
    <Listing
      listing={listing}
      key={listing.id}
      emitter={props.emitter}
    />
  );

  return (
    <div className="ListingTable">
      <Table responsive>
        <tbody>
          {itemNodes}
        </tbody>
      </Table>
    </div>
  );
}

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
ListingTable.propTypes = {
  emitter: PropTypes.object.isRequired
};

export default ListingTable;
