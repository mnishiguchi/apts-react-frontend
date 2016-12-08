import React, { Component } from 'react';
import _                    from 'lodash';

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

    // Bind functions to `this`.
    _.bindAll(this, '_openModal', '_closeModal');
  }

  render() {
    return (
      <div className="DetailModal">
        <Button
          onClick={this._openModal}
        >
          {(this.props.text) ? this.props.text : "open modal"}
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={this._closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.item.marketing_name}
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
                this.props.item.street,
                this.props.item.city,
                this.props.item.state,
                this.props.item.zip,
              ].join(' ')}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._closeModal}>Close</Button>
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

} // end class

export default DetailModal;
