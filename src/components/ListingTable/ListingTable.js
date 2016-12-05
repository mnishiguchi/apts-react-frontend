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
  return (
    <div className="ListingTable">
      <div>
        <h4>ListingTable</h4>
        <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Rent</th>
          </tr>
        </thead>
        <tbody>
          <ListingItem />
          <ListingItem />
          <ListingItem />
          <ListingItem />
        </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ListingTable;
