import React, { Component } from 'react';
import { browserHistory }  from 'react-router';

// https://react-bootstrap.github.io/components.html#modals
import Modal       from 'react-bootstrap/lib/Modal';
import Button      from 'react-bootstrap/lib/Button';

// Styles
import './DetailModal.css';

class DetailModal extends Component {

  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      showModal: false,
    }
  }

  render() {
    const { listing, text } = this.props;
    
    return (
      <div className="DetailModal">
        <Button onClick={this._openModal} >
          {(text) ? text : "open modal"}
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this._closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {listing.marketing_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{'background':'#555', width:'100%', 'height':'280px'}}>
              <img
                role="presentation"
                src="http://lorempixel.com/g/400/200/city/"
                width="100%"
              />
            </div>
            <p>
              {[
                listing.street,
                listing.city,
                listing.state,
                listing.zip,
              ].join(' ')}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._closeModal}>Close</Button>
            <Button onClick={this._redirectToListingPage}>More details</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }


  // ---
  // PRIVATE METHODS
  // ---


  _closeModal = () => {
    this.setState({ showModal: false });
  }

  _openModal = () => {
    this.setState({ showModal: true });
  }

  _redirectToListingPage = (e) => {
    browserHistory.push(`/listings/${this.props.listing.id}`);
  }

} // end class

export default DetailModal;
