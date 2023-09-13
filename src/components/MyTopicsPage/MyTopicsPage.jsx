import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MyTopicsPage(props) {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const edittopic = useSelector((store) => store.edittopic);
  const dispatch = useDispatch();
  history = useHistory();
  const mytopics = useSelector((store) => store.mytopics);
  console.log("heres my topics", mytopics)

  useEffect(() => {
      dispatch({ type: 'FETCH_MY_TOPICS' });
  }, []);

  const handleEditClick = () => {
    console.log('topic clicked:', props.topic)
    dispatch({type:'SET_EDIT_TOPIC', payload:props.topic})
    history.push('/edit')
  }

  return (
  //   <div>
  //     <div className="container">
  //       <h2>Welcome, {user.username}!</h2>
  //       <p>Your ID is: {user.id}</p>
  //       <LogOutButton className="btn" />
  //     </div>

  
      <main>
  <h1>My Topics:</h1>
  <section className="mytopics">
    {mytopics.map((mytopics) => {
      return (
        <div key={mytopics.id}>

          <h1>{mytopics.topic_name}</h1>
          <p>{mytopics.topic_description}</p>
          <button onClick={handleEditClick}>
          Edit
        </button>
          <button onClick={() => dispatch({ type: "DELETE_TOPIC", payload: mytopics.id })}>
                Delete
              </button>
          {/* <p>User ID: {topic.user_id}</p> */}
        </div>
      );
    })}
  </section>
</main>
   
  );
}
export default MyTopicsPage;
