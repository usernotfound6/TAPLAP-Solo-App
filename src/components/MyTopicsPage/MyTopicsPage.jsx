import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function MyTopicsPage(props) {
 
  // const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const edittopic = useSelector((store) => store.edittopic);
  const history = useHistory();
  const mytopics = useSelector((store) => store.mytopics);
  console.log("heres my topics", mytopics)

  useEffect(() => {
      dispatch({ type: 'FETCH_MY_TOPICS' });
  }, []);

  const handleEditClick = () => {
    console.log('topic clicked:', edittopic)
    // dispatch({type:'SET_EDIT_TOPIC', payload: mytopics.id})
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
