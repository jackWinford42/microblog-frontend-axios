import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PostDetail from "./Post/PostDetail";
import PostForm from "./Post/PostForm";
import Home from "./Home";
import "./NavHeader.css";
import { addBackendPost } from "./actions/posts";
import { useDispatch } from "react-redux";

export default function RouterNav() {
  const dispatch = useDispatch();
  const addPost = (formData) => {
    dispatch(addBackendPost(formData));
  }
  return (
    <div className="RouterNav">
      <BrowserRouter>
        <div className="NavHeader">
          <span id="navTitle">Microblog</span>
          <span>Are you just another cog in the blog?</span>
          <Link className="navLink" to="/">Blog</Link>
          <Link className="navLink" to="/new">Add a new post</Link>
        </div>
        <Switch>
          <Route path="/new">
            <PostForm sendToApi={addPost} defaultVals={{title: "",description: "",body: ""}} title={"New Post"}/>
          </Route>
          <Route path="/:postid">
            <PostDetail/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
          <Route>
            <p>Sorry, the page you are looking for does not exist.</p>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}