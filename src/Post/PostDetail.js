import React, { useState, useEffect } from "react";
import {
  Button
} from 'reactstrap';
import {
  useParams,
  useHistory
} from "react-router-dom";
import {
  removeBackendPost,
  editBackendPost,
  getBackendPost,
  addBackendComment,
  removeBackendComment,
  addVote
} from "../actions/posts";
import { useSelector, useDispatch } from "react-redux";
import Comments from "../Comment/Comments"
import PostForm from "./PostForm";

export default function PostDetail() {
  const { postid } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(st => st.posts[Number(postid)]);
  const [loaded, setLoaded] = useState(false);

  useEffect(function() {
    async function getPost() {
      await dispatch(getBackendPost(postid));
      setLoaded(true);
    }
    if (!post) getPost();
    else setLoaded(true);
  }, [dispatch, postid, post])

  let history = useHistory();

  const [displayForm, setDisplayForm] = useState(false)

  const edit = () => {
    setDisplayForm(true) 
  }

  const deletePost = () => {
    dispatch(removeBackendPost(postid));
    history.push("/");
  }

  const editPost = (formData) => {
    dispatch(editBackendPost(
      postid,
      formData
    ));
    setDisplayForm(false);
  }

  function addComment(formData) {
    dispatch(addBackendComment(postid, formData.text));
  }

  function deleteComment(commentId) {
    dispatch(removeBackendComment(postid, commentId));
  }

  const like = () =>  dispatch(addVote(postid, "up"));
  const unlike = () =>  dispatch(addVote(postid, "down"));

  if (!loaded) return <p>Loading, just a moment...</p>

  const postDetail = (
    <div className="PostDetail">
      <div>
        <h3>{post.title}</h3>
        <Button onClick={edit}>Edit</Button>
        <Button onClick={deletePost}>Delete</Button>
      </div>
      <div>
        <span><i>{post.description}</i></span><br></br>
        <span>Likes: {post.votes}</span>
        <Button onClick={like}>Like</Button>
        <Button onClick={unlike}>Unlike</Button>
      </div>
      
      <p>{post.body}</p>
      <Comments comments={post.comments} deleteComment={deleteComment} createComment={addComment} postid={postid}/>
    </div>
  )

  const postForm = (
    <PostForm sendToApi={editPost} defaultVals={{
      title: post.title,
      description: post.description,
      body: post.body}}
      title={"Edit Post"}/>
  )
  return (
    <>
      {displayForm ? postForm : postDetail}
    </>
  )
}