import React, { Component } from 'react';

// https://react-bootstrap.github.io/components.html#table-responsive
import Table       from 'react-bootstrap/lib/Table';

// Components
import Listing        from './Listing/Listing';
import ListingPreview from './ListingPreview/ListingPreview';

// Styles
import './ListingTable.css';

class ListingTable extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {}
  }

  render() {
    // Unpack the props.
    const { listings, emitter } = this.props;

    const itemNodes = listings.map( listing =>
      <Listing
        listing={listing}
        key={listing.id}
        emitter={emitter}
      />
    );

    return (
      <div className="ListingTable">
        <ListingPreview {...this.props} />

        <Table responsive>
          <tbody>
            {itemNodes}
          </tbody>
        </Table>
      </div>
    );
  };

  componentDidUpdate() {
    console.log(`ListingTable::componentDidUpdate`)
  }
}

export default ListingTable;
