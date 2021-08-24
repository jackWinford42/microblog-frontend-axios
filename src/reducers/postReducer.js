const INITIAL_STATE = { posts: {} };

export default function rootReducer(state = INITIAL_STATE, action) {
  let post = (action.post) ? state[Number(action.post.id)]: state[Number(action.postid)];
  switch (action.type) {
    case "ADD_POST":
        return { ...state, [action.post.id]: { ...action.post, comments: [] }};
    case "EDIT_POST":
        const oldComments = post.comments;
        return {...state, [action.postid]: {...action.formData, comments: oldComments}}
    case "DELETE_POST":
        let posts = { ...state };
        delete posts[action.postid];
        return posts;
    case "GET_POST":
        return { ...state, [action.post.id]: action.post };
    case "ADD_COMMENT":
        return { ...state, [action.postid]: { ...post, comments: [...post.comments, action.comment] }};
    case "REMOVE_COMMENT":
      return { ...state, [action.postid]: { ...post, comments: 
        post.comments.filter(comment => comment.id !== action.commentId)}
      };
    case "SET_VOTE":
      return {...state, [action.postid]: {...post, votes: action.votes}}
    default:
      return state;
  }
}