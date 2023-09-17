const pennies = (state = [], action) => {
    switch (action.type) {
      case 'SET_PENNIES':
        return action.payload; // Replace the entire state with the new pennies
      case 'ADD_PENNY':
        return [...state, 1]; // Add 1 to pennies
    case 'UNDO_PENNY':
        return state.slice(0, -1); // undo penny
        default:
          return state;
    }
  };
  
  export default pennies;