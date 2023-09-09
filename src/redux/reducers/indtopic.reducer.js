const indtopic = (state = [], action) => {
    switch (action.type) {
        case 'SET_IND_TOPIC':
            return action.payload;
        default:
            return state;
    }
}

export default indtopic;