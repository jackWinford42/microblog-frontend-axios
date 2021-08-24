import axios from "axios";

const base_url = process.env.REACT_APP_base_url || "http://localhost:5000/api/posts";


export function getBackendPost(id) {
  return async function (dispatch) {
    const response = await axios.get(`${base_url}/${id}`);
    return dispatch(getPost(response.data));
  };
}

function getPost(post) {
  return {
    type: "GET_POST",
    post,
  };
}

export function addBackendPost(formData) {
  return async function (dispatch) {
    const response = await axios.post(`${base_url}`, {
      title:formData.title,
      description:formData.description,
      body:formData.body
    });
    return dispatch(addPost(response.data));
  };
}

function addPost(post) {
  return {
    type: "ADD_POST",
    post
  };
}

export function removeBackendPost(id) {
  return async function (dispatch) {
    await axios.delete(`${base_url}/${id}`);
    return dispatch(removePost(id));
  };
}

function removePost(postid) {
  return {
    type: "REMOVE_POST",
    postid
  };
}

export function editBackendPost(postid, formData) {
  return async function (dispatch) {
    const response = await axios.put(`${base_url}/${postid}`, {
      title:formData.title,
      description:formData.description,
      body:formData.body
    });
    return dispatch(editPost(response.data));
  };
}

function editPost(post) {
  return {
    type: "EDIT_POST",
    post,
  };
}

export function addVote(id, direction) {
  return async function (dispatch) {
    const response = await axios.post(`${base_url}/${id}/vote/${direction}`);
    return dispatch(vote(id, response.data.votes));
  };
}

function vote(postid, votes) {
  return {
    type: "SET_VOTE",
    postid: postid,
    votes: votes,
  };
}

export function removeBackendComment(postid, commentId) {
  return async function (dispatch) {
    await axios.delete(`${base_url}/${postid}/comments/${commentId}`);
    return dispatch(removeComment(postid, commentId));
  };
}

function removeComment(postid, commentId) {
  return {
    type: "REMOVE_COMMENT",
    postid,
    commentId,
  };
}

export function addBackendComment(postid, text) {
  return async function (dispatch) {
    const result = await axios.post(`${base_url}/${postid}/comments/`, { text });
    return dispatch(addComment(postid, result.data));
  };
}

function addComment(postid, comment) {
  return { 
    type: "ADD_COMMENT",
    postid, comment
  };
}

export function getBackendPosts() {
  return async function (dispatch) {
    const response = await axios.get(`${base_url}`);
    return dispatch(getPostCards(response.data));
  };
}

function getPostCards(titles) {
  return {
    type: "GET_TITLES",
    titles,
  };
}