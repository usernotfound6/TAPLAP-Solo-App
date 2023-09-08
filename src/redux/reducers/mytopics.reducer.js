const mytopics = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_TOPICS':
            return action.payload;
        default:
            return state;
    }
}

export default mytopics;