const INITIAL_STATE = { posts: [] };

function sortByVote(posts) {
    return posts.sort((a, b) => b.votes - a.votes);
}

function makePostCardFromPost({id, title, description, votes}) {
    return {id, title, description, votes};
}

export default function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case "GET_TITLES":
            return sortByVote([...action.titles])
        case "ADD_POST":
            return sortByVote([...state, makePostCardFromPost(action.post)]);
        case "DELETE_POST":
            return state.filter(title => title.id !== action.postid);
        case "EDIT_POST":
            return state.map(title => title.id === action.post.id
                ? makePostCardFromPost(action.post)
                : title);
        case "SET_VOTE":
            return sortByVote(state.map(
                title => title.id === action.postid ? { ...title, votes: action.votes } : title));
        default:
            return state;
    }
}