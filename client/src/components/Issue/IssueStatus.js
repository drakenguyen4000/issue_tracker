import React from "react";
import { Button, Form, Input, Label, FormGroup } from "reactstrap";

const IssueStatus = ({ updateStatus, onChangeStatus }) => {
  return (
    <Form className="status-group">
      <FormGroup>
        <Label className="pr-5 mt-2" for="Open">
          <Input
            className="mt-2"
            name="status"
            value="Open"
            id="Open"
            type="radio"
            onChange={onChangeStatus}
          ></Input>
          Open
        </Label>
        <Label className="pr-5 mt-2" for="On Hold">
          <Input
            className="mt-2"
            name="status"
            value="On Hold"
            id="On Hold"
            type="radio"
            onChange={onChangeStatus}
          ></Input>
          On Hold
        </Label>
        <Label className="pr-3 mt-2" for="Closed">
          <Input
            className="mt-2"
            name="status"
            value="Closed"
            id="Closed"
            type="radio"
            onChange={onChangeStatus}
          ></Input>
          Closed
        </Label>
        <Button
          className="btn-style"
          size="sm"
          color="success"
          onClick={updateStatus}
        >
          Status <i className="far fa-folder-open"></i>
        </Button>
      </FormGroup>
    </Form>
  );
};

export default IssueStatus;
