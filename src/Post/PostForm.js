import React, { useState } from 'react';
import { 
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {
  Link,
  useHistory
} from "react-router-dom";


export default function PostForm({sendToApi, defaultVals, title}) {
  const [formData, setFormData] = useState(defaultVals);
  let history = useHistory();
  

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    sendToApi(formData)
    history.push("/")
  };

  return (
    <Form>
      <h1>{title}</h1>
      <FormGroup>
        <Label for="title">Title:</Label>
        <Input 
          type="text" 
          name="title" 
          id="title"
          value={formData.title}
          onChange={handleChange}
          required />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description:</Label>
        <Input 
          type="text" 
          name="description" 
          id="description"
          value={formData.description}
          onChange={handleChange}
          required />
      </FormGroup>
      <FormGroup>
        <Label for="body">Body:</Label>
        <Input 
          type="textarea" 
          name="body" 
          id="body"
          value={formData.body}
          onChange={handleChange}
          required />
      </FormGroup>
      <Button onClick={handleSubmit}>Save</Button>
      <Link to="/"><Button>Cancel</Button></Link>
    </Form>
  );
}
