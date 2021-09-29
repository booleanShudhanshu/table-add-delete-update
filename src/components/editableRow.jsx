import React from "react";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr>
      <td>
        <input
          required
          name="fullName"
          type="text"
          value={editFormData.fullName}
          placeholder="Enter your name....."
          onChange = {handleEditFormChange}

        />
      </td>
      <td>
        <input
          required
          name="address"
          type="text"
          value={editFormData.address}
          placeholder="Enter your address....."
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          required
          name="phoneNumber"
          type="text"
          value={editFormData.phoneNumber}
          placeholder="Enter your phoneNumber....."
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <input
          required
          name="email"
          type="text"
          value={editFormData.email}
          placeholder="Enter your email....."
          onChange={handleEditFormChange}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick} >Cancel</button>
      </td>
    </tr>
  );
};

export default EditableRow;
