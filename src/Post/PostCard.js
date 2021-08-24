import React from "react";
import {
  Card,
  CardBody,
  Button
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import {
  addVote
} from "../actions/posts";
import { useDispatch } from "react-redux";

export default function PostCard({id, title, description, votes}) {
  const dispatch = useDispatch();
  const handleUpvote = () => dispatch(addVote(id, "up"));
  const handleDownvote = () => dispatch(addVote(id, "down"));
  return (
      <Card>
        <Link to={`/${id}`}>
          <CardBody>
            <h3>{title}</h3>
            <span>{description}</span>
          </CardBody>
        </Link>
        <span>Likes: {votes}</span>
        <Button onClick={handleUpvote}>Like</Button>
        <Button onClick={handleDownvote}>Unlike</Button>
      </Card>
  )
} 