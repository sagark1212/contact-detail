import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
export class AddContactModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsValid: false,
      errors: {
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNo: '',
      }
    };
  }

  handleSubmit=(event)=> {
    event.preventDefault();
    let valid = true;
    let errors = this.state.errors;
    if(errors.FirstName.length>0 || errors.LastName.length>0|| errors.Email.length>0|| errors.PhoneNo.length>0)
    {
      valid = false;
    }    
    if (valid) {  
      fetch('https://localhost:44336/api/ContactDetails', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: null,
          FirstName: event.target.FirstName.value,
          LastName: event.target.LastName.value,
          Email: event.target.Email.value,
          PhoneNo: event.target.PhoneNo.value,
          Status: event.target.Status.value
        })
      })
        .then(res => res.json())
        .then((result) => {
          alert(result);

        },
          (error) => {
            alert('Failed');
          }
        )
    }
  } 

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    console.log( name);
    switch (name) {
      case 'FirstName':
        errors.FirstName =
          value.length < 2
            ? 'First Name must be at least 2 characters long!'
            : '';
        break;
      case 'LastName':
        errors.LastName =
          value.length < 2
            ? 'Last Name must be at least 2 characters long!'
            : '';
        break;
      case 'Email':
        errors.Email =
          this.validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'PhoneNo':
        errors.PhoneNo =
          value.length !== 10
            ? 'PhoneNo must be 10 numbers long!'
            : '';
        break;       
      default:
        break;
    }
  }
  validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  render() {
    const { errors } = this.state;
    return (
      <div>
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Contact
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="FirstName">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control
                      type="text"
                      name="FirstName"
                      required
                      placeholder="First Name"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  {errors.FirstName.length > 0 &&
                    <span className='error'>{errors.FirstName}</span>}
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="LastName">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control
                      type="text"
                      name="LastName"
                      required
                      placeholder="Last Name"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  {errors.LastName.length > 0 &&
                    <span className='error'>{errors.LastName}</span>}
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="Email"
                      required
                      placeholder="Email"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  {errors.Email.length > 0 &&
                    <span className='error'>{errors.Email}</span>}
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="PhoneNo">
                    <Form.Label>PhoneNo</Form.Label>
                    <Form.Control
                      type="text"
                      name="PhoneNo"
                      maxLength={10}
                      required
                      placeholder="PhoneNo"
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  {errors.PhoneNo.length > 0 &&
                    <span className='error'>{errors.PhoneNo}</span>}
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="Status">
                    <Form.Label>Status</Form.Label>                  
                    <select id = "dropdown" name="Status" onChange={this.handleChange}>    
    <option value="true">Active</option>
    <option value="false">InActive</option>   
</select>
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit" >Add Contact</Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}