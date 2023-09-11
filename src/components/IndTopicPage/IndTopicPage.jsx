import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

function IndTopicPage() {
  const params = useParams();
  const dispatch = useDispatch();
  // const history = useHistory();
  const indtopic = useSelector((store) => store.indtopic);
  const comments = useSelector((store) => store.comments);
  
  console.log("indtopic:", indtopic);
  console.log("comments:", comments);

  useEffect(() => {
    dispatch({ type: "FETCH_IND_TOPIC", payload: params.id });
    dispatch({ type: "FETCH_COMMENTS", payload: params.id });
  }, [dispatch, params.id]);

  // const handleComment(){
  return (
    <main>
      <section className="indtopic">
        <h1>{indtopic.topic_name}</h1>
        <p>{indtopic.topic_description}</p>
      </section>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <textarea placeholder="add comment..."></textarea>
      {/* <button onClick={handleComment}>share comment!</button> */}
    </main>
  );
}
export default IndTopicPage;
