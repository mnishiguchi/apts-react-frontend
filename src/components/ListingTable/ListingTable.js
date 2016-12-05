import React from 'react';

// https://react-bootstrap.github.io/components.html#table-responsive
import Table       from 'react-bootstrap/lib/Table';

// Components
import ListingItem from '../ListingItem/ListingItem';

// Styles
import './ListingTable.css';

// Stateless function
// https://facebook.github.io/react/docs/components-and-props.html
const ListingTable = (props) => {

  const itemNodes = props.listings.map( item =>
    <ListingItem
      item={item}
      key={item.id}
    />
  );

  return (
    <div className="ListingTable">
      <div>
        <h4>ListingTable</h4>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {itemNodes}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ListingTable;
