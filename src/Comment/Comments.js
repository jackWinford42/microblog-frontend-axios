import React, { useState } from 'react';
import { 
  Button,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import {v4 as uuidv4} from "uuid";

export default function Comments({comments, deleteComment, createComment, postId}) {
  const [input, setInput] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    createComment({ text: input, id: uuidv4(), postId: postId});
    setInput("");
  };
  const handleDeleteComment = (evt) => {
    const commentId = Number(evt.currentTarget.parentElement.id);
    deleteComment(commentId)
  };
  const commentsComponents = comments.map(comment =>
    <span id={comment.id} key={comment.id}>
      <Button onClick={handleDeleteComment}>X</Button>
      <p>{comment.text}</p>
    </span>
  );
  return (
    <div className="Comments">
      <ul>{commentsComponents}</ul>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input 
            type="text" 
            name="title" 
            id="title"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={"New Comment"}
            required />
        </FormGroup>
        <Button>Add</Button>
      </Form>
    </div>
  )
}