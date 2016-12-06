import React, { PropTypes } from 'react';

// https://react-bootstrap.github.io/components.html#table-responsive
import Table       from 'react-bootstrap/lib/Table';

// Components
import ListingItem from './ListingItem/ListingItem';

// Styles
import './ListingTable.css';

// https://facebook.github.io/react/docs/reusable-components.html
// https://github.com/airbnb/javascript/tree/master/react#ordering
const propTypes = {
  emitter: PropTypes.object.isRequired
};

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const ListingTable = (props) => {

  const itemNodes = props.listings.map( item =>
    <ListingItem
      item={item}
      key={item.id}
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

export default ListingTable;
