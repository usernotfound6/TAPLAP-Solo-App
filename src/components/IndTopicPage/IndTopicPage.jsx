import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { useState} from "react";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import './/IndTopicPage.css';

function IndTopicPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const indtopic = useSelector((store) => store.indtopic);
  const comments = useSelector((store) => store.comments);

  const [text, setText] = useState("");
  
  console.log("indtopic:", indtopic);
  console.log("comments:", comments);

  useEffect(() => {
    dispatch({ type: "FETCH_IND_TOPIC", payload: params.id });
    dispatch({ type: "FETCH_COMMENTS", payload: params.id });
  }, [dispatch, params.id]);

  const handleComment = async () => {
    let newComment = {
      text: text,
      topic_id: params.id
    };
  
    try {
      // Dispatch the "ADD_COMMENT" action
      await dispatch({
        type: "ADD_COMMENT",
        payload: newComment
      });
  
      // After the comment is added, fetch the updated comments
      await dispatch({ type: "FETCH_COMMENTS", payload: params.id });
  
      setText(''); // Clear the text area
  
    } catch (error) {
      console.error("Error adding or fetching comments:", error);
    }
  };
  

//    history.push('/indtopic/:id')
  
  return (
    <main>
     <section className="indtopic">
  <div className="indTopicCard">
    <Card sx={{ maxWidth: 1045 , minWidth: 300, borderRadius: 6}}>
      <CardContent>
        <div className="centered-content">
          <h1>{indtopic.topic_name}</h1>
          <p>{indtopic.topic_description}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
      <textarea   onChange={(event) => setText(event.target.value)} 
        placeholder="add comment..."
        value={text}
        type="text" ></textarea>
      <button onClick={handleComment}>share comment!</button>
    </main>
  );
}
export default IndTopicPage;
