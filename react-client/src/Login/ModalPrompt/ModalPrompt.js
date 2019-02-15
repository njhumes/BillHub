import React from 'react';
import {withRouter} from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
    this.sendToLogin = this.sendToLogin.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  sendToLogin(){
    this.setState(prevState => ({
        modal: !prevState.modal
    }));
    let path = `/tracking`;
    this.props.history.push(path);
  }
  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;

      return (
      <div>
        <Button color="danger" onClick={this.toggle}>BUTTON FOR MODAL</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>You have to login to use that feature!</ModalHeader>
          <ModalBody>
            Please Login to track current legislation.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.sendToLogin}>Login</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ModalPrompt);