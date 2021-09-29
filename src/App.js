import React, { Fragment, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnly from "./components/readOnly.jsx";
import EditableRow from "./components/editableRow.jsx";

function App() {
  const [contacts, setContacts] = useState(data);
  const [editContactId, setEditContactId] = useState(null);
  const defaultValue = {
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  };
  const [addFormData, setAddFormData] = useState(defaultValue);
  const [editFormData, setEditFormData] = useState(defaultValue);

  
  const handleAddFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormdata = { ...addFormData };
    newFormdata[fieldName] = fieldValue;
    setAddFormData(newFormdata);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: nanoid(),

      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
    
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = (e) => {
    setEditContactId(null);
  };

  const handleDeleteClick= (contactId) => {
    const newContacts = [...contacts];

      const index = contacts.findIndex((contact) => contact.id === contactId);
      newContacts.splice(index,1);
      setContacts(newContacts);

  }

  return (
    <div className="app-container">
      <h1 className="text-center text-info">Shudhanshu</h1>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnly
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add row</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Enter you name......"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Enter you address......"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter you phoneNumber......"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Enter you email......"
          onChange={handleAddFormChange}
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Add Row
        </button>
      </form>
    </div>
  );
}

export default App;
