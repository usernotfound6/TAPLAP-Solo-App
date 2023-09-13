import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditTopicForm(props) {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const edittopic = useSelector((store) => store.edittopic);

    function handleChange(event) {
      console.log(event.target.value)
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
              property1: 'topic_name',
              value1: event.target.value,
              property2: 'topic_description',
              value2: event.target.value
            }
          });
    
      }

       // Called when the submit button is pressed
  function handleSubmit(event) {
    event.preventDefault();

    // PUT REQUEST to /api/topics/:id
    axios.put(`/api/topics/${edittopic.id}`, edittopic)
      .then(response => {
        // clean up reducer data            
        dispatch({ type: 'EDIT_CLEAR' });

        // refresh will happen with useEffect on Home
        history.push('/mytopics'); // back to list
      })
      .catch(error => {
        console.log('error on topic PUT: ', error);
      })

  };
  return (
    <>
      <h2>Edit Topic</h2>
      <p>We are edditing this topic: {edittopic.topic_name} with id: {edittopic.id}</p>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => handleChange(event)}
          placeholder='Topic Name'
          value={edittopic.topic_name}
        />
         <input
          onChange={(event) => handleChange(event)}
          placeholder='Topic Description'
          value={edittopic.topic_description}
        />
        <input type='submit' value='Update Student' />
      </form>
    </>
  );
}

export default EditTopicForm;