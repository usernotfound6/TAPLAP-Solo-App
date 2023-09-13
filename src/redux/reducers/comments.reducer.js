const comments = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload; // Replace the entire state with the new comments
    case 'ADD_COMMENT':
      return [...state, action.payload]; // Add the new comment to the existing array
    default:
      return state;
  }
};

export default comments;