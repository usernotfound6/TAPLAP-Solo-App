import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditTopicForm(props) {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const edittopic = useSelector((store) => store.edittopic);
    console.log('yo', edittopic)

    function handleTopicNameChange(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: 'topic_name',
                value: event.target.value,
            },
        });
    }

    function handleTopicDescriptionChange(event) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: 'topic_description',
                value: event.target.value,
            },
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
            });
    };

    return (
        <>
            <h2>Edit Topic</h2>
            <p>We are editing this topic: {edittopic.topic_name} with id: {edittopic.id}</p>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleTopicNameChange}
                    placeholder='Topic Name'
                    value={edittopic.topic_name}
                />
                <input
                    onChange={handleTopicDescriptionChange}
                    placeholder='Topic Description'
                    value={edittopic.topic_description}
                />
                <input type='submit' value='Update Topic' />
            </form>
        </>
    );
}

export default EditTopicForm;