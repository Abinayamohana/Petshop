import React, { useEffect, useState } from "react";
import { Form, Card, InputGroup } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const AccountDetails = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <Card className="p-3 w-50 shadow-sm">
        <h3>Account Settings</h3>
      </Card>

      <div className="mt-3 w-50">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <InputGroup className="shadow-sm">
            <Form.Control type="text" className="bg-white border-1" value={user?.name || ""} disabled />
            <FaEdit color="orange" />
          </InputGroup>
          <br />

          <Form.Label>Email address</Form.Label>
          <InputGroup className="shadow-sm">
            <Form.Control type="text" className="bg-white border-1" value={user?.email || ""} disabled />
          </InputGroup>
          <br />

          <Form.Label>Mobile Number</Form.Label>
          <InputGroup className="shadow-sm">
            <Form.Control type="text" className="bg-white border-1" value={user?.phonenumber || ""} disabled />
          </InputGroup>
          <br />
        </Form.Group>
      </div>
    </div>
  );
};

export default AccountDetails;
