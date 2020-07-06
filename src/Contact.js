import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { AddContactModal } from './AddContactModal';
import { EditContactModal } from './EditContactModal';
export class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = { contactDetails: [], showAddModal: false, showEditModal: false, contactInfo: [] }
    }
    componentDidMount() {
        this.LoadData();
    }
    LoadData() {
        fetch('https://localhost:44336/api/ContactDetails')
            .then(response => response.json())
            .then(data => {
                this.setState({ contactDetails: data });
            }
            );
    }
    DeleteContact(contactID) {
        if (window.confirm('Are you Sure to Delete contact')) {
            fetch('https://localhost:44336/api/ContactDetails/' + contactID, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
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
    componentDidUpdate() {
        this.LoadData();
    }
    render() {
        const { contactDetails } = this.state;
        let addModalClose = () => this.setState({ showAddModal: false });
        let editModalClose = () => this.setState({ showEditModal: false });
        return (
            <React.Fragment>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Id</th>
                            <th>Phone No.</th>
                            <th>Status</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactDetails.map(contact =>
                            <tr key={contact.ID}>
                                <td>{contact.FirstName}</td>
                                <td>{contact.LastName}</td>
                                <td>{contact.Email}</td>
                                <td>{contact.PhoneNo}</td>
                                <td>{contact.Status ? "Active" : "InActive"}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info" onClick={() => this.setState({ showEditModal: true, contactInfo: contact })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger" onClick={() => this.DeleteContact(contact.ID)}>
                                            Delete
                                        </Button>
                                        <EditContactModal
                                            show={this.state.showEditModal}
                                            onHide={editModalClose}
                                            contactinformation={this.state.contactInfo}                                            
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="primary" onClick={() => this.setState({ showAddModal: true })}>
                        Add Contact
            </Button>
                    <AddContactModal
                        show={this.state.showAddModal}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </React.Fragment>
        );
    }
}