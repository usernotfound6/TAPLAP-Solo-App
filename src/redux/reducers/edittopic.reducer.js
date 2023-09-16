const edittopic = (state = [], action) => {
    if (action.type === 'SET_EDIT_TOPIC') {
      return action.payload;
    }
    
    if (action.type === 'EDIT_ONCHANGE') {
      return {
        ...state,
        [action.payload.property]: action.payload.value,
      };
    }
    
    return state;
  };
  
  export default edittopic;