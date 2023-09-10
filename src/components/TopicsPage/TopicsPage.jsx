import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function TopicsPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const topics = useSelector((store) => store.topics);
  console.log("heres the topics", topics)

  useEffect(() => {
      dispatch({ type: 'FETCH_TOPICS' });
  }, []);
  return (
  //   <div>
  //     <div className="container">
  //       <h2>Welcome, {user.username}!</h2>
  //       <p>Your ID is: {user.id}</p>
  //       <LogOutButton className="btn" />
  //     </div>
  
      <main>
  <h1>Topics</h1>
  <section className="topics">
    {topics.map((topic) => (
      <div key={topic.id}onClick={() => history.push(`/indtopic/${topic.id}`)}>
        
        <h1>{topic.topic_name}</h1>
        <p>{topic.topic_description}</p>
        {/* <p>User ID: {topic.user_id}</p> */}
      </div>
    ))}
  </section>
</main>
   
  );
}
export default TopicsPage;